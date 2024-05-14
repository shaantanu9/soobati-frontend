// @ts-nocheck
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getAge} from '../utils/functions';
import {getItem, setItem} from '../utils/storage';
const Card = ({userData}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    console.log('pressed Liked');
    setIsLiked(prevState => !prevState);
    const likedUser = getItem('likedUser') || [];

    // If user is already liked then remove from liked list
    if (likedUser.includes(userData?._id)) {
      const filteredLikedUser = likedUser.filter(
        (item: any) => item !== userData?._id,
      );
      console.log('REMOVED', filteredLikedUser);
      setItem('likedUser', filteredLikedUser);
      return;
    } else {
      console.log('ADDDED');
      setItem('likedUser', [...likedUser, userData._id]);
    }
  };

  useEffect(() => {
    const likedUser = getItem('likedUser') || [];
    if (likedUser.includes(userData?._id)) {
      setIsLiked(true);
    }
  }, []);

  const navigateToUser = () => {
    navigation.push('SingleUserDetail', {userData: userData});
  };

  return (
    <View style={styles.card}>
      <View className=" flex w-90 justify-center items-center m-1 mt-4">
        <Image
          style={styles.image}
          source={
            //   {
            //   uri: 'https://cdn.pixabay.com/photo/2021/01/02/18/49/indian-5882625_1280.jpg',
            // }
            require('../assets/images/myphoto.jpeg')
          }
          resizeMode="cover"
          height={300}
          width={400}
        />
        <View style={styles.heartContainer}>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="heart" size={24} color={isLiked ? 'red' : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={navigateToUser}>
        <View style={styles.contentContainer}>
          <View
            className="flex flex-row justify-between items-center"
            onPress={() => {
              navigation.navigate('Profile', {userData: userData});
            }}>
            <Text className="text-xl font-bold capitalize text-black">
              {userData.name}
            </Text>
            <Text className="font-bold capitalize text-black">
              {getAge(userData.dob)}
               </Text>
          </View>
          <Text style={styles.description}></Text>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>{userData?.family?.address?.city}</Text>
          <Text style={styles.tag}>{userData?.salary} हजार</Text>
          <Text style={styles.tag}>
            {userData?.height['$numberDecimal']} foot
          </Text>
          <Text style={styles.tag}>{userData?.subCaste || 'फुलमाळी'}</Text>
          {/* <Text style={styles.tag}>#travel</Text> */}
          {/* <Text style={styles.tag}>#winter</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    flex: 1,
  },
  image: {
    width: '98%',
    height: 300,
    borderRadius: 10,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  tag: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 'bold',
  },
};

export default Card;
