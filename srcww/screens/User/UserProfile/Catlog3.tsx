import 'nativewind'; // Ensure NativeWind is imported if needed
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../assets/images';

// Example product data, similar to your IProduct interface
const product = {
  name: 'Eco-friendly Notebook',
  description:
    'Made from recycled materials, perfect for all your writing needs.',
  price: 19.99,
  images: ['https://example.com/notebook.jpg'], // Replace with actual image URLs
  category: 'Stationery',
  isSubscriptionAvailable: true,
  subscriptionPlans: [{frequency: 'Monthly', price: 17.99}],
  status: 'Available',
};

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <View className="bg-white rounded-lg shadow-md mb-5 overflow-hidden">
      <TouchableOpacity
        onPress={toggleFavorite}
        className="absolute z-10 top-2 right-2">
        <HeartIcon size={24} color={isFavorite ? 'red' : 'white'} />
      </TouchableOpacity>
      <Image source={images.bookImage1} className="w-full h-40 object-cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        className="absolute bottom-0 w-full p-2">
        <Text className="text-white text-lg font-bold">{product.name}</Text>
        <Text className="text-white text-sm">{product.category}</Text>
      </LinearGradient>
      <View className="p-4">
        <Text className="text-gray-500 text-base mb-1">
          {product.description}
        </Text>
        <Text className="text-lg font-semibold mb-1">${product.price}</Text>
        {product.isSubscriptionAvailable && (
          <Text className="text-green-500 text-base">
            Subscribe and save: ${product.subscriptionPlans[0].price} /{' '}
            {product.subscriptionPlans[0].frequency}
          </Text>
        )}
        <Text
          className={`text-sm font-medium ${
            product.status === 'Available' ? 'text-green-500' : 'text-red-500'
          }`}>
          {product.status}
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
