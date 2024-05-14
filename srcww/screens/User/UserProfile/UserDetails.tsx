import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {PencilIcon} from 'react-native-heroicons/outline';
import images from '../../../assets/images/index';
import Chip from '../../../components/new/Chips';
const Userdetail = ({userDetail, ownProfile}: any) => {
  return (
    <ScrollView className="flex-1 space-y-2">
      <View className="flex space-y-1">
        <View className="flex-row justify-between items-center w-full ">
          <Text className="text-lg font-bold">About</Text>
          {ownProfile && (
            <TouchableOpacity>
              <PencilIcon size={16} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-row">
          {/* <Text className="text-lg">{userDetail.about}</Text> */}
          <Text className="text-md text-gray-500 mt-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
            error aut, vel harum nihil provident praesentium doloribus
            aspernatur maiores odit cum laboriosam. Iure ipsum eligendi rerum
            illum nobis nesciunt, incidunt
          </Text>
        </View>
      </View>
      <View className="flex space-y-1">
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-lg font-bold">Skill</Text>
          {ownProfile && (
            <TouchableOpacity>
              <PencilIcon size={16} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-row flex-wrap">
          <Chip label="React" />
          <Chip label="React Native" />
          <Chip label="Node.js" />
          <Chip label="Express.js" />
          <Chip label="MongoDB" />
          <Chip label="Firebase" />
        </View>
      </View>
      <View className="flex space-y-1">
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-lg font-bold">Experience</Text>
          {ownProfile && (
            <TouchableOpacity>
              <PencilIcon size={16} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View className=" m-8 flex-row flex-wrap gap-4 justify-start item-center">
          <View>
            <Image
              source={images.userImage1}
              className="w-10 h-10 mt-2 rounded-lg bg-red-500"
              style={{borderRadius: 50}}
            />
          </View>
          <View>
            <Text className="text font-bold">Senior Developer</Text>
            <Text className="text">Google</Text>
            <Text className="text">2020 - 2021</Text>
          </View>
        </View>
        <View className=" m-8 flex-row flex-wrap gap-2 justify-start item-center">
          <View>
            <Image
              source={images.userImage1}
              className="w-10 h-10 mt-2"
              style={{borderRadius: 50}}
            />
          </View>
          <View>
            <Text className="text-md font-bold">Senior Developer</Text>
            <Text className="text-md">Google</Text>
            <Text className="text-md">2020 - 2021</Text>
          </View>
        </View>
        <View className=" m-8 flex-row flex-wrap gap-2 justify-start item-center">
          <View>
            <Image
              source={images.userImage1}
              className="w-10 h-10 mt-2"
              style={{borderRadius: 50}}
            />
          </View>
          <View>
            <Text className="text-md font-bold">Senior Developer</Text>
            <Text className="text-md">Google</Text>
            <Text className="text-md">2020 - 2021</Text>
          </View>
        </View>
        <View className=" m-8 flex-row flex-wrap gap-2 justify-start item-center">
          <View>
            <Image
              source={images.userImage1}
              className="w-10 h-10 mt-2"
              style={{borderRadius: 50}}
            />
          </View>
          <View>
            <Text className="text-md font-bold">Senior Developer</Text>
            <Text className="text-md">Google</Text>
            <Text className="text-md">2020 - 2021</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Userdetail;
