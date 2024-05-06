import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchModal from '../components/SearchModal';
import SingleUserCard from '../components/SingleUserCard';
import {useAppContext} from '../hooks/useAppContext';
// const Listing = ({userData, showSearch, setShowSearch, filterData}: any) => {
const Listing = ({listingData}: any) => {
  // const {state} = useAppContext() || {};
  const state = useAppContext();

  const [userData, setUserData] = useState([]);
  const route = useRoute();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Access data/parameters from the route object
  // console.log(data, 'data in listing screen');
  // console.log(state, 'data in listing screen');

  useEffect(() => {
    // const data: any = route.params;
    const data = [
      {
        userData: [
          {
            _id: '1',
            name: 'John Doe',
            dob: '1990-01-01',
          },
          {
            _id: '2',
            name: 'Jane Doe',
            dob: '1990-01-01',
          },
          {
            _id: '3',
            name: 'John Doe',
            dob: '1990-01-01',
          },
          {
            _id: '4',
            name: 'Jane Doe',
            dob: '1990-01-01',
          },
          {
            _id: '5',
            name: 'John Doe',
            dob: '1990-01-01',
          },
          {
            _id: '6',
            name: 'Jane Doe',
            dob: '1990-01-01',
          },
          {
            _id: '7',
            name: 'John Doe',
            dob: '1990-01-01',
          },
          {
            _id: '8',
            name: 'Jane Doe',
            dob: '1990-01-01',
          },
          {
            _id: '9',
            name: 'John Doe',
            dob: '1990-01-01',
          },
          {
            _id: '10',
            name: 'Jane Doe',
            dob: '1990-01-01',
          },
        ],
      },
    ];
    if (listingData) {
      console.log(listingData, 'listingData in listing screen');
      setUserData(listingData);
    } else {
      console.log(data.userData, 'data in listing screen222');
      setUserData(data.userData);
    }

    return () => {
      setUserData([]);
      setIsModalVisible(false);
    };
  }, [listingData, route.params]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem = ({item}: any) => <SingleUserCard userData={item} />;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // console.log(userData, 'userData in listing');
  const handleShowModal = () => {
    setShowSearchModal(true);
    setIsModalVisible(true);
  };

  return (
    <View className="w-full h-full">
      {!isModalVisible && (
        <View className="flex flex-row justify-between items-center px-2">
          <View className="flex flex-row justify-start items-center gap-3">
            <Icon name="keyboard-backspace" size={34} color="black" />
            <Text className="text-xl font-bold text-black">Listing</Text>
          </View>
          <TouchableOpacity
            onPress={handleShowModal}
            className="bg-[#FF4238] rounded-lg p-2 m-2 ">
            <Text className="text-white center font-bold text-lg text-center">
              Search
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showSearchModal && (
        <SearchModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      {userData?.length === 0 && (
        <View className="flex justify-center items-center w-full h-full">
          <Text className="text-center text-xl font-bold text-red-500">
            No Data Found
          </Text>
        </View>
      )}
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={() => {
          if (userData?.next) {
            setPage(prevPage => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        className="w-full"
      />
    </View>
  );
};

export default Listing;
