import {
  CalendarIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/outline';
import stylestailwind from '../../../../styles';
import {DynamicTabView} from '../../../TabComponent';

import {useRoute} from '@react-navigation/native';
import {Modal} from '@ui-kitten/components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImageAssets from '../../../../assets/images';
import {useAppDispatch} from '../../../../hooks/useAppSelector';
import {
  cancelSubscription,
  fetchUserSubscriptions,
} from '../../../../redux/features/subscription/subscriptionThunk';
import SubscriptionCalender from '../SubscriptionCalender';
dayjs.extend(utc);

const SubscriptionDetail = () => {
  const route = useRoute();
  const {item}: any = route.params;
  const [visibleDeleteModal, setVisibleDeleteModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleDeleteSubscription = () => {
    dispatch(cancelSubscription(item._id));
    setVisibleDeleteModal(false);
    dispatch(
      fetchUserSubscriptions({
        subscriptionId: item._id,
      }),
    );
  };

  useEffect(() => {
    console.log('subscription active', item.active, item._id);
  }, [route]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollView}>
        <Image source={ImageAssets.bookImage1} style={styles.bookImage} />

        <View
          style={styles.detailsContainer}
          className="flex-row justify-between bg-white rounded-lg shadow">
          <Text style={styles.detailsTitle}>Subscription Details</Text>
          <Text style={styles.detailsTitle}>
            {item.active ? 'Active' : 'Inactive'}
          </Text>
        </View>
        <View>
          <View className="p-4 bg-white rounded-lg shadow">
            <Text className="text-gray-700 text-xl font-extrabold tracking-widest mb-1">
              {item.businessName}
            </Text>
            <Text className="text-sm text-gray-500">
              Product: {item.productName}
            </Text>
            <Text className="text-sm text-gray-500">
              Start Date: {dayjs.utc(item.startDate).format('YYYY-MM-DD')}
            </Text>
            <Text className="text-sm text-gray-500">
              Frequency: {item.frequency}
            </Text>
            {item.frequency === 'Custom' && (
              <Text className="text-sm text-gray-500">
                Interval Days: {item.frequencyDetails?.intervals}
              </Text>
            )}
            <Text className="text-sm text-gray-500">
              Next Delivery:{' '}
              {dayjs.utc(item.nextDeliveryDate).format('YYYY-MM-DD')}
            </Text>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-lg font-bold text-green-500">
                ₹{item.payments[0].amount}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-lg font-bold text-green-500">
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => setVisibleDeleteModal(true)}>
          {/* delete Sub */}

          <View className="bg-red-500 p-2 rounded-lg shadow mt-4">
            <Text className="text-center text-white text-lg font-bold">
              Cancel Subscription
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={visibleDeleteModal}
        backdropStyle={styles.backdrop}
        style={{width: '60%', alignSelf: 'center'}}
        onBackdropPress={() => setVisibleDeleteModal(false)}>
        <View className="bg-white p-4 rounded-xl shadow-lg">
          <Text>Cancel Subscription ?</Text>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => setVisibleDeleteModal(false)}
              className="bg-gray-500 p-1 rounded-lg shadow">
              <Text className="text-center text-white text-lg font-bold">
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteSubscription}
              className="bg-red-500 p-1 rounded-lg shadow">
              <Text className="text-center text-white text-lg font-bold">
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const tabs = [
  // {
  //   title: 'Subscription Calender',
  //   content: <SubscriptionCalender />,
  //   icon: <CalendarIcon size={20} color={stylestailwind.darkPrimaryColor} />,
  // },
  {
    title: 'Subscription List',
    content: <SubscriptionDetail />,
    icon: (
      <InformationCircleIcon
        size={20}
        color={stylestailwind.darkPrimaryColor}
      />
    ),
  },
];

const SubscriptionDetailScreenTab = ({item}: any) => {
  return (
    <ScrollView>
      <DynamicTabView
        tabs={[
          {
            title: 'Subscription Calender',
            content: <SubscriptionCalender item={item} />,
            icon: (
              <CalendarIcon size={20} color={stylestailwind.darkPrimaryColor} />
            ),
          },
          ...tabs,
        ]}
      />
    </ScrollView>
  );
};

export default SubscriptionDetailScreenTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'gray-50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookImage: {
    alignSelf: 'center',
    height: hp('40%'), // reduced height for better screen fit
    width: '96%',
    // resizeMode: 'contain', // ensure the whole image is visible
  },
  sectionTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
