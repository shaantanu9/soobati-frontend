import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getItem} from '../utils/storage';
import Listing from './Listing';
const Favorite = () => {
  const [likedUserData, setLikedUserData] = useState<any>({});
  const [favListEmpty, setFavListEmpty] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchData = () => {
    const jsonData: any =
      getItem('userData') || JSON.parse(getItem('userData'));

    const likedUser: any = getItem('likedUser');
    console.log(likedUser, 'likedUser');

    const likedUserArray = likedUser?.map((item: any) => {
      return jsonData?.find((user: any) => user._id === item);
    });

    console.log(likedUserArray, 'likedUserArray', likedUserArray.length);
    setUserData(likedUserArray);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect');
      fetchData();
    }, []),
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData.length === 0) {
      setFavListEmpty(true);
    } else {
      setFavListEmpty(false);
    }
  }, [userData]);

  return (
    <View>
      {favListEmpty ? (
        <Text className="text-xl font-bold capitalize text-black">
          Favorite List is Empty
        </Text>
      ) : (
        <Listing listingData={userData} />
      )}
    </View>
  );
};

export default Favorite;
