import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {userservice} from '../services/api';
import {clearStorage, getItem} from '../utils/storage';
import TableReact from './Tabal';

type SingleUserProps = {
  _id: string;
};

interface UserData {
  // name?: string;
  // family?: {
  //   mobile?: string;
  // };
  // uncle?: {
  //   mobile?: string;
  // };
  // images?: string[];
  // _id?: string;
}

const AccountDetails = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const userData: any = getItem('user');
    setUserData(userData);
  }, []);

  const updateUser = () => {
    userservice._userAccountService
      .update(userData._id, userData)
      .then(res => {
        if (res.statusCode == 200) {
          setUserData(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    clearStorage();
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <TableReact userData={userData} />
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-[#FF4238] rounded-lg p-2 m-2">
          <Text
            className="text-white center font-bold text-lg"
            style={{textAlign: 'center'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountDetails;
