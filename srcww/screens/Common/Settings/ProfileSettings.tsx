// import { useRoute } from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
// import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
// import { HeartIcon } from 'react-native-heroicons/solid';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import images from '../../../assets/images';
// import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
// import {
//   fetchCart,
//   updateItemQuantity,
// } from '../../../redux/features/cart/cartThunk';
// import style from '../../../styles/index';
import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  ChevronRightIcon,
  Cog8ToothIcon,
  HomeIcon,
  UserMinusIcon,
} from 'react-native-heroicons/outline';
import {useAppDispatch} from '../../../hooks/useAppSelector';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {logoutUser} from '../../../redux/features/userSlice';

interface ProfileSettingsProps {
  navigation: any;
  hideHeader: boolean;
}

const ProfileSettings = ({navigation, hideHeader}: ProfileSettingsProps) => {
  const dispatch = useAppDispatch();

  const data = [
    {
      title: 'Account Settings',
      Icon: <Cog8ToothIcon size={24} color="black" />,
      // onPress: () => navigation.navigate(StackKeys.User.AccountSettings),
    },
    {
      title: 'Notification Settings',
      Icon: <AdjustmentsHorizontalIcon size={24} color="black" />,
      // onPress: () => navigation.navigate(StackKeys.User.NotificationSettings),
    },
    {
      title: !hideHeader ? 'Merchant Account' : 'User Home',
      Icon: <BuildingStorefrontIcon size={24} color="black" />,
      onPress: () =>
        !hideHeader
          ? navigation.navigate(StackKeys.Merchant.MerchantHome)
          : navigation.navigate(StackKeys.Common.TabNavigation),
    },
    {
      title: 'Delivery Partner Home',
      Icon: <BuildingOffice2Icon size={24} color="black" />,
      onPress: () =>
        navigation.navigate(StackKeys.DeliveryPartner.DeliveryPartnerHome),
    },
    {
      title: 'Address Settings',
      Icon: <HomeIcon size={24} color="black" />,
      // onPress: () => navigation.navigate(StackKeys.User.AddressSettings),
    },
    {
      title: 'Payment Settings',
      Icon: <BuildingStorefrontIcon size={24} color="black" />,
      onPress: () => console.log('first'),
    },
    {
      title: 'My Orders',
      Icon: <ArchiveBoxIcon size={24} color="black" />,
      onPress: () => navigation.navigate(StackKeys.Merchant.MyOrder),
    },
    {
      title: 'Logout',
      Icon: <UserMinusIcon size={24} color="black" />,
      onPress: () => {
        dispatch(logoutUser());
        navigation.navigate(StackKeys.Common.LoginScreen);
      },
    },
  ];

  return (
    <View className="pt-3 ">
      {!hideHeader && (
        <View className="flex-row justify-between items-center px-4 pt-2 shadow-md rounded-md">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center gap-2">
            <ArrowLeftIcon className="w-6 h-6" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold tracking-wider">Settings</Text>
          <View></View>
        </View>
      )}

      <ScrollView>
        <View className=" flex-1">
          {data.map((item, index) => (
            <SingleItemCard key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const SingleItemCard = ({item}: any) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between mt-2 py-5 pr-1 pl-4 bg-white w-full"
      onPress={item.onPress}>
      <View className="flex-row items-start justify-start gap-2">
        <View>{item.Icon}</View>
        <View>
          <Text>{item.title}</Text>
        </View>
      </View>
      <View>
        <ChevronRightIcon className="w-6 h-6" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSettings;
