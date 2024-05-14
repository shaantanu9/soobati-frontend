import React, { useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { CameraIcon } from 'react-native-heroicons/outline';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from '../../../styles';
import requestCameraPermission from '../../../utils/requestCameraPermission';

interface ImagePickerProps {
  selectionLimit?: number;
  maxWidth?: number;
  maxHeight?: number;
  imageData: any;
  setImageData: (data: any) => void;
}

const ImagePickerComponent = ({
  selectionLimit,
  maxWidth,
  maxHeight,
  imageData,
  setImageData,
}: ImagePickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const options: any = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: maxWidth || 1024,
    maxHeight: maxHeight || 1024,
    selectionLimit: selectionLimit || 1,
    includeBase64: true,
  };

  const handleImagePick = async (type: any) => {
    if (type === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permissions required',
          'Camera permission is required to take photos.',
        );
        return;
      }
    }

    const picker = type === 'camera' ? launchCamera : launchImageLibrary;
    picker(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled the picker');
      } else if (response?.error) {
        console.log(`${type} Picker Error: `, response.error);
        // setModalVisible(false);
      } else {
        if (!response.assets) return;
        const images = response?.assets.map((asset: any) => ({
          base64: asset.base64,
          fileName: asset.fileName,
        }));
        setImageData(images);
        setModalVisible(false);
      }
    });
  };

  // const handleSave = async (images:any) => {
  //   for (const uri of images) {
  //     const res = await _productService.getImageKitAuth();
  //     const imagekit = new ImageKit({
  //       publicKey: 'public_FDC/RCuLLeKyD5vinpopNKvqd0U=',
  //       urlEndpoint: 'https://ik.imagekit.io/soobati/',
  //     });

  //     imagekit.upload(
  //       {
  //         file: uri.base64,
  //         fileName: uri.fileName,
  //         tags: ['tag1'],
  //         token: res.data.token,
  //         signature: res.data.signature,
  //         expire: res.data.expire,
  //       },
  //       function (err: any, result: any) {
  //         console.log('Inside Imagekit callback');
  //         if (err) {
  //           console.log(err, 'ERROR');
  //         }
  //         console.log(result, 'RESULT');
  //         return {
  //           thumbnailUrl: result.thumbnailUrl,
  //           url: result.url,
  //         };
  //       },
  //     );
  //   }
  // };

  return (
    <View 
    // style={{flex: 1}}
    className='mt-2'
    >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row justify-center items-center bg-gray-200 w-full h-10 rounded-md">
          <Text
          className="font-bold"
          >Upload Image  </Text>
        <CameraIcon color="#000" size={30} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 10,
          }}
          className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
          <View className="bg-white px-5 py-3 rounded-md flex justify-center ">
            <TouchableOpacity
              className={`bg-[${styles.darkPrimaryColor}] p-2 rounded-xl`}
              style={{marginBottom: 10}}
              onPress={() => handleImagePick('camera')}>
              <Text className="text-white text-lg font-bold">Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleImagePick('library')}
              className={`bg-[${styles.darkPrimaryColor}] p-2 rounded-xl`}>
              <Text
                className="text-white text-lg font-bold"
                style={{fontSize: 18}}>
                Choose from Library
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-400 p-2 rounded-lg shadow mt-4 justify-center items-center w-1/2 ">
              <Text className="text-white text-xs">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="flex-row flex-wrap justify-start m-1">
        {imageData?.map((uri: any, index: 1) => (
          <View className="border-2 border-gray-200 rounded-md mx-1">
            <Image
              key={index + uri.fileName+new Date().getTime()}
              source={{uri: `data:image/png;base64,${uri.base64}`}}
              style={{width: 50, height: 50, margin: 10}}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ImagePickerComponent;
