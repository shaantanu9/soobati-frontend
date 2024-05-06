import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import style from '../../../styles/index';
const data = {
  id: 1,
  image: images.signup,
  title: 'The trials of apollo the burning maze',
  subTitle: 'Action, Adventure',
  msg: 'Greek Mythology, Fantasy',
  payNow: 'Pay Now $ 79',
  originalPrice: '$69',
  soldBy: '2036',
  tax: '$10',
  total: '$79',
  invoiceNumber: '#135675323',
  date: 'July 16 2022',
  withoutDiscountPrice: '$138',
  rating: 5,
  noOfPeopleRated: 1029,
  author: 'By Mark Manson',
  discount: '50% Off',
  chapterName: 'Mindset not to care ',
  bookTitleText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  bookParagraphText1:
    ' When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,',
  bookParagraphText2:
    ' Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  bookParagraphHighlightText:
    "“ orem Ipsum has been the industry's standard dummy text ever since the 1500s ”",
  bookParagraphText3:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
};

const OrderSuccessScreen = () => {
  const route = useRoute();
  //   const data: any = route.params;
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!data)
    return (
      <View>
        <Text>No data</Text>
      </View>
    );

  return (
    <View className="bg-white flex-1">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        // translucent={true} // this will make the status bar translucent so that the background image will be visible
      />
      <Image
        source={images.orderplaced}
        className="w-full mt-28"
        // resizeMode='contain'
        style={{height: hp('50%')}}
      />

      <View>
        <Text className="text-2xl font-semibold text-center">
          Order Success
        </Text>
        <Text className="text-center text-gray-500">
          Your order has been placed successfully
        </Text>
      </View>

      <View
        style={{
          // height: hp('50%'),
          borderTopLeftRadius: 135,
          borderTopRightRadius: 135,
        }}
        className=" flex flex-1 justify-end bg-white p-4 rounded-full ">
        <TouchableOpacity
          onPress={() => navigation.navigate('TabNavigation')}
          className={`mb-1 flex-row justify-center items-center rounded-full py-3 + bg-[${style.darkPrimaryColor}]`}>
          <Text className="text-white font-semibold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;

// import React from 'react';
// import {Text, View} from 'react-native';
// const Details = () => {
//   return (
//     <View className="text-2xl">
//       <Text className="text-2xl">Details</Text>
//     </View>
//   );
// };

// export default Details;
