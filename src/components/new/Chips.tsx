import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/outline'; // Assuming you are using heroicons for icons

const Chip = ({label, onClose, hasCloseIcon = false}: any) => {
  return (
    <View className="flex-row items-center bg-blue-200 px-4 py-2 rounded-full m-1">
      <Text className="text-blue-800 text-sm font-semibold">{label}</Text>
      {hasCloseIcon && (
        <TouchableOpacity onPress={onClose} className="pl-2">
          <XMarkIcon size={18} color="#3182ce" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Chip;
