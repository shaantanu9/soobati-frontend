// import {useNavigation, useRoute} from '@react-navigation/native';
// import React from 'react';
// import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {
//   ChevronLeftIcon,
//   ClockIcon,
//   StarIcon,
// } from 'react-native-heroicons/outline';
// import {HeartIcon} from 'react-native-heroicons/solid';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import {SafeAreaView} from 'react-native-safe-area-context';

// const Details = () => {
//   const route = useRoute();
//   const data: any = route.params;
//   const navigation = useNavigation();

//   const [isFavorite, setIsFavorite] = React.useState(false);

//   const handleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   if (!data)
//     return (
//       <View>
//         <Text>No data</Text>
//       </View>
//     );

//   return (
//     <View className="bg-white flex-1">
//       <StatusBar
//         barStyle={'light-content'}
//         // backgroundColor={'red'}
//         // translucent={true} // this will make the status bar translucent so that the background image will be visible
//       />
//       <Image
//         source={data.image}
//         className="w-full"
//         // resizeMode='contain'
//         style={{height: hp('50%')}}
//       />
//       <SafeAreaView className="flex-row justify-between items-center w-full absolute">
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className="p-2 rounded-full bg-white ml-4 mt-4"
//           style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
//           <ChevronLeftIcon size={24} color={'white'} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => handleFavorite()}
//           className="p-2 rounded-full bg-white ml-4 mt-4"
//           style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
//           <HeartIcon size={24} color={'white'} />
//         </TouchableOpacity>
//       </SafeAreaView>

//       <View
//         style={{
//           // height: hp('50%'),
//           borderTopLeftRadius: 135,
//           borderTopRightRadius: 135,
//         }}
//         className=" flex flex-1 justify-between bg-white p-4 rounded-full ">
//         <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
//           <View className="flex-row justify-between items-start">
//             <Text className="text-2xl font-bold">{data.title}</Text>
//             <View className="flex-row justify-center items-center">
//               <Text className="text-lg font-semibold text-gray-500 ">
//                 {data.rating}
//               </Text>
//               <StarIcon size={20} color={'#FF4238'} />
//             </View>
//           </View>
//           <View className="flex-row justify-between items-center">
//             <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//               {data.bookParagraphText1}
//             </Text>
//           </View>
//           <View className="flex-row justify-between items-center">
//             {/* Number of item */}
//             <View className="flex-row justify-between items-start">
//               <ClockIcon size={20} color={'#FF4238'} />
//               <View className="flex justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   {data.tax}
//                 </Text>
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   Tax
//                 </Text>
//               </View>
//             </View>
//             <View className="flex-row justify-between items-start">
//               <ClockIcon size={20} color={'#FF4238'} />
//               <View className="flex justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   {data.tax}
//                 </Text>
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   Tax
//                 </Text>
//               </View>
//             </View>
//             <View className="flex-row justify-between items-start">
//               <ClockIcon size={20} color={'#FF4238'} />
//               <View className="flex- justify-between items-center">
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   {data.tax}
//                 </Text>
//                 <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//                   Tax
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View className="flex-row justify-between items-center">
//             <Text className="text-lg font-semibold text-gray-500 tracking-wide">
//               {data.bookParagraphText2}
//             </Text>
//           </View>
//         </ScrollView>
//         <TouchableOpacity className=" mb-1 flex-row justify-center items-center bg-red-500 rounded-full py-3">
//           <Text className="text-white font-semibold">Read Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Details;

// // import React from 'react';
// // import {Text, View} from 'react-native';
// // const Details = () => {
// //   return (
// //     <View className="text-2xl">
// //       <Text className="text-2xl">Details</Text>
// //     </View>
// //   );
// // };

// // export default Details;

import React, {useState} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
import {FilterIcon} from 'src/assets/svg';
import imagesassets from '../assets/images';
import styles from '../styles';
const ProductDetailScreen = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Specifications');

  // Images array for the product
  const images = [
    imagesassets.bookImage1,
    imagesassets.bookImage2,
    imagesassets.bookImage3,
    imagesassets.bookImage4,
  ];

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

  const renderContentBasedOnTab = () => {
    switch (activeTab) {
      case 'Specifications':
        return <Text>Specifications Content</Text>;
      case 'Supplier Info':
        return <Text>Supplier Info Content</Text>;
      case 'Description':
        return <Text>Description Content</Text>;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <ChevronLeftIcon size={24} color="#000" />

        <View className="flex-row items-center space-x-2">
          <ShareIcon size={24} color="#000" />
          <ShoppingCartIcon size={24} color="#000" />
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
            <View className="justify-between items-center mr-8 px-2 shadow-xl border-r-1 border-gray-500">
              <Text>Product Code: 123456</Text>
              <Text>Product Name: Tie Rod End</Text>
            </View>
            <View className="justify-between items-center px-2 border-r-1 border-gray-100">
              <Text>Brand Mahindra</Text>
              <Text>Model Bolero Invader</Text>
            </View>
            <View className="justify-between items-center px-2 border-r-1 border-r-1 border-gray-100">
              <Text>Brand Mahindra</Text>
              <Text>Model Bolero Invader</Text>
            </View>
            <View className="justify-between items-center px-2 border-r-1 border-r-1 border-gray-100">
              <Text>Brand Mahindra</Text>
              <Text>Model Bolero Invader</Text>
            </View>
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
              width: wp('100%') * images.length,
            }}
            snapToInterval={wp('100%')}
            decelerationRate="fast">
            {images.map((img, index) => (
              <Image
                key={index}
                source={img}
                resizeMode="contain"
                style={{width: wp('100%'), height: hp('30%')}}
              />
            ))}
          </Animated.ScrollView>
          <Text className="absolute top-0 right-0 p-2  rounded-lg shadow-md">
            {`${imageIndex + 1}/${images.length}`}
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
            This is Book
          </Text>

          <View className="flex-row justify-between items-center bg-white px-4 shadow-md">
            <Text className="text-lg font-bold px-4">$ 200,000</Text>
            <Text className="px-4">4 Piece Available</Text>
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
                <TouchableOpacity
                  onPress={() =>
                    setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                  }>
                  <Text className="text-2xl font-bold mx-2">-</Text>
                </TouchableOpacity>
                <Text className="text-xl">{selectedQuantity}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedQuantity(selectedQuantity + 1)}>
                  <Text className="text-2xl font-bold mx-2">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className={` bg-[${styles.darkPrimaryColor}] rounded-lg p-2 flex-row space-x-2 justify-center items-center`}>
          <ShoppingCartIcon size={24} color={'white'} />
          <Text className="text-white">Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const HorizontalBorder = () => {
  return <View className="h-[2px] bg-gray-100 my-2 w-full" />;
};

const SearchBar = () => {
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
  );
};
