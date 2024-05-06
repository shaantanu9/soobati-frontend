import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {DynamicTabView} from '../../../screens/TabComponent';
// import SubscriptionCalender from './SubscriptionCalender';
import {useNavigation} from '@react-navigation/native';
import {
  ChevronRightIcon,
  HomeIcon,
  ListBulletIcon,
} from 'react-native-heroicons/outline';
import images from '../../../assets/images';
import {useAppSelector} from '../../../hooks/useAppSelector';
import styles from '../../../styles';
import SubscriptionCalender from './SubscriptionCalender';

const SubscriptionListComp = () => {
  const subscriptionList = useAppSelector(
    state => state.subscription.subscriptions,
  );
  const navigation: any = useNavigation();
  return (
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
  );
};

const tabs = [
  {
    title: 'Subscription List',
    content: <SubscriptionListComp />,
    icon: <ListBulletIcon size={20} color={styles.darkPrimaryColor} />,
  },
  {
    title: 'Subscription Calender',
    content: <SubscriptionCalender />,
    icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
  },
];

const SubscriptionTab = () => {
  return (
    <ScrollView>
      <DynamicTabView tabs={[...tabs]} />
    </ScrollView>
  );
};

export default SubscriptionTab;

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
