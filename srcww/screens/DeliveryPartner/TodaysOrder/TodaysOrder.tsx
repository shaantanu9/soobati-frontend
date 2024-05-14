// // Calender like view of weekly on the top but only todays is editable evrything else is not editable but can be access
// // or click and view the details of the order
// // For todays order we can have a list of orders with the status of the order and the order details
// // show the order details in a modal and the status of the order can be changed from the modal
// // then there will be the tab of done and pending orders and the details of the orders can be viewed in the modal
// import React from 'react';
// import {Text, View} from 'react-native';
// const TodaysOrders = () => {
//   return (
//     <View className="text-2xl">
//       <Text className="text-2xl">TodaysOrders</Text>
//     </View>
//   );
// };

// export default TodaysOrders;

// import {addDays, format} from 'date-fns';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';

type Item = {
  name: string;
  cookies: boolean;
};

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const TodaysOrders: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Post[]}>({});

  useEffect(() => {
    // run once

    const getData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data: Post[] = await response.json();

      const mappedData = data.map((post, index) => {
        // const date = addDays(new Date(), index);
        const date = dayjs().add(index, 'day').toDate();

        return {
          ...post,
          // date: format(date, 'yyyy-MM-dd'),
          date: dayjs(date).format('YYYY-MM-DD'),
        };
      });

      const reduced = mappedData.reduce(
        (acc: {[key: string]: Post[]}, currentItem) => {
          const {date, ...coolItem} = currentItem;

          acc[date] = [coolItem];

          return acc;
        },
        {},
      );

      setItems(reduced);
    };

    getData();
  }, []);

  const renderItem = (item: Item) => {
    return (
      <View className="bg-white p-2 rounded-md my-2">
        <Text>{item.name}</Text>
        <Text>{item.cookies ? `🍪` : `😋`}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('View Details');
          }}
          className="bg-red-300 p-2 rounded-lg">
          <Text>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        <Text className="text-2xl font-bold text-start p-1">Todays Orders</Text>
      </View>
      <Agenda
        items={items}
        renderItem={renderItem}
        markedDates={{
          '2024-04-16': {selected: true, marked: true},
          '2024-04-14': {marked: true},
          '2024-04-18': {disabled: true},
        }}
        minDate={'2024-04-01'} // Minimum date
        maxDate={'2024-04-30'} // Maximum date
        // renderKnob={() => (
        //   <View>
        //     <Text className="text-black text-xl">↓</Text>
        //   </View>
        // )}
        onDayPress={day => console.log('selected day', day)}
        onMonthChange={month => console.log('month changed', month)}
        enableSwipeMonths={true}

        // dayComponent={({date, state}) => {
        //   // Extract year, month, and day from the date object
        //   const year = date?.getFullYear();
        //   const month = date?.getMonth() + 1; // JavaScript months are zero-indexed
        //   const day = date?.getDate();
        //   const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        //   // Check if the date is out of the desired range
        //   if (dateString < '2024-01-01' || dateString > '2024-06-30') {
        //     return (
        //       <View style={{display: 'none'}}> {/* Or style differently to indicate disabled */}
        //         <Text>{day}</Text>
        //       </View>
        //     );
        //   }
        //   // Return default styling for dates within the range
        //   return (
        //     <View>
        //       <Text>{day}</Text>
        //     </View>
        //   );
        // }}
      />
    </SafeAreaView>
  );
};

export default TodaysOrders;
