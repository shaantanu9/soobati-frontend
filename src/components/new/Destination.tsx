import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BookData} from '../../common/constant';
const Destination = () => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {BookData.map((item, index) => (
        <DestinationCard item={item} key={index} navigation={navigation} />
      ))}
    </View>
  );
};

export default Destination;

const DestinationCard = ({item, navigation}: any) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('Details', {...item})}
      style={{
        width: wp('40%'),
        height: wp('60%'),
      }}
      className="flex justify-end relative p-1 space-y-2 mb-5">
      <Image
        source={item.image}
        className="w-full rounded-lg absolute"
        style={{width: wp('40%'), height: wp('60%')}}
      />

      <TouchableOpacity
        className="absolute top-2 right-3"
        onPress={handleFavorite}>
        <HeartIcon size={wp(6)} color={isFavorite ? 'red' : 'white'} />
      </TouchableOpacity>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          width: wp('40%'),
          height: hp('10%'),
          //   borderBottomLeftRadius: 35,
          //   borderBottomRightRadius: 35,
          borderRadius: 10,
        }}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        className="bottom-0 absolute"
      />
      <View className="absolute bottom-0 p-2">
        <Text style={{fontSize: wp('3.5')}} className="text-white font-bold ">
          {item.title}
        </Text>
        <Text className="text-white " style={{fontSize: wp('2.2')}}>
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
