// import React, {useState} from 'react';
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {CameraIcon} from 'react-native-heroicons/outline';

// const AddProductScreen = () => {
//   const [productName, setProductName] = useState('');
//   const [productCode, setProductCode] = useState('');
//   const [brand, setBrand] = useState('');
//   const [model, setModel] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');

//   // Function to handle adding the product
//   const handleAddProduct = () => {
//     // Perform product adding logic here
//     console.log({
//       productName,
//       productCode,
//       brand,
//       model,
//       price,
//       quantity,
//     });
//   };

//   return (
//     <ScrollView className="bg-white flex-1 p-4">
//       <View className="flex-row items-center justify-between">
//         {/* <ChevronLeftIcon size={24} color="#000" /> */}
//         <Text className="text-xl font-bold">Add Product</Text>
//         <View /> {/* Placeholder to balance the header */}
//       </View>

//       <View className="my-4">
//         <Text className="text-lg font-semibold">Product Details</Text>

//         <View className="mt-2">
//           <Text className="text-sm font-semibold">Product Name</Text>
//           <TextInput
//             value={productName}
//             onChangeText={setProductName}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter product name"
//           />
//         </View>

//         <View className="mt-4">
//           <Text className="text-sm font-semibold">Product Code</Text>
//           <TextInput
//             value={productCode}
//             onChangeText={setProductCode}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter product code"
//           />
//         </View>

//         <View className="mt-4">
//           <Text className="text-sm font-semibold">Brand</Text>
//           <TextInput
//             value={brand}
//             onChangeText={setBrand}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter brand"
//           />
//         </View>

//         <View className="mt-4">
//           <Text className="text-sm font-semibold">Model</Text>
//           <TextInput
//             value={model}
//             onChangeText={setModel}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter model"
//           />
//         </View>

//         <View className="mt-4">
//           <Text className="text-sm font-semibold">Price</Text>
//           <TextInput
//             value={price}
//             onChangeText={setPrice}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter price"
//             keyboardType="numeric"
//           />
//         </View>

//         <View className="mt-4">
//           <Text className="text-sm font-semibold">Quantity</Text>
//           <TextInput
//             value={quantity}
//             onChangeText={setQuantity}
//             className="border-b border-gray-300 mt-1"
//             placeholder="Enter quantity"
//             keyboardType="numeric"
//           />
//         </View>

//         <TouchableOpacity className="border border-gray-300 rounded-md p-2 mt-4 justify-center items-center">
//           <CameraIcon color="#000" />
//           <Text className="text-sm font-semibold">Add Product Image</Text>
//         </TouchableOpacity>

//         {/* Implement image picking and display logic here */}
//       </View>

//       <TouchableOpacity
//         onPress={handleAddProduct}
//         className="bg-purple-600 mt-6 p-3 rounded-md items-center">
//         <Text className="text-white font-semibold">Add Product</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default AddProductScreen;
