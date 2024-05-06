import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useRoute} from '@react-navigation/native';
import {CheckBox, Datepicker, Select, SelectItem} from '@ui-kitten/components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {WEEKDAYS} from '../../../common/constant';
import MyText from '../../../components/new/MyText';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {selectProduct} from '../../../redux/features/product/productSlice';
import {_subscriptionService} from '../../../services/api/subscription';
import styles from '../../../styles';
import MonthlyOccurrenceForm from './Demo';

dayjs.extend(utc);

interface SubscriptionFormProps {
  closeSheet: () => void;
  selctedBusiness: any;
}

const SubscriptionFormMerchant = ({
  closeSheet,
  selctedBusiness,
}: SubscriptionFormProps) => {
  const routes = useRoute();
  const [customType, setCustomType] = useState('' as string);
  const dispatch = useAppDispatch();
  // const productData: any = routes.params;
  const product = useAppSelector(state => state.product.products);
  const productState = useAppSelector(state => state.product);

  const [paymentDetails, setPaymentDetails] = useState({
    paymentDate: dayjs().format('YYYY-MM-DD'),
    amount: '',
  });
  const [subscriptionInputData, setSubscriptionInputData] = useState({
    frequency: '',
    customerName: '',
    frequencyDetails: {
      type: customType,
      daysOfWeek: [],
      intervals: '',
      monthlyOccurrences: [
        {
          week: 0,
          dayOfWeek: 0,
        },
      ],
    },
    customerMobile: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    deposit: '',
    payments: [paymentDetails],
  });

  const onChangeSelect = (key: string, index: any) => {
    const options = [
      'Custom',
      'Daily',
      'Weekly',
      'Monthly',
      'Yearly',
      'Quarterly',
    ];

    setSubscriptionInputData({
      ...subscriptionInputData,
      [key]: options[index.row],
    });
  };

  const subscriptionInputHandler = (key: string, value: any) => {
    setSubscriptionInputData({
      ...subscriptionInputData,
      [key]: value,
    });
  };

  const handleCreateSubscription = async (subscriptionData: any) => {
    try {
      const res =
        await _subscriptionService.createSubscriptionForCustomerByBusiness(
          subscriptionData,
        );

      if (res.statusCode === 200) {
        alert('Subscription created successfully');
        closeSheet();
      }
    } catch (error) {
      alert('Error dispatching createSubscription action: ' + error);
      console.error('Error dispatching createSubscription action:', error);
    }
  };

  useEffect(() => {
    console.log(
      // products: selectedProduct,

      productState?.selectedProduct,

      'selectedProduct',
    );
  }, [productState]);

  const saveSubscription = () => {
    if (!productState?.selectedProduct._id) {
      alert('Please select a product');
      return;
    }

    const correctFrequencyDetails = {
      ...subscriptionInputData.frequencyDetails,

      type: customType,
      intervals:
        customType == 'Interval'
          ? parseInt(subscriptionInputData.frequencyDetails.intervals)
          : 0,
      daysOfWeek:
        customType == 'Weekly'
          ? subscriptionInputData.frequencyDetails.daysOfWeek
          : [],

      monthlyOccurrences:
        customType == 'Monthly'
          ? subscriptionInputData.frequencyDetails.monthlyOccurrences.map(
              (occurrence: any) => ({
                week: parseInt(occurrence.week),
                dayOfWeek: parseInt(occurrence.dayOfWeek),
              }),
            )
          : [],
    };
    const correctSubscriptionData = {
      ...subscriptionInputData,
      frequencyDetails: correctFrequencyDetails,
      productId: productState.selectedProduct._id,
      productName: productState.selectedProduct.name,
      businessId: productState.selectedProduct.businessId,
      businessName: productState.selectedProduct.businessName,
      owners: selctedBusiness.owners,

      startDate: dayjs.utc(subscriptionInputData.startDate).toISOString(),
      payments: [
        {
          paymentDate: dayjs.utc(paymentDetails.paymentDate).toISOString(),
          amount: parseInt(paymentDetails.amount),
        },
      ],
      //   close the bottomsheet after saving
    };

    console.log('correctSubscriptionData', correctSubscriptionData);
    // if frequency is custom then add       frequencyDetails: correctFrequencyDetails,
    if (subscriptionInputData.frequency !== 'Custom') {
      const {frequencyDetails, ...rest} = correctSubscriptionData;
      const modifiedSubscriptionData = rest;
      // console.log('modifiedSubscriptionData', modifiedSubscriptionData);
      // handleCreateSubscription(modifiedSubscriptionData);
      // dispatch(createSubscription(modifiedSubscriptionData));
      // _subscriptionService.createSubscriptionForCustomerByBusiness(modifiedSubscriptionData)
      handleCreateSubscription(modifiedSubscriptionData).then(() => {
        closeSheet();
      });
    } else {
      // console.log('correctSubscriptionData', correctSubscriptionData);
      // handleCreateSubscription(correctSubscriptionData);
      // dispatch(createSubscription(correctSubscriptionData));
      // _subscriptionService.createSubscriptionForCustomerByBusiness(modifiedSubscriptionData)
      handleCreateSubscription(correctSubscriptionData).then(() => {
        closeSheet();
      });
    }
  };

  const handleProductSelect = (productId: string) => () => {
    // console.log('productId', productId);
    dispatch(selectProduct(productId));
  };

  return (
    <View className="bg-white space-y-2 rounded-md shadow-md">
      {/* Add name also if want to link to some business product then toggle to search and link */}
      {/* Can add user name of the account sub to remember */}

      <BottomSheetScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row flex-wrap justify-center items-center space-x-2 space-y-2">
        {product?.map((product: any) => (
          <View
            className={` bg-white border border-gray-200 rounded-lg m-2  px-2 pb-2
            ${
              productState?.selectedProduct?._id === product?._id &&
              'bg-red-300'
            }
            `}>
            <TouchableOpacity
              onPress={handleProductSelect(product._id)}
              key={product._id}>
              <Image
                source={{
                  uri:
                    product?.images[0] ||
                    'https://i.ytimg.com/vi/d7eZsOADCos/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCVbhTBFeHKA3G4sddppVPi2qZZww',
                }}
                className="h-10 w-full items-center justify-center"
                resizeMode="cover"
                style={{width: 50, height: 50}}
              />

              <Text className=" font-semibold capitalize">{product.name}</Text>
              <Text className="mt-2">{product.price.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </BottomSheetScrollView>

      <MyText
        placeholder="Customer Name"
        text={subscriptionInputData.customerName}
        setText={text => subscriptionInputHandler('customerName', text)}
      />
      <MyText
        placeholder="Customer Mobile"
        text={subscriptionInputData.customerMobile}
        setText={text => subscriptionInputHandler('customerMobile', text)}
      />
      <View className="bg-white  rounded-md shadow-md mb-3">
        <Select
          placeholder="Select Frequency"
          onSelect={index => onChangeSelect('frequency', index)}
          value={subscriptionInputData.frequency}
          label={'Frequency'}
          style={{backgroundColor: 'white'}}>
          <SelectItem title="Custom" />
          <SelectItem title="Daily" />
          <SelectItem title="Weekly" />
          <SelectItem title="Monthly" />
          <SelectItem title="Yearly" />
          <SelectItem title="Quarterly" />
        </Select>
      </View>

      {subscriptionInputData.frequency === 'Custom' && (
        // frequencyDetails
        <View>
          {/* if custom them open calender and ask to select the days or interval or specific date  */}
          <View className="flex-row space-x-2 items-center mb-4">
            <CheckBox
              checked={customType === 'Interval'}
              onChange={() => setCustomType('Interval')}
              children={'Interval'}
            />
            <CheckBox
              checked={customType === 'Weekly'}
              onChange={() => setCustomType('Weekly')}
              children={'Weekly'}
            />
            <CheckBox
              checked={customType === 'Monthly'}
              onChange={() => setCustomType('Monthly')}
              children={'Monthly'}
            />
          </View>
          {customType === 'Interval' && (
            <MyText
              keyboardTypeInput={1}
              placeholder="Enter Interval / After how many days?"
              text={subscriptionInputData.frequencyDetails.intervals.toString()}
              setText={text =>
                subscriptionInputHandler('frequencyDetails', {
                  ...subscriptionInputData.frequencyDetails,
                  intervals: text,
                })
              }
            />
          )}
          {customType === 'Weekly' && (
            <View className="flex-row space-x-2 items-center">
              {WEEKDAYS.map((day, index) => (
                <TouchableOpacity
                  className="flex-row items-center my-3"
                  onPress={() => {
                    const daysOfWeek: any =
                      subscriptionInputData.frequencyDetails.daysOfWeek;
                    if (daysOfWeek.includes(index)) {
                      const newDaysOfWeek = daysOfWeek.filter(
                        (dayIndex: any) => dayIndex !== index,
                      );
                      subscriptionInputHandler('frequencyDetails', {
                        ...subscriptionInputData.frequencyDetails,
                        daysOfWeek: newDaysOfWeek,
                      });
                    } else {
                      subscriptionInputHandler('frequencyDetails', {
                        ...subscriptionInputData.frequencyDetails,
                        daysOfWeek: [...daysOfWeek, index],
                      });
                    }
                  }}>
                  <Text
                    className={`text-white ${
                      subscriptionInputData.frequencyDetails.daysOfWeek.includes(
                        index,
                      )
                        ? `bg-[${styles.darkPrimaryColor}] `
                        : `bg-[${styles.primaryColor}] text-black border border-[${styles.primaryColor}]`
                    } p-2 rounded-lg`}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {customType === 'Monthly' && (
            <MonthlyOccurrenceForm
              monthlyOccurrences={
                subscriptionInputData.frequencyDetails.monthlyOccurrences
              }
              setMonthlyOccurrences={(monthlyOccurrences: any) =>
                subscriptionInputHandler('frequencyDetails', {
                  ...subscriptionInputData.frequencyDetails,
                  monthlyOccurrences,
                })
              }
            />
          )}
        </View>
      )}

      {/* if custom them open calender and ask to select the days or interval or specific date  */}
      <MyText
        keyboardTypeInput={1}
        placeholder="Enter Deposit"
        text={subscriptionInputData.deposit.toString()}
        setText={text => subscriptionInputHandler('deposit', text)}
      />
      <View className="bg-white  rounded-md shadow-md mb-2">
        <Datepicker
          placeholder="Select Date"
          date={new Date(subscriptionInputData.startDate)}
          onSelect={(nextDate: Date) =>
            subscriptionInputHandler('startDate', nextDate)
          }
          label={'Start Date'}
        />
      </View>
      <Text>
        Payment Amount:{' '}
        {JSON.stringify(subscriptionInputData.payments?.[0].amount)}
      </Text>
      <MyText
        keyboardTypeInput={1}
        placeholder="Enter Payment Amount"
        text={paymentDetails.amount}
        setText={text =>
          setPaymentDetails({
            ...paymentDetails,
            amount: text,
          })
        }
      />

      <View className="bg-white  rounded-md shadow-md mb-2">
        <Datepicker
          placeholder="Select Date"
          date={dayjs.utc(paymentDetails.paymentDate).toDate() as Date}
          onSelect={(nextDate: Date) =>
            setPaymentDetails({
              ...paymentDetails,
              paymentDate: dayjs.utc(nextDate).format('YYYY-MM-DD'),
            })
          }
          label={'Payment Date'}
        />
      </View>

      <TouchableOpacity
        onPress={saveSubscription}
        className={`bg-[${styles.darkPrimaryColor}] p-1 rounded-md shadow-md items-center justify-center `}>
        <Text className={`font-extrabold text-lg text-white`}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionFormMerchant;
