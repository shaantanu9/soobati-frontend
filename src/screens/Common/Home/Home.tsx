import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MagnifyingGlassCircleIcon} from 'react-native-heroicons/outline';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ImagesAssets from '../../../assets/images/index';
import Categories from '../../../components/new/Categories';
import CategoriesType from '../../../components/new/CategoriesTypes';
import Destination from '../../../components/new/Destination';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {NavigationProps} from '../../../utils/interface';
const ios = Platform.OS === 'ios';
const topMargin = ios ? 'mt-3' : 'mt-5';

const HomeScreen = ({navigation}: NavigationProps) => {
  const userDetail = useAppSelector(state => state.user);
  console.log('userDetail ome', userDetail);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={'p-4  space-y-6 ' + topMargin}>
        <View className="mx-2 flex-row justify-between items-center mb-10">
          <Text className="text-2xl font-bold">Lets Discover</Text>
          {/*
           */}
          <TouchableOpacity
            // pass id as routes how to pass id in routes params
            onPress={() =>
              navigation.navigate('UserProfile', {_id: userDetail.userId})
            }>
            <Image
              source={ImagesAssets.userImage2}
              style={{height: wp('10%'), width: wp('10%')}}
            />
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View className="mx-2 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full px-4 space-x-2 pl-6">
            <MagnifyingGlassCircleIcon
              size={20}
              strokeWidth={3}
              color={'gray'}
            />
            <TextInput
              placeholder="Search"
              className="w-4/5 flex-1 text-base pl-1 mb-1 tracking-wider"
              placeholderTextColor={'gray'}
            />
          </View>
        </View>
        <View className="mb-2 flex-1">
          <Categories />
        </View>
        <View className="mb-2 flex-1">
          <CategoriesType />
        </View>
        <View className="mb-2 flex-1">
          <Destination />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
