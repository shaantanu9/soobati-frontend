// // // import React from 'react';
// // // import {Text, View} from 'react-native';
// // // const Order = () => {
// // //   return (
// // //     <View className="text-2xl">
// // //       <Text className="text-2xl">Details</Text>
// // //     </View>
// // //   );
// // // };

// // // export default Order;


// // import React, { useState } from 'react';
// // import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';

// // type Order = {
// //   id: number;
// //   status: 'pending' | 'delivered';
// // };

// // const orders: Order[] = [
// //   { id: 1, status: 'pending' },
// //   { id: 2, status: 'delivered' },
// //   // Additional orders can be added here
// // ];

// // const OrderScreen: React.FC = () => {
// //   const [selectedTab, setSelectedTab] = useState<'pending' | 'delivered'>('pending');
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

// //   const toggleTab = (tab: 'pending' | 'delivered') => {
// //     setSelectedTab(tab);
// //   };

// //   const handleOpenModal = (order: Order) => {
// //     setCurrentOrder(order);
// //     setModalVisible(true);
// //   };

// //   const handleCloseModal = () => {
// //     setModalVisible(false);
// //   };

// //   const handleMarkDelivered = () => {
// //     if (currentOrder) {
// //       currentOrder.status = 'delivered';
// //       setModalVisible(false);
// //     }
// //   };

// //   return (
// //     <View className="flex-1 p-5">
// //       <View className="flex-row mb-5">
// //         <TouchableOpacity 
// //           className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'pending' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
// //           onPress={() => toggleTab('pending')}>
// //           <Text className={`${selectedTab === 'pending' ? 'text-white' : 'text-gray-800'} text-lg`}>
// //             Pending Orders
// //           </Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity 
// //           className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'delivered' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
// //           onPress={() => toggleTab('delivered')}>
// //           <Text className={`${selectedTab === 'delivered' ? 'text-white' : 'text-gray-800'} text-lg`}>
// //             Delivered Orders
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //       {orders.filter(order => order.status === selectedTab).map(order => (
// //         <TouchableOpacity 
// //           key={order.id} 
// //           className="flex-row justify-between p-3 border-b border-gray-200"
// //           onPress={() => handleOpenModal(order)}>
// //           <Text>Order #{order.id}</Text>
// //           <Text>{order.status === 'pending' ? '🕒' : '✅'}</Text>
// //         </TouchableOpacity>
// //       ))}
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={handleCloseModal}
// //       >
// //         <View className="m-5 bg-white rounded-lg p-9 items-center shadow-lg">
// //           <Text className="text-xl mb-4">Order Details</Text>
// //           <Text>Order ID: {currentOrder?.id}</Text>
// //           <Text>Status: {currentOrder?.status}</Text>
// //           <View className="flex-row space-x-4 mt-4">
// //             {currentOrder?.status === 'pending' && (
// //               <Button title="Mark as Delivered" onPress={handleMarkDelivered} />
// //             )}
// //             <Button title="More Details" onPress={() => console.log('More details')} />
// //             <Button title="Close" onPress={handleCloseModal} color="red" />
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // };

// // export default OrderScreen;


// import React, { useState } from 'react';
// import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// type Order = {
//   id: number;
//   status: 'pending' | 'delivered';
//   date: string; // Assuming the date format is "YYYY-MM-DD"
// };

// const orders: Order[] = [
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 1, status: 'pending', date: '2023-04-18' },
//   { id: 2, status: 'delivered', date: '2023-04-18' },
//   // Additional orders can be added here
// ];

// const OrderScreen: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<'pending' | 'delivered'>('pending');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>('');

//   const toggleTab = (tab: 'pending' | 'delivered') => {
//     setSelectedTab(tab);
//   };

//   const handleOpenModal = (order: Order) => {
//     setCurrentOrder(order);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   const handleMarkDelivered = () => {
//     if (currentOrder) {
//       currentOrder.status = 'delivered';
//       setModalVisible(false);
//     }
//   };

//   const handleDayPress = (day: any) => {
//     setSelectedDate(day.dateString);
//   };

