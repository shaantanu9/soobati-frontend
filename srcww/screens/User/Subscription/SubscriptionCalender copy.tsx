// import React, { useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const SubscriptionCalender = () => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     // Optionally fetch details for the selected date here
//   };
//     // Get the current date
//     const currentDate = new Date();
//   // Get the first day of the current month
//   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//   // Get the last day of the current month
//   const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//   return (
//     <>
//     <View style={{ padding: 10 }}>
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={{
//           [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'}
//         }}
//         theme={{
//           selectedDayBackgroundColor: 'orange',
//           todayTextColor: 'red',
//           arrowColor: 'orange',
//         }}
//         // minDate={firstDayOfMonth}
//         // maxDate={lastDayOfMonth}
//       />
//       {selectedDate && (
//         <Text style={{ marginTop: 10 }}>Selected Date: {selectedDate}</Text>
//       )}
//     </View>

//     </>

//   );
// };

// export default SubscriptionCalender;

import {Modal} from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {CheckBadgeIcon} from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../../../styles';
import MyText from './MyText';
const SubscriptionCalendar = () => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    status: 'Pending',
    feedback: '',
  });
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const markedDates = {
    '2024-04-15': {
      marked: true,
    },
    '2024-04-20': {
      marked: true,
    },
    // Add more dates as needed
  };

  const onDayPress = (day: any) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
    // Optionally fetch details for the selected date here
  };

  return (
    <View style={{padding: 10}}>
      <View
        className={`flex-row items-center justify-between ${styles.darkPrimaryColor}`}>
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
            {dayjs(selectedDate).format('dddd')}
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
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
        theme={{
          selectedDayBackgroundColor: 'orange',
          todayTextColor: 'red',
          arrowColor: 'orange',
        }}
        markingType={'custom'}
        dayComponent={({date, state}) => {
          const isMarked = markedDates[date.dateString]?.marked;
          return (
            <TouchableOpacity onPress={() => onDayPress(date)}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: state === 'today' ? '#e0f2f1' : 'white',
                  borderRadius: 16,
                }}>
                <Text
                  style={{
                    color: state === 'today' ? 'red' : 'black',
                    fontWeight: state === 'selected' ? 'bold' : 'normal',
                  }}>
                  {date.day}
                </Text>
                {isMarked && (
                  <CheckBadgeIcon size={16} color={styles.darkPrimaryColor} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        className={`flex-row items-center justify-between ${styles.darkPrimaryColor}`}>
        {selectedDate && (
          <Text
            className="text-lg font-bold tracking-widest capitalize text-black"
            style={{marginTop: 10}}>
            {dayjs(selectedDate).format('dddd')},{' '}
            {dayjs(selectedDate).format('DD MMMM YYYY')}
          </Text>
        )}
        <TouchableOpacity
          className="my-2"
          onPress={() => {
            console.log('Save Delivery Details', deliveryDetails);
          }}>
          <Text
            className={`text-center text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* List */}

        {/* Ask if Product Deliver or you want to cancelled */}

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-lg font-bold text-green-500">
            Product Delivered
          </Text>
          <Text className="text-lg font-bold text-green-500">10:00 AM</Text>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className=" font-bold text-green-500">{}</Text>
          <Text className=" font-bold text-green-500"></Text>
        </View>

        <View className="flex-row flex-wrap items-center justify-between mt-2 gap-2">
          <TouchableOpacity
            onPress={() => {
              setDeliveryDetails(prev => ({
                ...prev,
                status: 'Undelivered',
              }));
            }}>
            <Text
              className={`text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
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
                status: 'Delivered',
              }));
            }}>
            <Text
              className={`text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
              style={{
                borderColor: styles.darkPrimaryColor,
              }}>
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDeliveryDetails(prev => ({
                ...prev,
                status: 'Pending',
              }));
            }}>
            <Text
              className={`text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
              style={{
                borderColor: styles.darkPrimaryColor,
              }}>
              Pending
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
              className={`text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
              style={{
                borderColor: styles.darkPrimaryColor,
              }}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

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

        {/* Save Button */}
        {/* <TouchableOpacity
          className="my-2"
          onPress={() => {
            console.log('Save Delivery Details', deliveryDetails);
          }}>
          <Text
            className={`text-center text-lg font-bold text-[${styles.darkPrimaryColor}] p-2 rounded-xl border`}
            style={{
              borderColor: styles.darkPrimaryColor,
            }}>
            Save
          </Text>
        </TouchableOpacity> */}
      </View>

      <Modal
        visible={deliveryDetails.status === 'Delivered'}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() =>
          setDeliveryDetails(prev => ({...prev, status: 'Pending'}))
        }
        // {/* style={{width: '80%', height: '50%', alignSelf: 'center'}} */}
        // {/* backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} */}
      >
        <View
          className="flex bg-white rounded-lg p-4"
          style={{
            width: wp('80%'),
            height: hp('20%'),
          }}>
          {/* <Text>Product Delivered</Text> */}
          <Text className="text-lg font-bold tracking-widest capitalize ">
            Product delivered on {selectedDate}?
          </Text>
          <TouchableOpacity
            onPress={() =>
              setDeliveryDetails(prev => ({...prev, status: 'Delivered'}))
            }>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDeliveryDetails(prev => ({...prev, status: 'Pending'}))
            }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SubscriptionCalendar;
