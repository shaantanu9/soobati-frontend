import {BottomSheetModal} from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import images from '../../../assets/images';

import {
  BellAlertIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import {MONTHS} from '../../../common/constant';
import SearchBarComp from '../../../components/new/SearchBarComp';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {fetchUserSubscriptions} from '../../../redux/features/subscription/subscriptionThunk';
import BottomSheetCompParent from '../../../screens/BottomSheetComp';
import {
  buildSubscriptionQueryPayload,
  NavigationProps,
} from '../../../utils/interface';
import SubscriptionFormMerchant from './SubscriptionFormMerchant';
import SubscriptionTopTab from './SubscriptionTopTab';

const SubscriptionScreen = ({navigation}: NavigationProps) => {
  const [search, setSearch] = React.useState('');
  const [searchModalVisible, setSearchModalVisible] = React.useState(false);
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState(dayjs().month());
  const [selectedYear, setSelectedYear] = React.useState(dayjs().year());
  const [openAddSubscription, setOpenAddSubscription] = React.useState(false);
  const [filterData, setFilterData] = React.useState({
    status: '',
    dateRange: '',
  });

  const [query, setQuery] = React.useState<buildSubscriptionQueryPayload>({
    subscriptionId: '',
    type: '',
    customer: '',
    customerName: '',
    productName: '',
    businessName: '',
    active: true,
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().endOf('month').toISOString(),
    nextDeliveryDate: '',
    frequency: '',
    paymentStatus: '',
    minPaymentAmount: 0,
    maxPaymentAmount: 0,
    paymentStartDate: '',
    paymentEndDate: '',
    deliveryStatus: '',
    deliveryStartDate: '',
    deliveryEndDate: '',
    frequencyType: '',
    daysOfWeek: [],
    intervals: 0,
    monthlyOccurrences: [],
    sortField: '',
    sortOrder: '',
    // limit: 10,
    // skip: 0,
  });

  const dispatch = useAppDispatch();
  const subscriptionList = useAppSelector(
    state => state.subscription.subscriptions,
  );

  const scrollViewRef: any = useRef(null);
  const filterViewRef = useRef<BottomSheetModal>(null);
  const openAddSubscriptionRef = useRef<BottomSheetModal>(null);

  const customSnapOpen = (ref: any, index: number) => {
    ref.current?.snapToIndex(index);
  };

  useEffect(() => {
    dispatch(
      fetchUserSubscriptions({
        startDate: dayjs().startOf('month').toISOString(),
        endDate: dayjs().endOf('month').toISOString(),
      }),
    );
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: dayjs().subtract(2, 'month').month() * 100,
        y: 0,
        animated: true,
      });
    }
  }, []);

  const selectMonthHandler = (index: number) => {
    // if month is past month, then select else do nothing
    if (index > dayjs().month()) {
      return;
    } else {
      setSelectedMonth(index);
      fetchMonthData(index);
    }
  };

  const fetchMonthData = (index: number) => {
    setSelectedMonth(index);
    setSelectedYear(dayjs().year());
    setQuery({
      ...query,
      startDate: dayjs().month(index).startOf('month').toISOString(),
      endDate: dayjs().month(index).endOf('month').toISOString(),
    });
    dispatch(
      fetchUserSubscriptions({
        startDate: dayjs().month(index).startOf('month').toISOString(),
        endDate: dayjs().month(index).endOf('month').toISOString(),
      }),
    );
  };

  const openNotification = () => {
    console.log('Notification');
  };

  return (
    <KeyboardAvoidingView>
      <View className="bg-gray-50">
        <View className="flex bg-white">
          <View className="flex-row items-center justify-between p-4">
            <ChevronLeftIcon size={24} color="#000" />
            <Text className="text-lg font-bold">Subscription b</Text>
            <View className="flex-row items-center space-x-2">
              {/* <ShareIcon size={24} color="#000" /> */}
              {/* <ShoppingCartIcon size={24} color="#000" /> */}
              <TouchableOpacity onPress={openNotification}>
                <BellAlertIcon size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => customSnapOpen(openAddSubscriptionRef, 2)}>
                <PlusCircleIcon
                  size={24}
                  color="#000"
                  // className='bg-[#F2F2F2] rounded-full p-2 animate-bounce'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView className="mb-30">
          {/* Load Current Year months as a horizontal Scrollable and clickable and get selected month */}
          <View className="flex-row items-center justify-between p-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}>
              {MONTHS.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  className={`py-1 rounded-full px-5 ${
                    selectedMonth === index
                      ? `bg-orange-300 border-2 border-red-300`
                      : ''
                  }`}
                  onPress={() => selectMonthHandler(index)}>
                  <Text className="text-lg font-bold">
                    {dayjs().month(index).format('MMM')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Current Month Expense and Last Month Expense */}
          {/* <View className="flex-row justify-between px-4">
            <View className="px-5 rounded-lg shadow-xl flex items-center py-2 border border-gray-300">
              <Text className="text-lg font-bold">7000</Text>
              <Text className="text-lg font-bold">Current Month</Text>
            </View>
            <View className="px-5 rounded-lg shadow-xl flex items-center py-2 border border-gray-300">
              <Text className="text-lg font-bold">7000</Text>
              <Text className="text-lg font-bold">{'  '}Last Month</Text>
            </View>
          </View> */}

          {/* <Gifted bgColor={styles.white} textColor={styles.black} /> */}
          <SubscriptionTopTab />

          {/* List of Subscription */}

          <View className="flex items-start justify-between p-4 border border-gray-100">
            <SearchBarComp
              size={70}
              filter
              rounded={3}
              filterModalVisible={filterModalVisible}
              setFilterModalVisible={() => {
                setFilterModalVisible(true);
                customSnapOpen(filterViewRef, 0);
              }}
            />
            <View>
              <Text>{subscriptionList.length} Active Subscription</Text>
            </View>
          </View>

          {/* List all the Subcrption in Card formart image name  price and arraow  */}
          <View className="flex-row flex-wrap justify-between mb-10">
            {subscriptionList.map((item: any, index) => (
              <View
                key={item?._id}
                className="flex-row items-center justify-between p-4 w-full my-1 bg-white rounded-md w-90"
                style={shadowStyle}>
                <View className="flex-row items-center space-x-2">
                  <View className="flex-row items-center">
                    <Image
                      source={images.bookImage1}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text className="text-lg font-bold tracking-widest capitalize">
                      {item?.productName}
                    </Text>
                    <Text className="text-sm capitalize" numberOfLines={1}>
                      {item?.businessName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubscriptionDetailScreen', {item})
                  }>
                  <View className="flex-row items-center">
                    <Text className="text-lg font-bold px-3">
                      {item?.payments[0]?.amount}
                    </Text>
                    <ChevronRightIcon size={24} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <View className="flex-row justify-center my-10"></View>
          </View>

          {/* Tab View */}

          {/* <SubscriptionTab subscriptionList={subscriptionList} /> */}

          <View className="flex-row justify-center my-10">
            <TouchableOpacity
              className="bg-[#F2F2F2] rounded-full p-2"
              onPress={() => customSnapOpen(openAddSubscriptionRef, 2)}>
              <PlusCircleIcon size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <>
        <BottomSheetCompParent title="Filter" ref={filterViewRef}>
          <View>
            <Text>Filter</Text>
          </View>
        </BottomSheetCompParent>

        <BottomSheetCompParent
          title="Add Subscription"
          ref={openAddSubscriptionRef}
          memoArray={['25%', '50%', '96']}>
          <SubscriptionFormMerchant
            closeSheet={() => openAddSubscriptionRef.current?.close()}
          />
        </BottomSheetCompParent>
      </>
    </KeyboardAvoidingView>
  );
};

export default SubscriptionScreen;

const shadowStyle = {
  shadowColor: '#DDDDDD',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 20,

  // Android shadow
  elevation: 20,
};
