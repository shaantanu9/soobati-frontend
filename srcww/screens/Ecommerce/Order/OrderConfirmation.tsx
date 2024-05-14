import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import style from '../../../styles/index';

const OrderConfimation = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Rest of your data object...

  return (
    <View className="bg-gray-50 flex-1 px-4">
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <SafeAreaView className="flex-row justify-between items-center">
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <ChevronLeftIcon size={24} color={style.darkPrimaryColor} />
        </TouchableOpacity>
        <Text className="text-black text-xl font-bold text-center">Order Confirmation</Text>
        <TouchableOpacity onPress={handleFavorite}>
          <HeartIcon size={24} className={style.darkPrimaryColor} />
        </TouchableOpacity>
      </SafeAreaView>

      <View className="flex-row justify-between items-center mt-4">
        <Text className={`text-lg font-bold text-[${style.darkPrimaryColor}] `}>
          Shipping Address
        </Text>
        <View className="flex-row items-center justify-center">
          <Text
            className={`text-md font-bold text-[${style.darkPrimaryColor}] `}>
            Change
          </Text>
          <ArrowRightIcon size={16} color={style.darkPrimaryColor} />
        </View>
      </View>

      {/* horizontal scroll */}
      <View className="flex-row justify-between items-center bg-white p-2 rounded-lg shadow-sm mt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="p-2 space-x-8"
          // contentContainerStyle={{flex: 1}}
        >
          <AddressCard />
          <AddressCard />
          <AddressCard />
        </ScrollView>
      </View>

      <View>
        <Text
          className={`text-lg font-bold text-[${style.darkPrimaryColor}] mt-4`}>
          Order Summary
        </Text>
      </View>

      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Repeat your CartCard component for each item */}
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('OrderSuccessScreen')}
        className={`flex-row justify-center items-center bg-[${style.darkPrimaryColor}] rounded-lg py-3 m-2`}>
        <Text className="text-white font-semibold">Go to the payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfimation;

const CartCard = () => {
  // Assuming you have cart item data here...

  return (
    <View className="flex-row justify-between items-center p-1 rounded-lg border border-gray-100 bg-white shadow">
      <View className="flex-row items-center">
        <Image
          source={images.signup} // Make sure this is the correct path to your image
          className="w-20 h-20"
          resizeMode="contain"
        />
        <View className="">
          <Text className="text-sm font-bold">Dress XL</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Text
            className={`text-xl text-[${style.darkPrimaryColor}]  px-1 bg-white  `}>
            -
          </Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold px-4">1</Text>
        <TouchableOpacity>
          <Text
            className={`text-xl text-[${style.darkPrimaryColor}]  px-1 bg-white  `}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <View className="">
        <Text className="text-sm font-semibold">$ 79</Text>
      </View>
    </View>
  );
};

const AddressCard = () => {
  // Assuming you have cart item data here...

  return (
    <TouchableOpacity className="flex-row justify-between items-start p-1 rounded-lg border border-gray-100 bg-white shadow mr-3 pr-3 space-x-1">
      <MapPinIcon size={24} color={style.darkPrimaryColor} />
      <View className="flex-row items-center">
        <View className="">
          <Text className="text-sm font-bold text-black">Dress XL</Text>
          <Text className="text-sm font-semibold text-gray-500">
            123, 4th Avenue, New York, USA
          </Text>
          <Text className="text-sm font-semibold text-gray-500">
            +1 234 567 890
          </Text>
          <Text className="text-sm font-semibold text-gray-500">
            Email:
            <Text className="text-sm font-semibold text-gray-500"> </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
