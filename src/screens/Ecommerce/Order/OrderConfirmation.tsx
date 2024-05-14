import {useNavigation} from '@react-navigation/native';
import {CheckBox} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
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
import MyText from '../../../components/new/MyText';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {_userAccountService} from '../../../services/api/user';
import style from '../../../styles/index';
import BottomSheetComp from '../../BottomSheetComp';

const OrderConfimation = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Rest of your data object...

  const cart = useAppSelector(state => state.cart);

  const updateAddress = () => {};
  const [address, setAddress] = useState([]);
  const addAddressRef = React.useRef<any>(null);
  const customSnapOpen = (index: number) => {
    addAddressRef.current.snapToIndex(index);
  };

  const [selectedAddress, setSelectedAddress] = useState({});

  const getAddress = () => {
    _userAccountService.getAddresses().then(
      res => {
        console.log('res', res);
        setAddress(res.data);
      },
      err => {
        console.log('err', err);
      },
    );
  };

  // useEffect(() => {
  //   console.log('selectedAddress', selectedAddress);
  // }, [selectedAddress]);

  useEffect(() => {
    getAddress();
  }, []);

  const handleConfirmOrder = () => {
    console.log('selectedAddress', selectedAddress);
    console.log('cart', cart);
    
    // navigation.navigate('OrderSuccessScreen')
  };

  return (
    <View className="bg-gray-50 flex-1 px-4">
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <SafeAreaView className="flex-row justify-between items-center">
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <ChevronLeftIcon size={24} color={style.darkPrimaryColor} />
        </TouchableOpacity>
        <Text className="text-black text-xl font-bold text-center">
          Order Confirmation
        </Text>
        <TouchableOpacity onPress={handleFavorite}>
          <HeartIcon size={24} className={style.darkPrimaryColor} />
        </TouchableOpacity>
      </SafeAreaView>

      <View className="flex-row justify-between items-center mt-4">
        <Text className={`text-lg font-bold text-[${style.darkPrimaryColor}] `}>
          Shipping Address
        </Text>
        <TouchableOpacity
          onPress={() => customSnapOpen(1)}
          className="flex-row items-center justify-center">
          <Text
            className={`text-md font-bold text-[${style.darkPrimaryColor}] `}>
            Add New
          </Text>
          <ArrowRightIcon size={16} color={style.darkPrimaryColor} />
        </TouchableOpacity>
      </View>

      {/* horizontal scroll */}
      <View className="flex-row justify-between items-center bg-white p-2 rounded-lg shadow-sm mt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="p-2 space-x-8"
          // contentContainerStyle={{flex: 1}}
        >
          {address.map((item, index) => (
            <AddressCard
              key={index}
              item={item}
              selectAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
        </ScrollView>
      </View>

      {/* Set this as default */}
      <View className="flex-row justify-between items-center mt-4">
        <CheckBox
          checked={selectedAddress?._id ? true : false}
          onChange={nextChecked => nextChecked && updateAddress()}>
          <Text className="capitalize text-md font-bold text-[#FF4E50]">
            {selectedAddress?.address}
          </Text>
        </CheckBox>
        <Text className="text-md font-bold text-[#FF4E50]">Set as Default</Text>
      </View>

      <View>
        <Text
          className={`text-lg font-bold text-[${style.darkPrimaryColor}] mt-4`}>
          Order Summary
        </Text>
      </View>

      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Repeat your CartCard component for each item */}
        {cart.items.map((item, index) => (
          <CartCard key={index} item={item} />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleConfirmOrder}
        className={`flex-row justify-center items-center bg-[${style.darkPrimaryColor}] rounded-lg py-3 m-2`}>
        <Text className="text-white font-semibold">Placed Order</Text>
      </TouchableOpacity>

      <BottomSheetComp
        title="Add Address"
        ref={addAddressRef}
        memoArray={['25%', '60%', '90']}>
        <AddAddress respectiveRef={addAddressRef} />
      </BottomSheetComp>
    </View>
  );
};

export default OrderConfimation;

const CartCard = ({item}: any) => {
  // Assuming you have cart item data here...
  const {productId, name, quantity, totalPrice} = item;
  return (
    <View className="flex-row justify-between items-center p-1 rounded-lg border border-gray-100 bg-white shadow">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: productId?.images[0],
          }} // Make sure this is the correct path to your image
          className="w-20 h-20 rounded-lg"
          resizeMode="contain"
        />
        <View className="">
          <Text className="text-sm font-bold">{productId.name}</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        {/* <TouchableOpacity>
          <Text
            className={`text-xl text-[${style.darkPrimaryColor}]  px-1 bg-white  `}>
            -
          </Text>
        </TouchableOpacity> */}
        <Text className="text-lg font-bold px-4">{quantity}</Text>
        {/* <TouchableOpacity>
          <Text
            className={`text-xl text-[${style.darkPrimaryColor}]  px-1 bg-white  `}>
            +
          </Text>
        </TouchableOpacity> */}
      </View>
      <View className="">
        <Text className="text-sm font-semibold">{totalPrice}</Text>
      </View>
    </View>
  );
};

const AddressCard = ({item, selectedAddress, setSelectedAddress}: any) => {
  // Assuming you have cart item data here...

  return (
    <TouchableOpacity
      className={`flex-row justify-between items-start p-1 rounded-lg border border-gray-100 shadow mr-3 pr-3 space-x-1
    ${selectedAddress?._id === item?._id ? 'bg-[#FF4E50]' : ''}
    `}
      onPress={() => setSelectedAddress({...item})}>
      <MapPinIcon size={24} color={style.darkPrimaryColor} />
      <View className="flex-row items-center">
        <View className="">
          <Text className="text-sm font-bold text-black capitalize ">
            {item?.address} {item?.type}
          </Text>
          <Text className="text-sm font-semibold text-gray-500">
            {item?.city} {item?.pincode}
            {selectedAddress?._id}
          </Text>
          <Text className="text-sm font-semibold text-gray-500">
            {item?.state}, {item?.country}
          </Text>
          <Text className="text-sm font-semibold text-gray-500">
            <Text className="text-sm font-semibold text-gray-500"></Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AddAddress = ({}: any) => {
  const [address, setAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    type: '',
  });

  const [checked, setChecked] = React.useState(false);

  const [type, setType] = React.useState('home');

  const handleTypeChange = (type: string) => {
    setAddress({...address, type});
  };

  const addNewAddress = () => {
    _userAccountService.addAddress(address).then(
      res => {
        console.log('res', res);
        setAddress(res.data);
        respectiveRef.current.close();
      },
      err => {
        console.log('err', err);
      },
    );
  };

  // useEffect(() => {
  //   console.log('checked', checked);
  // }, [checked]);

  return (
    <ScrollView className="bg-gray-50 flex-1 px-1">
      {/*  */}
      <MyText
        placeholder="Address"
        text={address.address}
        setText={text => setAddress({...address, address: text})}
        viewClassName="bg-white shadow-sm mt-1"
      />
      <MyText
        placeholder="City"
        text={address.city}
        setText={text => setAddress({...address, city: text})}
        viewClassName="bg-white shadow-sm mt-1"
      />
      <MyText
        placeholder="State"
        text={address.state}
        setText={text => setAddress({...address, state: text})}
        viewClassName="bg-white shadow-sm mt-1"
      />
      <MyText
        placeholder="Country"
        text={address.country}
        setText={text => setAddress({...address, country: text})}
        viewClassName="bg-white shadow-sm mt-1"
      />
      <MyText
        placeholder="Pincode"
        text={address.pincode}
        setText={text => setAddress({...address, pincode: text})}
        viewClassName="bg-white shadow-sm mt-1"
      />
      <View className="flex-row justify-between items-center bg-white p-2 rounded-lg shadow-sm mt-4">
        <CheckBox
          onChange={nextChecked => nextChecked && handleTypeChange('Home')}
          checked={
            address.type === 'home' || address.type === '' ? true : false
          }>
          Home
        </CheckBox>
        <CheckBox
          onChange={nextChecked => nextChecked && handleTypeChange('Work')}
          checked={
            address.type === 'Work' || address.type === '' ? true : false
          }>
          Work
        </CheckBox>
        <CheckBox
          onChange={nextChecked => nextChecked && handleTypeChange('Other')}
          checked={
            address.type === 'Other' || address.type === '' ? true : false
          }>
          Other
        </CheckBox>
      </View>
      <TouchableOpacity
        onPress={() => addNewAddress()}
        className={`flex-row justify-center items-center bg-[${style.darkPrimaryColor}] rounded-lg py-3 m-2`}>
        <Text className="text-white font-semibold">Add Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
