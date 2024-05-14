import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {theme} from '../../Theme';
import {BookData} from '../../common/constant';

const CategoriesType = () => {
  const [activeSort, setActiveSort] = useState('75');

  return (
    <View className="flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-5">
      {BookData.map((item, index) => {
        let isActive = activeSort === item.total;
        let activeButtonClass = isActive ? 'bg-white shadow-lg' : '';

        return (
          <TouchableOpacity
            onPress={() => setActiveSort(item.total)}
            key={index}
            className={`p-3 flex items-center space-y-2 px-4 rounded-full ${activeButtonClass}`}
            style={{padding: wp('2%')}}>
            <Text style={{fontSize: wp('3.5%'), color: theme.text}}
            className='font-semibold'>
              {item.total}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CategoriesType;
