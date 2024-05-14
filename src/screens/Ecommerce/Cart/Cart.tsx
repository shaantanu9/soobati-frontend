import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronLeftIcon, TrashIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {
  fetchCart,
  removeItemFromCart,
  updateItemQuantity,
} from '../../../redux/features/cart/cartThunk';
import style from '../../../styles/index';
import {NavigationProps} from '../../../utils/interface';

const Cart = ({navigation}: NavigationProps) => {
  const route = useRoute();
  const data: any = route.params;
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const cartItems = useAppSelector(state => state.cart.items);

  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    dispatch(fetchCart());

    console.log('KEYS KEYS', cart, 'cartItems');
  }, []);

  // if (!cart)
  //   return (
  //     <View>
  //       <Text>No data</Text>
  //     </View>
  //   );

  return (
    <View className="bg-gray-50 flex-1 px-4">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        // translucent={true} // this will make the status bar translucent so that the background image will be visible
      />
      <SafeAreaView className="flex-row justify-between items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={20} color={style.darkPrimaryColor} />
        </TouchableOpacity>
        <Text className="text-black text-2xl font-bold text-center">Cart</Text>
        <TouchableOpacity onPress={() => handleFavorite()}>
          <HeartIcon size={24} color={style.darkPrimaryColor} />
        </TouchableOpacity>
      </SafeAreaView>

      {cart?.items?.length > 0 && (
        <>
          <View className="mb-2">
            <View
              className={`flex-row justify-between items-center 
          bg-[${style.darkPrimaryColor}] text-white
          rounded-lg shadow-md mt-4
          p-4
          `}>
              <Text className="text-md font-bold text-white">
                Total Items: {cart?.totalQuantity}
              </Text>
              <Text className="text-md font-bold text-white">
                Total Price: {cart?.totalPrice}
              </Text>
            </View>
          </View>
          {cart.items && (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="space-y-4">
                {cart.items.map((singleProduct: any) => (
                  <CartCard
                    key={singleProduct?._id}
                    singleProduct={singleProduct}
                  />
                ))}
              </ScrollView>
            </>
          )}
          <TouchableOpacity
            onPress={() =>
              cart.items.length &&
              navigation.navigate(StackKeys.Ecommerce.OrderConfirmationScreen)
            }
            className={`flex-row justify-center items-center bg-[${style.darkPrimaryColor}] rounded-lg py-3 m-auto mb-2 w-full`}>
            <Text className="text-white font-semibold">Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Cart;

const CartCard = ({singleProduct}: any) => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  // const cart = useAppSelector(state => state.cart);

  console.log("singleProduct", singleProduct, "singleProduct");

  const handleCartQuantity = (value: number) => {
    if (quantity === 1 && value === -1) {
      return;
    }
    setLoading(true);
    if (singleProduct.productId.quantity < quantity + value) {
      setLoading(false);
      return alert('Not enough quantity available');
    } else {
      dispatch(
        updateItemQuantity({
          itemId: singleProduct._id,
          quantity: quantity + value,
        }),
      )
        .unwrap()
        .then(() => {
          setQuantity(quantity + value);
          setLoading(false);
          dispatch(fetchCart());
        })
        .catch(() => {
          setLoading(false);
          console.log('error');
        });
    }
  };

  const deleteCartItem = (itemId: string) => {
    setLoading(true);
    dispatch(removeItemFromCart(itemId))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(fetchCart());
      })
      .catch(() => {
        setLoading(false);
        console.log('error');
      });
  };
  console.log(
    {
      singleProduct,

    },
    'item in cart card 160',
  );

  return (
    <View className="flex-row justify-between items-center my-2 p-1 rounded-lg border border-gray-300 bg-white shadow">
      <View className="flex-row justify-start items-start">
        <Image
          source={{uri: singleProduct?.productId?.images[0]}}
          className="w-20 h-20"
          resizeMode="contain"
        />
        <View className="flex-col justify-start items-start ml-4">
          <Text className="text-sm font-bold">
            {singleProduct?.productId?.name}
          </Text>
          <Text className="text-xs font-semibold">
            {singleProduct?.productId?.description}
          </Text>
          <Text className="text-sm font-semibold">
            by {singleProduct?.productId?.businessName}
          </Text>
          <Text className="text-xs font-semibold">
            {singleProduct?.productId?.price.toFixed(2)}
          </Text>
          <Text className="text-sm font-semibold">
            Pay Now {singleProduct?.pricePerUnit * quantity}
          </Text>
        </View>
      </View>
      <View className="flex-col justify-start items-start">
        {/* up down arrow and quntity in between */}
        <View className="flex justify-between items-center rounded-full bg-gray-50 p-2 mx-2">
          {quantity > 1 ? (
            <TouchableOpacity
              onPress={() => !loading && handleCartQuantity(-1)}
              disabled={loading}>
              <Text className="text-sm font-bold text-[#FF4E50] ">
                {loading && (
                  <Progress.Circle
                    size={15}
                    indeterminate={true}
                    color={style.darkPrimaryColor}
                  />
                )}
                -
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => !loading && deleteCartItem(singleProduct._id)}
              disabled={loading}>
              {loading && (
                <Progress.Circle
                  size={15}
                  indeterminate={true}
                  color={style.darkPrimaryColor}
                />
              )}
              <TrashIcon size={20} color={style.darkPrimaryColor} />
            </TouchableOpacity>
          )}
          <Text className="text-lg font-bold">{quantity}</Text>
          <TouchableOpacity
            onPress={() => !loading && handleCartQuantity(1)}
            disabled={loading}>
            <Text className="text-sm font-bold text-[#FF4E50]">
              {loading && (
                <Progress.Circle
                  size={15}
                  indeterminate={true}
                  color={style.darkPrimaryColor}
                />
              )}
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
