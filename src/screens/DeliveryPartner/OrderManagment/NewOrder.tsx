import {useIsFocused} from '@react-navigation/native';
import {Input, Modal, Select, SelectItem} from '@ui-kitten/components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HomeIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useSharedValue} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import {FilterIcon, MessageIcon} from '../../../assets/svg';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {selectBusiness} from '../../../redux/features/business/businessSlice';
import {fetchBusinesses} from '../../../redux/features/business/businessThunk';
import {DynamicTabView} from '../../../screens/TabComponent';
import {_subscriptionService} from '../../../services/api/subscription';
import styles from '../../../styles';
dayjs.extend(utc);

const DeliveryStatus = ['Pending', 'Cancelled', 'Undelivered', 'Delivered'];
const MyOrdersScreen = () => {
  // Dummy data for the list of orders
  const [activeTab, setActiveTab] = useState('New'); // State to manage active tab
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const modalY = useSharedValue(100); // Start off the screen

  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('Pending');
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const subscriptions = useAppSelector(
    state => state.subscription.subscriptions,
  );

  const [orders, setOrders] = useState([]);

  const businesses = useAppSelector(state => state.business.businesses);
  const selectedBusiness = useAppSelector(
    state => state.business.selectedBusiness,
  );

  const selectBusinessHandler = (index: any) => {
    dispatch(selectBusiness(businesses[index.row]._id));
  };

  const focused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchBusinesses({role: 'employee'}));
    }, 50);
  }, [focused]);

  useEffect(() => {
    _subscriptionService
      .getTodaysDeliveries({
        status: activeTab,
        businessId: selectedBusiness?._id,
        date: dayjs.utc().format('YYYY-MM-DD'),
        type: 'employee',
      })
      .then(res => {
        if (res.statusCode === 200) {
          setOrders(res?.data);
        }
      });
  }, [activeTab, selectedBusiness]);

  // Function to render the tab button
  const renderTabButton = (label: any) => (
    <TouchableOpacity
      onPress={() => setActiveTab(label)}
      className={`py-2 px-4 rounded-full ${
        activeTab === label
          ? `bg-[${styles.darkPrimaryColor}] text-white`
          : 'bg-transparent'
      }`}>
      <Text
        className={`${
          activeTab === label ? 'font-semibold text-white' : 'text-gray-500'
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View className="justify-end flex-1">
          <View className="bg-white p-4 rounded-t-3xl shadow-lg">
            <Text className="text-lg font-semibold">Filter Options</Text>
            {/* Implementing Order Status Filters */}
            <Text className="text-md font-semibold mt-4">Order Status</Text>
            <View className="flex-row justify-between flex-wrap">
              <Button
                title="New"
                onPress={() => console.log('Filter by New')}
              />
              {/* More buttons */}
            </View>
            {/* Date Range */}
            <Text className="text-md font-semibold mt-4">Date Range</Text>
            <View className="flex-row justify-between">
              <TextInput placeholder="Start Date" />
              <TextInput placeholder="End Date" />
            </View>
            {/* More filters */}
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              className="items-center py-2 mt-4">
              <Text className="text-purple-600">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 p-2">
      <View className="py-2">
        <View
          className="flex-row justify-between items-center"
          // className='flex-row justify-between items-center px-4 py-2 bg-white rounded-lg shadow-md border border-gray-300'
        >
          <Text className="text-start text-2xl font-bold text-black">
            My Orders
          </Text>
          {/* Select Business */}
          <Select
            value={selectedBusiness?.businessName}
            onSelect={index => selectBusinessHandler(index)}
            style={{
              width: wp('40%'),
            }}
            placeholder="Select Business">
            {businesses.map((business: any) => (
              <SelectItem key={business._id} title={business.businessName} />
            ))}
          </Select>
        </View>
        <View className="flex-row justify-around py-2">
          {/* {['New', 'In progress', 'Ready', 'History'].map(label =>
              renderTabButton(label),
            )} */}
          {DeliveryStatus.map((label, index) => renderTabButton(label))}
        </View>
      </View>

      <View className="bg-white rounded-full border flex-row justify-start items-center space-x-2 px-2 border-gray-300">
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput
          placeholder="Search"
          className=" text-gray-500"
          style={{
            width: wp('70%'),
          }}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <FilterIcon />
        </TouchableOpacity>
        {renderFilterModal()}
      </View>

      <ScrollView className="flex-1 px-4">
        {orders?.map((order: any, index: number) => (
          <>
            <OrderCard key={index} order={order} status={activeTab} />
          </>
        ))}
      </ScrollView>
    </View>
  );
};

const OrderCard = ({order, status}: any) => {
  const [deliveryData, setDeliveryData] = useState<any>({
    quantity: order.deliveries[order.deliveries.length - 1].quantity,
    returnQuantity: 0,
    status: 'Pending',
  });
  const [deliverQuantity, setDeliverQuantity] = useState<any>();
  const [returnQuantity, setReturnQuantity] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelivery = () => {
    console.log('confirmDelivery');
    _subscriptionService
      .employeeConfirmDelivery(order._id, {
        deliveryId: order.deliveries[order.deliveries.length - 1].deliveryId,
        quantity: deliveryData.quantity,
        returnQuantity: deliveryData.returnQuantity,
        status: deliveryData.status,
      })
      .then(res => {
        if (res.statusCode === 200) {
          console.log('res.data', res?.data);
          setModalVisible(false);
        }
      });
  };

  const totalDetail = () => {
    let deliverydone = 0;
    let returnDone = 0;
    order.deliveries.map((item: any) => {
      if (item.status === 'Delivered') {
        deliverydone += item.quantity;
      }
      console.log('item.returnQuantity', item?.returnQuantity);
      returnDone += item.returnQuantity;
      setDeliverQuantity(deliverydone);
      setReturnQuantity(returnDone);
      return;
    });
  };
  useEffect(() => {
    setDeliveryData({
      quantity: order.deliveries[order.deliveries.length - 1].quantity,
      returnQuantity: 0,
      status: 'Pending',
    });
    totalDetail();
  }, []);

  return (
    <View className="flex justify-between items-start bg-white my-2 p-2 rounded-lg shadow-md">
      {/* Left Section - Order Info */}
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 text-xs">
            {dayjs.utc(order?.startDate).format('MMM, DD YYYY')}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {order?.timeRemaining}
          </Text>
        </View>
        <View className="flex-row justify-between items-center my-1 w-full">
          <View className="flex-row items-center my-1">
            <Image
              source={images?.profileImage1}
              className="h-12 w-12 rounded-full"
            />
            <View className="flex-row">
              <View>
                <Text className="font-bold ml-2">{order?.customerName}</Text>
                <Text className="font-bold ml-2">{order?.frequency}</Text>
              </View>
              <View>
                <Text className="font-bold ml-2">
                  Delivery:- {deliverQuantity}
                </Text>
                <Text className="font-bold ml-2">
                  Return:- {returnQuantity}
                </Text>
                {/* <Text className="font-bold ml-2">
                    Pending:- {deliveryData.quantity}
                  </Text> */}
              </View>
            </View>
          </View>
          <MessageIcon />
        </View>
      </View>

      {/* border */}
      {status == 'Pending' && (
        <>
          <View className="w-full border border-gray-200 my-2"></View>
          <View className="flex-row justify-between items-center w-full">
            <View>
              <Input
                label={'Given ' + deliveryData?.quantity}
                className="border border-gray-300 rounded-lg p-2 w-20"
                value={deliveryData?.quantity?.toString()}
                onChangeText={text =>
                  setDeliveryData({...deliveryData, quantity: parseInt(text)})
                }
                keyboardType="numeric"
              />
            </View>
            <View>
              <Input
                label={'Return ' + deliveryData?.returnQuantity}
                className="border border-gray-300 rounded-lg p-2 w-20"
                value={deliveryData?.returnQuantity?.toString()}
                onChangeText={text =>
                  setDeliveryData({
                    ...deliveryData,
                    returnQuantity: parseInt(text),
                  })
                }
                keyboardType="numeric"
              />
            </View>

            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text
                  className={`text-white text-sm font-bold p-2 mt-4 rounded-lg bg-[${styles.darkPrimaryColor}] `}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center w-full mt-2">
            {DeliveryStatus.map(
              (status, index) =>
                status !== 'Pending' && (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      setDeliveryData({
                        ...deliveryData,
                        status,
                      })
                    }>
                    <Text
                      className={`text-white text-sm font- p-1 py-2 rounded-lg  ${
                        status === deliveryData.status
                          ? `bg-[${styles.darkPrimaryColor}]`
                          : 'bg-gray-400'
                      }`}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ),
            )}
          </View>

          <Modal
            visible={modalVisible}
            // transparent={true}
            backdropStyle={stylesInline.backdrop}
            style={{width: '60%', alignSelf: 'center'}}>
            {/* Conform order  */}
            <View className="flex-1 justify-center items-center w-70 px-70">
              <View className="bg-white p-4 rounded-lg shadow-lg">
                <Text className="text-lg font-bold">Conform Order</Text>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-gray-500 p-1 rounded-lg shadow">
                    <Text className="text-center text-white text-lg font-bold">
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => confirmDelivery()}
                    className={`p-1 rounded-lg shadow bg-[${styles.darkPrimaryColor}] `}>
                    <Text className="text-center text-white text-lg font-bold">
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default MyOrdersScreen;

const DeliveryPartnerOrderTab = () => {
  const tabs = [
    {
      title: 'New',
      content: <OrderCard orders={orders} />,
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
    },
    // {
    //   title: 'In progress',
    //   content: <MyOrdersScreen />,
    // },
    // {
    //   title: 'Ready',
    //   content: <MyOrdersScreen />,
    // },
    // {
    //   title: 'History',
    //   content: <MyOrdersScreen />,
    // },
  ];

  return (
    // <ScrollView>
    <DynamicTabView tabs={[...tabs]} />
    // {/* </ScrollView> */}
  );
};

// export default DeliveryPartnerOrderTab;

const stylesInline = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