//   return (
//     <View className="flex-1 p-5">
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={{
//           [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'}
//         }}
//       />
//       <View className="flex-row mb-5">
//         <TouchableOpacity 
//           className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'pending' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
//           onPress={() => toggleTab('pending')}>
//           <Text className={`${selectedTab === 'pending' ? 'text-white' : 'text-gray-800'} text-lg`}>
//             Pending Orders
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'delivered' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
//           onPress={() => toggleTab('delivered')}>
//           <Text className={`${selectedTab === 'delivered' ? 'text-white' : 'text-gray-800'} text-lg`}>
//             Delivered Orders
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {orders.filter(order => order.status === selectedTab && order.date === selectedDate).map(order => (
//         <TouchableOpacity 
//           key={order.id} 
//           className="flex-row justify-between p-3 border-b border-gray-200"
//           onPress={() => handleOpenModal(order)}>
//           <Text>Order #{order.id}</Text>
//           <Text>{order.status === 'pending' ? '🕒' : '✅'}</Text>
//         </TouchableOpacity>
//       ))}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={handleCloseModal}
//       >
//         <View className="m-5 bg-white rounded-lg p-9 items-center shadow-lg">
//           <Text className="text-xl mb-4">Order Details</Text>
//           <Text>Order ID: {currentOrder?.id}</Text>
//           <Text>Status: {currentOrder?.status}</Text>
//           <View className="flex-row space-x-4 mt-4">
//             {currentOrder?.status === 'pending' && (
//               <Button title="Mark as Delivered" onPress={handleMarkDelivered} />
//             )}
//             <Button title="More Details" onPress={() => console.log('More details')} />
//             <Button title="Close" onPress={handleCloseModal} color="red" />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default OrderScreen;


import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

type Order = {
  id: number;
  status: 'pending' | 'delivered';
  date: string; // Assuming the date format is "YYYY-MM-DD"
};

const orders: Order[] = [
  { id: 1, status: 'pending', date: '2023-04-18' },
  { id: 2, status: 'delivered', date: '2023-04-18' },
  // Additional orders can be added here
];

const OrderScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'delivered'>('pending');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const toggleTab = (tab: 'pending' | 'delivered') => {
    setSelectedTab(tab);
  };

  const handleOpenModal = (order: Order) => {
    setCurrentOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleMarkDelivered = () => {
    if (currentOrder) {
      currentOrder.status = 'delivered';
      setModalVisible(false);
    }
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View className="flex-1 p-5">
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'}
        }}
      />
      <View className="flex-row mb-5">
        <TouchableOpacity 
          className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'pending' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
          onPress={() => toggleTab('pending')}>
          <Text className={`${selectedTab === 'pending' ? 'text-white' : 'text-gray-800'} text-lg`}>
            Pending Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 p-2.5 items-center justify-center border ${selectedTab === 'delivered' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
          onPress={() => toggleTab('delivered')}>
          <Text className={`${selectedTab === 'delivered' ? 'text-white' : 'text-gray-800'} text-lg`}>
            Delivered Orders
          </Text>
        </TouchableOpacity>
      </View>
      {orders.filter(order => order.status === selectedTab && order.date === selectedDate).map(order => (
        <TouchableOpacity 
          key={order.id} 
          className="flex-row justify-between p-3 border-b border-gray-200"
          onPress={() => handleOpenModal(order)}>
          <Text>Order #{order.id}</Text>
          <Text>{order.status === 'pending' ? '🕒' : '✅'}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="m-5 bg-white rounded-lg p-9 items-center shadow-lg">
          <Text className="text-xl mb-4">Order Details</Text>
          <Text>Order ID: {currentOrder?.id}</Text>
          <Text>Status: {currentOrder?.status}</Text>
          <View className="flex-row space-x-4 mt-4">
            {currentOrder?.status === 'pending' && (
              <Button title="Mark as Delivered" onPress={handleMarkDelivered} />
            )}
            <Button title="More Details" onPress={() => console.log('More details')} />
            <Button title="Close" onPress={handleCloseModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderScreen;
