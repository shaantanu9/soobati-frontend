import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  ShoppingCartIcon,
} from 'react-native-heroicons/outline';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import imagesassets from '../assets/images';
import {FilterIcon} from '../assets/svg';
import {useAppDispatch} from '../hooks/useAppSelector';
import {addItemToCart} from '../redux/features/cart/cartThunk';
import styles from '../styles';
import {NavigationProps} from '../utils/interface';
import { StackKeys } from '../Navigation/NavigationKeys';
const ProductDetailScreen = ({navigation}: NavigationProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Specifications');

  const routes = useRoute();
  const singleProductDetail: any = routes?.params?.data;
  console.log('FRom Routes', singleProductDetail.images);

  // Images array for the product
  const images = [
    imagesassets.bookImage1,
    imagesassets.bookImage2,
    imagesassets.bookImage3,
    imagesassets.bookImage4,
  ];

  const dispatch = useAppDispatch();
  const addtoCart = () => {
    Vibration.vibrate();
    dispatch(
      addItemToCart({
        productId: singleProductDetail._id,
        quantity: selectedQuantity,
        pricePerUnit: singleProductDetail.price,
        options: {},
      }),
    );
  };

  // Shared value for the horizontal scroll
  const scrollX = useSharedValue(0);
  const width = 300;

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
    onEndDrag: event => {
      runOnJS(setImageIndex)(Math.round(event.contentOffset.x / width));
    },
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollX.value, [0, 100], [1, 0]), // Example interpolation
    };
  });

  const handleQuantity = (value: number) => {
    const availableQuantity = singleProductDetail.quantity;
    if (
      selectedQuantity + value > 0 &&
      selectedQuantity + value <= availableQuantity
    ) {
      setSelectedQuantity(selectedQuantity + value);
    }
  };

  const renderContentBasedOnTab = () => {
    switch (activeTab) {
      case 'Specifications':
        return (
          <View>
            <Text>Specifications Content</Text>
          </View>
        );
      case 'Supplier Info':
        return (
          <>
            <Text>Supplier Info Content</Text>
            <Text>{singleProductDetail?.supplierInfo}</Text>
          </>
        );
      case 'Description':
        return (
          <>
            {/* <Text>Description Content</Text> */}
            <Text className="text-md font-semibold text-gray-500 mt-2 ">
              {singleProductDetail?.description}
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <SearchBar size={40} filter={false} rounded={'lg'} />
        <View className="flex-row items-center space-x-2">
          <ShareIcon size={24} color={styles.darkPrimaryColor} />
          <TouchableOpacity
          // className='rounded-lg p-2 bg-white shadow-md'
          onPress={() => navigation.navigate(StackKeys.Ecommerce.CartScreen)}
          >

          <ShoppingCartIcon size={24} color={styles.darkPrimaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalBorder />

      <ScrollView>
        <View className="flex-row justify-between px-4 py-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // className="p-2"
            contentContainerStyle={{paddingHorizontal: 8}}>
            {singleProductDetail?.specifications?.map(
              (item: any, index: number) => (
                <View className="justify-between items-center mr-8 px-2 shadow-xl border-r-1 border-gray-500">
                  <Text>{item.key}</Text>
                  <Text>{item.value}</Text>
                </View>
              ),
            )}
            {/* Add more Views for additional scrollable items if necessary */}
          </ScrollView>
          {/* Add more details */}
        </View>

        <HorizontalBorder />

        <View style={{height: hp('30%')}}>
          {/* Set the container height */}
          <Animated.ScrollView
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{flexDirection: 'row'}} // Ensure the images are in a row
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: wp('100%') * singleProductDetail?.images?.length,
            }}
            snapToInterval={wp('100%')}
            decelerationRate="fast">
            {singleProductDetail?.images?.map(
              (imgurl: string, index: number) => (
                <Image
                  key={index}
                  source={{uri: imgurl}}
                  resizeMode="contain"
                  style={{width: wp('100%'), height: hp('30%')}}
                />
              ),
            )}
          </Animated.ScrollView>
          <Text className="absolute top-0 right-0 p-2  rounded-lg shadow-md">
            {`${imageIndex + 1}/${singleProductDetail?.images?.length}`}
          </Text>
          <View className="absolute top-0 left-0 p-2  rounded-lg shadow-md">
            <View className="w-10 h-10 rounded-lg">
              <Text>Left</Text>
            </View>
          </View>
        </View>

        <HorizontalBorder />
        <View>
          <Text className="text-xl font-bold px-4 text-black">
            {singleProductDetail?.name}
          </Text>

          <View className="flex-row justify-between items-center bg-white px-4 shadow-md">
            <Text className="text-lg font-bold px-4">
              {singleProductDetail?.price}
            </Text>
            <Text className="px-4">
              {singleProductDetail?.isSubscriptionAvailable
                ? 'Subscription Available'
                : 'Subscription Not Available'}
            </Text>
          </View>
        </View>
        {/* <HorizontalBorder /> */}

        <View className="flex-row justify-around  bg-white p-4">
          {['Specifications', 'Supplier Info', 'Description'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`p-2 ${activeTab === tab ? 'border-b-2 ' : ''}`}
              style={{
                borderBottomColor:
                  activeTab === tab ? styles.darkPrimaryColor : 'transparent',
              }}>
              <Text
                className={`text-center ${
                  activeTab === tab
                    ? `text-[${styles.darkPrimaryColor}] font-bold`
                    : 'text-gray-500'
                }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render content based on selected tab */}
        <View className="p-4">{renderContentBasedOnTab()}</View>
      </ScrollView>

      <View className="flex-row items-center justify-between p-4 bg-white">
        <View>
          {/* <Text>Quantity</Text> */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-between bg-white">
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => handleQuantity(-1)}>
                  <Text
                    //  className="text-2xl font-bold mx-2"
                    className={`text-2xl font-bold mx-2 bg-[${
                      styles.darkPrimaryColor
                    }] text-white rounded-lg p-2
                    ${selectedQuantity === 1 ? 'opacity-50' : ''}
                    `}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text className="text-xl">{selectedQuantity}</Text>
                <TouchableOpacity onPress={() => handleQuantity(+1)}>
                  <Text
                    // className="text-2xl font-bold mx-2"
                    className={`text-2xl font-bold mx-2 bg-[${
                      styles.darkPrimaryColor
                    }] text-white rounded-lg p-2
                    ${
                      selectedQuantity === singleProductDetail.quantity
                        ? 'opacity-50'
                        : ''
                    }
                    `}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className={` bg-[${styles.darkPrimaryColor}] rounded-lg p-2 flex-row space-x-2 justify-center items-center`}
          onPress={addtoCart}>
          <ShoppingCartIcon size={24} color={'white'} strokeWidth={2} />
          <Text className="text-white font-bold">Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const HorizontalBorder = () => {
  return <View className="h-[2px] bg-gray-100 my-2 w-full" />;
};

const SearchBar = ({size, filter, rounded}: any) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

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
    <View
      className={`bg-white rounded-${rounded} flex-row justify-start items-center space-x-2 px-2 `}>
      <MagnifyingGlassIcon size={20} color="gray" />
      <TextInput
        placeholder="Search"
        className=" text-gray-500"
        style={{
          width: wp(size ? size : 70),
          height: hp(6),
          // on focus border color
        }}
      />
      {filter && (
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <FilterIcon />
        </TouchableOpacity>
      )}
      {filter && renderFilterModal()}
    </View>
  );
};
