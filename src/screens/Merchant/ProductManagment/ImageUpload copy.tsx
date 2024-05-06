// import React, {useEffect, useState} from 'react';
// import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
// import {CameraIcon} from 'react-native-heroicons/outline'; // Ensure icons are imported correctly
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {_productService} from '../../../services/api/product';
// import requestCameraPermission from '../../../utils/requestCameraPermission';

// const ImagePickerComponent = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [imageUris, setImageUris] = useState<string[]>([]);

//   const options: any = {
//     mediaType: 'photo',
//     quality: 1,
//     includeBase64: false,
//     maxWidth: 1024, // Set maximum width to 1024 pixels
//     maxHeight: 1024, // Set maximum height to 1024 pixels
//     selectionLimit: 5, // Allow up to 5 images to be selected
//   };

//   const handleImagePick = async (type: 'camera' | 'library') => {
//     if (type === 'camera') {
//       const hasPermission = await requestCameraPermission();
//       if (!hasPermission) {
//         Alert.alert(
//           'Permissions required',
//           'Camera permission is required to take photos.',
//         );
//         return;
//       }
//       launchCamera(options, (response: any) => {
//         if (response.didCancel) {
//           console.log('User cancelled camera picker');
//         } else if (response.error) {
//           console.log('Camera error:', response.error);
//         } else {
//           setImageUris((prevUris: any) => [
//             ...prevUris,
//             response.assets[0].uri,
//           ]);
//         }
//       });
//     } else {
//       launchImageLibrary(options, (response: any) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else {
//           const newUris = response.assets.map((asset: any) => asset.uri);
//           setImageUris((prevUris: any) => [...prevUris, ...newUris]);
//         }
//       });
//     }
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     console.log('Image URI:', imageUri);
//   }, [imageUri]);

//   const [modalVisible, setModalVisible] = useState(false);

//   const handleSave = async () => {
//     console.log('started');
//     const uploadedUrls: any = [];

//     for (const uri of imageUris) {
//       const data: any = new FormData();
//       data.append('file', {
//         uri: uri,
//         type: 'image/jpeg', // or the correct mime type of each image
//         name: 'upload.jpg',
//       });
//       console.log('Uploading image...', data, uri);
//       try {
//         // Fetch authentication parameters from your server
//         const res = await _productService.getImageKitAuth();
//         if (res.statusCode == 200) {
//           const {token, expire, signature} = res.data;

//           // const {token, expire, signature} = imageKitAuth;
//           // console.log('ImageKit auth:', token, expire, signature)

//           // Add authentication parameters to the form data
//           data.append('signature', signature);
//           data.append('expire', expire);
//           data.append('token', token);

//           console.log(data,"data")
//           // Make the upload request to ImageKit
//           const uploadResponse = await fetch(
//             'https://upload.imagekit.io/api/v1/files/upload',
//             {
//               method: 'POST',
//               body: data,
//             },
//           );
//           console.log(uploadResponse, 'uploadResoponse');

//           if (!uploadResponse.ok) {
//             throw new Error('Upload failed');
//           }

//           const uploadResult = await uploadResponse.json();
//           console.log(uploadResult.url);
//           uploadedUrls.push(uploadResult.url); // Store the URL of the uploaded image
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         // Handle errors appropriately
//       }
//     }
//     console.log('Uploaded URLs:', uploadedUrls);
//     console.log('Uploaded URLs:', uploadedUrls);
//     console.log('Uploaded URLs:', uploadedUrls);
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <TouchableOpacity onPress={() => setModalVisible(true)}>
//         <CameraIcon color="#000" size={30} />
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//           }}>
//           <View
//             style={{
//               backgroundColor: 'white',
//               padding: 20,
//               borderRadius: 10,
//               alignItems: 'center',
//             }}>
//             <TouchableOpacity
//               style={{marginBottom: 10}}
//               onPress={() => handleImagePick('camera')}>
//               <Text style={{fontSize: 18}}>Take Photo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleImagePick('library')}>
//               <Text style={{fontSize: 18}}>Choose from Library</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {imageUris.map(uri => (
//         <Image
//           key={uri}
//           source={{uri}}
//           style={{width: 300, height: 300, margin: 10}}
//         />
//       ))}
//       <TouchableOpacity onPress={handleSave}>
//         <Text>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ImagePickerComponent;

import React, {useState} from 'react';
import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {CameraIcon} from 'react-native-heroicons/outline';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {_productService} from '../../../services/api/product';
import requestCameraPermission from '../../../utils/requestCameraPermission';
import ImageKit from 'imagekit-javascript';
import appConfig from 'src/utils/config';
const ImagePickerComponent = () => {
  const [imageUris, setImageUris] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const options = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 1024,
    maxHeight: 1024,
    selectionLimit: 5,
  };

  const handleImagePick = async type => {
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
    picker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled the picker');
      } else if (response.error) {
        console.log(`${type} Picker Error: `, response.error);
        // setModalVisible(false);
      } else {
        setImageUris(prevUris => [
          ...prevUris,
          ...response.assets.map(asset => asset.uri),
        ]);
        setModalVisible(false);
      }
    });
  };

  const handleSave = async () => {
    console.log('Upload started', imageUris[0]);

    const uploadedUrls = [];

    for (const uri of imageUris) {
      const data: any = new FormData();
      data.append('file', {
        uri,
        type: 'image/jpeg',
        name: uri.split('/').pop(),
      });
      const res = await _productService.getImageKitAuth();

      const imagekit = new ImageKit({
        publicKey: appConfig.IMAGE_KIT_PUBLIC_KEY
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
      });

      // try {
      //   const res = await _productService.getImageKitAuth();
      //   if (res.statusCode === 200) {
      //     const {token, expire, signature} = res.data;
      //     console.log(res.data, 'reas.data');
      //     data.append('signature', signature);
      //     data.append('expire', expire);
      //     data.append('token', token);

      //     console.log('Uploading image...', data, uri);

      //     const uploadResponse = await fetch(
      //       'https://upload.imagekit.io/api/v1/files/upload',
      //       {
      //         method: 'POST',
      //         body: data,
      //       },
      //     );

      //     if (!uploadResponse.ok) {
      //       throw new Error(
      //         `Upload failed with status: ${uploadResponse.status}`,
      //       );
      //     }

      //     const uploadResult = await uploadResponse.json();
      //     uploadedUrls.push(uploadResult.url);
      //     // setModalVisible(false);
      //   } else {
      //     throw new Error('Failed to retrieve ImageKit authentication details');
      //   }
      // } catch (error) {
      //   console.error('Error uploading image:', error);
      // }
    }

    // console.log('Uploaded URLs:', uploadedUrls);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
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
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => handleImagePick('camera')}>
              <Text style={{fontSize: 18}}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePick('library')}>
              <Text style={{fontSize: 18}}>Choose from Library</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {imageUris.map((uri, index) => (
        <Image
          key={index}
          source={{uri}}
          style={{width: 300, height: 300, margin: 10}}
        />
      ))}
      <TouchableOpacity onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
