import React from 'react';
import { View, Text, Image } from 'react-native';
import 'nativewind'; // Ensure NativeWind is imported if needed

// Mock data similar to your IProduct interface
const product = {
  name: "Eco-friendly Notebook",
  description: "Made from recycled materials, perfect for all your writing needs.",
  price: 19.99,
  images: ["https://example.com/notebook.jpg"],
  category: "Stationery",
  isSubscriptionAvailable: true,
  subscriptionPlans: [{ frequency: "Monthly", price: 17.99 }],
  status: "Available"
};

const Catlog2 = () => {
  return (
    <View className="bg-white rounded-lg p-4 shadow-md mb-5">
      <Image 
        source={{ uri: product.images[0] }} 
        // className="w-full h-50 rounded-lg mb-2"
        style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 8 }}
        resizeMode="cover" // Ensure the image covers the set dimensions without distortion
      />
      <Text className="text-lg font-bold mb-1">{product.name}</Text>
      <Text className="text-base text-gray-500 mb-1">{product.description}</Text>
      <Text className="text-lg font-semibold mb-1">${product.price}</Text>
      {product.isSubscriptionAvailable && (
        <Text className="text-base text-green-500 mb-1">
          Subscribe and save: ${product.subscriptionPlans[0].price} / {product.subscriptionPlans[0].frequency}
        </Text>
      )}
      <Text className={`text-base font-medium ${product.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
        {product.status}
      </Text>
    </View>
  );
};

export default Catlog2;
