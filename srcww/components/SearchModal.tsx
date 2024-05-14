// @ts-nocheck
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setField} from '../context/AppCreator';
import {useAppContext} from '../hooks/useAppContext';
import {searchUsers} from '../utils/searchUsers';
import {getItem} from '../utils/storage';
import RangeSlider from './RangeSlider';
import { Switch } from 'react-native';

const SearchModal = ({isModalVisible, setIsModalVisible}: any) => {
  const height = Dimensions.get('window').height - 50;
  const {state, dispatch} = useAppContext() || {};
  const [value, setValue] = React.useState(0);
  const navigation = useNavigation();
  const [ageRange, setAgeRange] = React.useState([18, 50]);
  const [salaryRange, setSalaryRange] = React.useState([0, 300]);
  const [heightRange, setHeightRange] = React.useState([4, 8]);
  const [search, setSearch] = React.useState('');

  const handleOverlayPress = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;

    // Check if the tap is outside the modal content
    if (locationY < 0 || locationY > 250 || locationX < 0 || locationX > 375) {
      console.log('handleOverlayPress');
      setIsModalVisible(false);
    }
  };

  const handleFilterPress = () => {
    console.log('handleFilterPress', {ageRange, salaryRange, heightRange});
    const filterData = {
      ageRange,
      salaryRange,
      //   heightRange,
      search,
    };

    const filteredData = searchUsers(filterData);
    // console.log(filteredData, 'filteredData');
    const currentUser = getItem('user');
    const filteredDataWithoutCurrentUser = filteredData.filter(
      (user: any) => user._id !== currentUser._id,
    );
    // console.log(
    //   filteredDataWithoutCurrentUser,
    //   'filteredDataWithoutCurrentUser',
    // );
    dispatch && dispatch(setField('userData', filteredDataWithoutCurrentUser));
    navigation.push('Listing', {
      userData: filteredDataWithoutCurrentUser,
    });
  };


  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      style={{
        // height: 150,
        width: '100%',
        flex: 1,
        // justifyContent: 'start',
        // margin: 'auto',
      }}
      onRequestClose={() => setIsModalVisible(false)}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View
          className="flex flex-1 bg-white px-2 "
          style={{
            backgroundColor: 'white',
          }}>
          <View
            className="flex flex-row justify-between items-center"
            style={{
              backgroundColor: 'white',
              height: 100,
            }}>
            <View>
              <Text className="text-black text-lg font-bold">Filter</Text>
            </View>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>

            <View className="flex flex-row justify-start items-center border border-black rounded-lg pl-2">
              <Icon name="search" size={24} color="black" />
              <TextInput
                placeholder="Search"
                onChangeText={text => setSearch(text)}
                value={search}
                className="w-80 text-black text-xl font-bold "
              />
            </View>
            <Text className="text-black text-lg font-bold">Toggle</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

            <RangeSlider
              value={ageRange[1]}
              setValue={value => {
                setAgeRange([ageRange[0], value]);
              }}
              min={18}
              max={50}
              step={1}
              name="Age"
            />
            <RangeSlider
              value={salaryRange[1]}
              setValue={value => {
                setSalaryRange([salaryRange[0], value]);
              }}
              min={0}
              max={300}
              step={1}
              name="Salary"
            />
            <RangeSlider
              value={heightRange[1]}
              setValue={height => {
                setHeightRange([heightRange[0], height]);
              }}
              min={4}
              max={8}
              step={0.1}
              name="Height"
            />

            <TouchableOpacity
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FF4238',
              }}
              onPress={handleFilterPress}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View
          style={{
            height: height - 20,
            width: '100%',
            justifyContent: 'start',
            backgroundColor: 'white',
            // padding: 10,
          }}
          className="px-2">
          <View className="flex flex-row justify-start items-center border border-black rounded-full pl-2 mt-4">
            <Icon name="search" size={24} color="black" />
            <TextInput
              placeholder="Search"
              onChangeText={text => setSearch(text)}
              value={search}
              placeholderTextColor={'black'}
              focusable={true}
              className="w-80 text-black text-xl font-bold "
            />
          </View>

          <View className="px-2 mt-6 flex flex-col justify-between items-center ">
            <RangeSlider
              value={ageRange[1]}
              setValue={value => {
                setAgeRange([ageRange[0], value]);
              }}
              min={18}
              max={50}
              step={1}
              name="Age"
            />
            <RangeSlider
              value={salaryRange[1]}
              setValue={value => {
                setSalaryRange([salaryRange[0], value]);
              }}
              min={0}
              max={300}
              step={1}
              name="Salary"
            />
            <RangeSlider
              value={heightRange[1]}
              setValue={height => {
                setHeightRange([heightRange[0], height]);
              }}
              min={4}
              max={8}
              step={0.1}
              name="Height"
            />

            <TouchableOpacity
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FF4238',
              }}
              onPress={handleFilterPress}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SearchModal;
