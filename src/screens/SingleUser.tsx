import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {userservice} from '../services/api';

type SingleUserProps = {
  _id: string;
};

interface UserData {
  name?: string;
  family?: {
    mobile?: string;
  };
  uncle?: {
    mobile?: string;
  };
  images?: string[];
  _id?: string;
}

const SingleUserDetail = ({_id}: SingleUserProps) => {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    userservice._userAccountService
      .getSingleUserProfile(_id)
      .then(res => {
        if (res.statusCode == 200) {
          setUserData(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <View className="text-2xl">
        <Text className="text-2xl">SingleUserDetail</Text>
      </View>
    </ScrollView>
  );
};

export default SingleUserDetail;
