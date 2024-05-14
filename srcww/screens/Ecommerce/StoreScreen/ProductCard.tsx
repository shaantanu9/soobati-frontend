import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useAppDispatch} from '../../../hooks/useAppSelector';
import {
  addItemToCart,
  CartItemProps,
} from '../../../redux/features/cart/cartThunk';
import styles from '../../../styles';
import { StackKeys } from '../../../Navigation/NavigationKeys';
const Cat4 = ({product}: any) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const handleAddToCart = () => {
    setLoading(true);
    const createCartItem = (product: any): CartItemProps => {
      return {
        productId: product._id,
        quantity: 1,
        pricePerUnit: product.price,
        options: {},
      };
    };

    dispatch(addItemToCart(createCartItem(product)))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  console.log('product', product);
  return (
    <View className="flex items-start bg-white border border-gray-200 rounded-lg m-2 overflow-hidden">
      {/* Product Image */}
      <View className="flex items-center overflow-hidden w-full">
        <Image
          source={{uri: product.images[0]}}
          className="h-40 w-full "
          style={{width: wp('50%')}}
        />
      </View>

      {/* Product Info */}
      <TouchableOpacity className="p-4" onPress={() => navigation.navigate(StackKeys.Ecommerce.ProductDetail,{data:product})}>
        <Text className="text-lg font-semibold capitalize">{product.name}</Text>

        {/* Rating and Reviews */}
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</Text>
          <Text className="text-xs text-gray-500 ml-2">(50 reviews)</Text>
        </View>

        {/* Price */}
        <Text className="text-lg mt-2">{product.price.toFixed(2)}</Text>

        {/* Prime Tag */}
        {/* <View className="flex-row items-center mt-1">
          <View className="bg-blue-500 rounded-full px-2 py-1 mr-2">
            <Text className="text-xs text-white font-semibold">Prime</Text>
          </View>
          <Text className="text-xs text-gray-500">
            Free Delivery by Tomorrow
          </Text>
        </View> */}

        {/* Specification */}
        <View className="flex-row items-center mt-1">
          {/* i have specification object like specification : {key:string,value:string} want to map first 2 */}
          {product.specifications.map(
            (item: any, index: number) =>
              index <= 1 && (
                <>
                  <Text>item?.value</Text>
                </>
              ),
          )}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      <View className=" px-4 py-2  items-end w-full">
        <View>
          <TouchableOpacity
            onPress={handleAddToCart}
            disabled={loading}
            className={`bg-[${styles.darkPrimaryColor}] text-white rounded px-4 py-2 w-90`}>
            {loading && (
              <Progress.Circle size={20} indeterminate={true} color="white" />
            )}
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const Cat5 = () => {
//   return (
//     <View className="bg-white border border-gray-200 rounded-lg m-2 overflow-hidden">
//       <View className="flex-row justify-between items-center p-4 bg-gray-100">
//         <View>
//           {/* Product Image */}
//           <Image source={product.images[0]} className="h-40 w-full"
//           style={{width: wp("20%"), height: hp("20%")}}
//            />
//         </View>
//         <View>
//           {/* Product Info */}
//           <View className="p-4">
//             <Text className="text-lg font-semibold">{product.name}</Text>

//             {/* Rating and Reviews */}
//             <View className="flex-row items-center mt-1">
//               <Text className="text-yellow-400">⭐⭐⭐⭐⭐</Text>
//               <Text className="text-xs text-gray-500 ml-2">(50 reviews)</Text>
//             </View>

//             {/* Price */}
//             <Text className="text-xl text-blue-800 mt-2">
//               ${product.price.toFixed(2)}
//             </Text>

//             {/* Prime Tag */}
//             <View className="flex-row items-center mt-1">
//               <View className="bg-blue-500 rounded-full px-2 py-1 mr-2">
//                 <Text className="text-xs text-white font-semibold">Prime</Text>
//               </View>
//               <Text className="text-xs text-gray-500">
//                 Free Delivery by Tomorrow
//               </Text>
//             </View>
//           </View>

//           {/* Actions */}
//           <View className="bg-gray-100 px-4 py-2 flex-row justify-between items-center">
//             <Button
//               title="Add to Cart"
//               onPress={() => {
//                 /* Add to cart logic */
//               }}
//               className="bg-yellow-400 text-white rounded px-4 py-2"
//             />
//             <Button
//               title="Buy Now"
//               onPress={() => {
//                 /* Buy now logic */
//               }}
//               className="bg-orange-500 text-white rounded px-4 py-2"
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

export {
  // Cat1,
  //  Cat2,
  //   Cat3,
  Cat4,
};
