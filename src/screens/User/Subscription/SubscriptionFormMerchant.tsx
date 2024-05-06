import {useRoute} from '@react-navigation/native';
import {CheckBox, Datepicker, Select, SelectItem} from '@ui-kitten/components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {WEEKDAYS} from '../../../common/constant';
import {useAppDispatch} from '../../../hooks/useAppSelector';
import {_subscriptionService} from '../../../services/api/subscription';
import styles from '../../../styles';
import MonthlyOccurrenceForm from './Demo';
import MyText from './MyText';

dayjs.extend(utc);

interface SubscriptionFormProps {
  closeSheet: () => void;
}

const SubscriptionFormMerchant = ({closeSheet}: SubscriptionFormProps) => {
  const routes = useRoute();
  const [customType, setCustomType] = useState('' as string);
  const dispatch = useAppDispatch();
  const productData: any = routes.params;
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
      console.log('res', res);
      if (res.statusCode === 200) {
        alert('Subscription created successfully');
        closeSheet();
      }
    } catch (error) {
      alert('Error dispatching createSubscription action: ' + error);
      console.error('Error dispatching createSubscription action:', error);
    }
  };

  const saveSubscription = () => {
    const correctFrequencyDetails = {
      ...subscriptionInputData.frequencyDetails,
      productId: productData.id,
      productName: productData.name,
      businessId: productData.businessId,
      businessName: productData.businessName,
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

      startDate: dayjs.utc(subscriptionInputData.startDate).toISOString(),
      payments: [
        {
          paymentDate: dayjs.utc(paymentDetails.paymentDate).toISOString(),
          amount: parseInt(paymentDetails.amount),
        },
      ],
      //   close the bottomsheet after saving
    };

    // if frequency is custom then add       frequencyDetails: correctFrequencyDetails,
    if (subscriptionInputData.frequency !== 'Custom') {
      const {frequencyDetails, ...rest} = correctSubscriptionData;
      const modifiedSubscriptionData = rest;
      handleCreateSubscription(modifiedSubscriptionData);
      //   dispatch(createSubscription(modifiedSubscriptionData));
    } else {
      handleCreateSubscription(correctSubscriptionData);
      //   dispatch(createSubscription(correctSubscriptionData));
    }
  };

  return (
    <View className="bg-white space-y-2 rounded-md shadow-md">
      {/* Add name also if want to link to some business product then toggle to search and link */}
      {/* Can add user name of the account sub to remember */}
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
                    const daysOfWeek =
                      subscriptionInputData.frequencyDetails.daysOfWeek;
                    if (daysOfWeek.includes(index)) {
                      const newDaysOfWeek = daysOfWeek.filter(
                        dayIndex => dayIndex !== index,
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
