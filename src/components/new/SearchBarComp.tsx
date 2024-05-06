import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FilterIcon} from '../../assets/svg';

interface SearchBarCompProps {
  size?: number;
  filterModalVisible: boolean;
  setFilterModalVisible: (visible: boolean) => void;
  filter?: boolean;
  rounded?: number;
}

const SearchBarComp = ({
  size,
  filterModalVisible,
  setFilterModalVisible,
  filter,
  rounded,
}: SearchBarCompProps) => {
  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View className="justify-end flex-1">
          <View className="bg-white p-4 rounded-t-3xl shadow-lg">
            <Text className="text-lg font-semibold">Filter Options</Text>
            {/* Implementing Order Status Filters */}
            <Text className="text-md font-semibold mt-4">Order Status</Text>
            <View className="flex-row justify-between flex-wrap">
              <Button
                title="New"
                onPress={() => console.log('Filter by New')}
              />
              {/* More buttons */}
            </View>
            {/* Date Range */}
            <Text className="text-md font-semibold mt-4">Date Range</Text>
            <View className="flex-row justify-between">
              <TextInput placeholder="Start Date" />
              <TextInput placeholder="End Date" />
            </View>
            {/* More filters */}
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              className="items-center py-2 mt-4">
              <Text className="text-purple-600">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView>
      <View
        className={`bg-white rounded-${rounded} flex-row justify-start items-center space-x-2 px-2 `}>
        <MagnifyingGlassIcon size={20} color="gray" />
        <TextInput
          placeholder="Search"
          className=" text-gray-500"
          style={{
            width: wp(size ? size : 70),
            height: hp(6),
            // on focus border color
          }}
        />
        {filter && (
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <FilterIcon />
          </TouchableOpacity>
        )}
        {/* {filter && renderFilterModal()} */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBarComp;
