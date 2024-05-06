import {Modal} from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MyText from '../../../../components/new/MyText';
import {useAppDispatch, useAppSelector} from '../../../../hooks/useAppSelector';
import {_subscriptionService} from '../../../../services/api/subscription';
import styles from '../../../../styles';

const SubscriptionCalendar = ({item}: any) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    status: '',
    feedback: '',
    quantity: '1',
    returnQuantity: '0',
  });
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const [singleSubscription, setSingleSubscription] = useState<any>(item);

  const [markedDates, setMarkedDates] = useState<any>({});
  const [totalDeilivered, setTotalDeilivered] = useState(0);
  const [prevSelectedDate, setPrevSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [startUseEffect, setStartUseEffect] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // update deleivery status
  const sub = useAppSelector(state => state.subscription.subscriptions);

  const handleDeliveryStatus = () => {
    setLoading(true);
    const arg = {
      subscriptionId: item._id,
      payload: deliveryDetails,
    };
    // const dispatchR = dispatch(userConfirmDelivery(arg));
    _subscriptionService
      .employeeConfirmDelivery(item._id, deliveryDetails)
      .then(res => {
        console.log(res, 'From SubscriptionCalendar');
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });

    setOpenConfirmModal(false);
    setStartUseEffect(!startUseEffect);
  };

  useEffect(() => {
    // console.log('useEffect', selectedDate);
    const markedDates: any = {};
    // setSingleSubscription(item);
    item?.deliveries?.map((delivery: any) => {
      const date = dayjs(delivery.date).format('YYYY-MM-DD');
      markedDates[date] = (markedDates[date] && [
        ...markedDates[date],
        {status: delivery.status},
      ]) || [{status: delivery.status}];
    });

    setMarkedDates(markedDates);

    let total = 0;
    singleSubscription?.deliveries?.map((delivery: any) => {
      if (
        delivery.status === 'Delivered' &&
        //  month
        dayjs(delivery.date).format('MMMM') ===
          dayjs(selectedDate).format('MMMM')
      ) {
        total += delivery.quantity;
      }
      setTotalDeilivered(total);
    });

    const index = dayjs(selectedDate).month();
    const seletctedDateISO = dayjs(selectedDate).toISOString();
    _subscriptionService
      .getSubscriptionDetails({
        startDate: dayjs(selectedDate)
          .startOf('day')
          // .startOf('month')
          .toISOString(),
        endDate: dayjs(selectedDate)
          // .endOf('month')
          .endOf('day')
          .toISOString(),
        type: 'user',
      })
      .then(res => {
        console.log(res, 'From SubscriptionCalendar fetch');
        setSingleSubscription(res.data[0]);
      });
  }, [selectedDate, startUseEffect]);

  // Select Date
  const onDayPress = (day: any) => {
    setPrevSelectedDate(selectedDate);
    setSelectedDate(day.dateString);
  };

  // Save Button Click
  const handleSave = () => {
    if (
      deliveryDetails.status !== '' &&
      selectedDate === dayjs().format('YYYY-MM-DD')
    ) {
      setOpenConfirmModal(true);
    } else {
      alert('Select Status and Only todays Date');
    }
  };
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <View style={{padding: 5}}>
      <View
        className={`flex-row items-center justify-between ${styles.darkPrimaryColor}`}>
        <View
          className={`flex-row items-center justify-between ${styles.darkPrimaryColor} p-2 border border-[
            ${styles.darkPrimaryColor}
          ] rounded-lg
          ]`}
          style={{
            borderColor: styles.darkPrimaryColor,
          }}>
          <Text
            className={` font-bold tracking-widest capitalize ${styles.darkPrimaryColor}`}>
            {/* {dayjs(selectedDate).format('dddd')} */}
            {totalDeilivered > 0 ? (
              <Text
                className={`text-lg font-bold tracking-widest capitalize ${styles.darkPrimaryColor}`}>
                {totalDeilivered} Delivered
              </Text>
            ) : (
              <Text
                className={`text-lg font-bold tracking-widest capitalize ${styles.darkPrimaryColor}`}>
                No Delivery
              </Text>
            )}
            {/* {dayjs(selectedDate).format('DD MMMM YYYY')} */}
          </Text>
        </View>
        <View
          className={`flex-row items-center justify-between ${styles.darkPrimaryColor} p-3 border border-[
            ${styles.darkPrimaryColor}
          ] rounded-lg
          ]`}
          style={{
            borderColor: styles.darkPrimaryColor,
          }}>
          <Text
            className={` font-bold tracking-widest capitalize ${styles.darkPrimaryColor}`}>
            {dayjs(dayjs(selectedDate)).daysInMonth()} of{' '}
            {dayjs(selectedDate).format('MMMM')}
          </Text>
        </View>
      </View>
      <Calendar
        // onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
        onMonthChange={month => {
          setSelectedDate(dayjs(month.dateString).format('YYYY-MM-DD'));
        }}
        theme={{
          selectedDayBackgroundColor: 'orange',
          todayTextColor: 'red',
          arrowColor: 'orange',
        }}
        markingType={'custom'}
        dayComponent={({date, state}) => {
          if (date?.dateString === undefined) return null;
          const isMarked: any = markedDates[date.dateString]?.[0]?.status;

          return (
            <TouchableOpacity onPress={() => onDayPress(date)}>
              <View
                // p-3
                className={`${state === 'today' && `bg-blue-300 text-white  `}
                ${
                  selectedDate === date?.dateString &&
                  `bg-[${styles.darkPrimaryColor}] text-white`
                }
                `}
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',

                  borderRadius: 16,
                }}>
                <Text
                  className={`
                  text-md
                  ${state === 'today' && `text-white`}
                  ${selectedDate === date?.dateString && `text-white`}`}>
                  {date && date.day}
                </Text>
                {isMarked == 'Delivered' && (
                  <CheckBadgeIcon
                    size={16}
                    // color={styles.darkPrimaryColor}
                    color="green"
                  />
                )}
                {isMarked == 'Undelivered' && (
                  <ExclamationCircleIcon
                    size={16}
                    color={styles.darkPrimaryColor}
                  />
                )}
                {isMarked == 'Cancelled' && (
                  <XCircleIcon size={16} color="red" />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View className="flex-row flex-wrap items-center my-2 gap-1 justify-between">
        <View>
          <Text>Return</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="return"
            className="text-black  p-1 border border-red-300 rounded-lg font-bold"
            value={deliveryDetails.returnQuantity}
            onChangeText={text =>
              setDeliveryDetails(prev => ({...prev, returnQuantity: text}))
            }
          />
        </View>
        {selectedDate && (
          <Text
            className=" font-bold tracking-widest capitalize bg-red-300 text-white p-2 rounded-lg borde"
            style={{
              backgroundColor: styles.darkPrimaryColor,
            }}>
            {dayjs(selectedDate).format('dddd')}
          </Text>
        )}
        <View>
          <Text>Given</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="quantity"
            className="text-black  p-1 border border-red-300 rounded-lg font-bold"
            value={deliveryDetails.quantity}
            onChangeText={text =>
              setDeliveryDetails(prev => ({...prev, quantity: text}))
            }
          />
        </View>
      </View>
      <View
        className={`flex-row items-center justify-between ${styles.darkPrimaryColor} gap-1`}>
        <TouchableOpacity
          onPress={() => {
            setDeliveryDetails(prev => ({
              ...prev,
              status: 'Undelivered',
            }));
          }}>
          <Text
            className={`text-sm font-bold text-[${
              styles.darkPrimaryColor
            }] py-1 px-1 rounded-xl border
              ${
                deliveryDetails.status === 'Undelivered' &&
                `bg-[${styles.darkPrimaryColor}] text-white`
              }
              `}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Undelivered
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDeliveryDetails(prev => ({
              ...prev,
              status: 'Cancelled',
            }));
          }}>
          <Text
            className={`text-sm font-bold text-[${
              styles.darkPrimaryColor
            }] p-1 rounded-xl border
              ${
                deliveryDetails.status === 'Cancelled' &&
                `bg-[${styles.darkPrimaryColor}] text-white`
              }
              `}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Cancelled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDeliveryDetails(prev => ({
              ...prev,
              status: 'Delivered',
            }));
          }}>
          <Text
            className={`text-lg font-bold text-[${
              styles.darkPrimaryColor
            }] p-2 rounded-xl border
              ${
                deliveryDetails.status === 'Delivered' &&
                `bg-[${styles.darkPrimaryColor}] text-white`
              }
              `}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Delivered
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave}>
          <Text
            className={`text-center text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Table start */}

      {singleSubscription &&
        singleSubscription?.deliveries &&
        singleSubscription?.deliveries.length > 0 && (
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-lg font-bold text-green-500">Quantity</Text>
            <Text className="text-lg font-bold text-green-500">Time</Text>
            <Text className="text-lg font-bold text-green-500">Status</Text>
          </View>
        )}
      {singleSubscription?.deliveries?.map((delivery: any, index: number) => {
        // if (dayjs(delivery.date).format('YYYY-MM-DD') !== selectedDate) {
        //   return null;
        // }
        return (
          <View
            key={delivery.deliveryId}
            className="flex-row items-center justify-between my-2 bg-gray-100 rounded-md p-1 py-2">
            <Text className="text-lg font-bold text-green-500">
              {delivery.quantity}
            </Text>
            <Text className="text-lg font-bold text-green-500">
              {dayjs(delivery.date).format('hh:mm A')}
            </Text>
            <Text className="text-lg font-bold text-green-500">
              {delivery.status}
            </Text>
          </View>
        );
      })}

      {/* Table End */}

      {/* Feedback Input */}
      <View className="flex  justify-between mt-2">
        <Text className=" font-bold text-lg">Feedback Note</Text>
        <MyText
          placeholder="Enter Feedback Note"
          setText={text =>
            setDeliveryDetails(prev => ({
              ...prev,
              feedback: text,
            }))
          }
          text={deliveryDetails.feedback}
        />
      </View>
      {/* </ScrollView> */}

      {/* Modal */}
      <Modal
        visible={openConfirmModal}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setOpenConfirmModal(false)}>
        <View
          className="flex bg-white rounded-lg p-4"
          style={{
            width: wp('80%'),
            height: hp('20%'),
          }}>
          {/* <Text>
            
          </Text> */}
          <Text className="text-lg font-bold tracking-widest capitalize ">
            Product {deliveryDetails.status + ''} on {selectedDate}?
          </Text>
          <View className="flex-row items-center justify-around mt-2">
            <TouchableOpacity
              className="bg-green-400 px-4 py-2 text-white rounded-xl"
              onPress={handleDeliveryStatus}>
              <Text className="text-white">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpenConfirmModal(false)}
              className="bg-red-400 px-4 py-2 text-white rounded-xl">
              <Text className="text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SubscriptionCalendar;
