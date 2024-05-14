import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {theme} from '../../Theme';
import {BookData} from '../../common/constant';

const Categories = () => {
  return (
    <View className="space-y-5">
      <View className="mx-5 flex-row justify-between items-center">
        <Text className="text-neutral-700 font-semibold">Categories</Text>
        <TouchableOpacity>
          <Text style={{fontSize: wp('3.5%'), color: theme.text}}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{paddingHorizontal: 10}}
        className="flex-row space-x-5"
        showsHorizontalScrollIndicator={false}>
        {BookData.map((item, index) => {
          return (
            <View key={index} className="flex-1">
              <TouchableOpacity className="flex items-center space-y-2">
                <View className="flex-row items-center">
                  <View className="bg-neutral-100 p-3 rounded-3xl">
                    <Image
                      source={item.image}
                      //   className=" bg-neutral-100 p-3 rounded-3xl"
                      style={{height: wp('15'), width: wp('15')}}
                    />
                  </View>
                </View>
                <Text className="text-neutral-700 ml-3">{item.author}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
