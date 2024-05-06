import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {getAge} from '../utils/functions';

import TableReact from './Tabal';
const SingleUserDetail = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>({});
  const route: any = useRoute();
  useEffect(() => {
    const user: any = route?.params?.userData || {};
    setUserData(user);
  }, []);

  const RequestBioData = () => {
    // navigation.navigate('Biodata', {userData});
    // console.log('RequestBioData');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View>
        <View className="flex flex-row justify-between items-center bg-[#ff504a]">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            // className="bg-[#FF4238] rounded-lg p-2 m-2"
          >
            <MIcon name="keyboard-backspace" size={34} color="white" />
          </TouchableOpacity>
          <Text className="text-white center font-bold text-lg text-center capitalize p-2">
            {userData?.name}
          </Text>
          <Text className="text-white center font-bold text-lg text-center capitalize p-2">
            {getAge(userData?.dob)}
          </Text>
        </View>
        <TableReact userData={userData} />
        <TouchableOpacity
          onPress={RequestBioData}
          className="bg-[#FF4238] rounded-lg p-2 m-2">
          <Text
            className="text-white center font-bold text-lg"
            style={{textAlign: 'center'}}>
            Biodata मागा
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SingleUserDetail;
