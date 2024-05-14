import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from 'react-native-heroicons/outline';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {fetchProducts} from '../../../redux/features/product/productThunk';
import BottomSheetComp from '../../../screens/BottomSheetComp';
import MerchantAccountSettingScreen from '../../../screens/Merchant/MerchantAccountSetting/MerchantAccountSetting';
import AddProductScreen from '../../../screens/Merchant/ProductManagment/AddProductScreen';
import styles from '../../../styles';
import ProductCarousel from './Corosual';
import {Cat4} from './ProductCard';
import { StackKeys } from '../../../Navigation/NavigationKeys';
const StoreScreen = () => {
  const {products}: any = useAppSelector(state => state.product);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const openAddProductRef = useRef<BottomSheetModal>(null);
  const openAddBusinessRef = useRef<BottomSheetModal>(null);
  const business = useAppSelector(state => state.business);

  useEffect(() => {
    console.log('StoreScreen');
    dispatch(
      fetchProducts({
        minPrice: 0,
        maxPrice: 100000,
      }),
    );
  }, []);

  // useEffect(() => {
  //   console.log('products', products);
  // }, [products]);
  const customSnapOpen = (ref: any, index: number) => {
    ref.current?.snapToIndex(index);
  };

  const handleBottomSheetOpen = () => {
    // customSnapOpen(openAddProductRef, 1);
    if (business.businesses.length) {
      customSnapOpen(openAddProductRef, 1);
    } else {
      alert('Please add a business first');
      customSnapOpen(openAddBusinessRef, 1);
    }
  };

  return (
    <View className="flex-1 bg-white p-2">
      <View className="mr-2 mb-4 flex-row justify-between w-full items-center">
          <TouchableOpacity
            className="bg-gray-100 rounded-xl pr-1 ml-3"
            onPress={handleBottomSheetOpen}>
            <PlusCircleIcon
              size={35}
              strokeWidth={2}
              color={styles.darkPrimaryColor}
            />
          </TouchableOpacity>
        <View
          className="ml-1 flex-row items-center bg-neutral-100 rounded-full px-4 space-x-2 pl-6"
          style={{
            width: '75%',
          }}>
          <MagnifyingGlassCircleIcon size={23} strokeWidth={3} color={'gray'} />
          <TextInput
            placeholder="Search"
            className="w-4/5 flex-1 text-base pl-1 mb-1 tracking-wider"
            placeholderTextColor={'gray'}
          />
        </View>
        <TouchableOpacity
          className=" rounded-xl py-1 ml-3"
          onPress={()=> navigation.navigate(StackKeys.Ecommerce.CartScreen)
          }>
          <ShoppingCartIcon
            size={24}
            color={styles.darkPrimaryColor}
          />
        </TouchableOpacity>
      </View>
      {/* ProductCarousel */}

      {/* ProductCarousel */}

      {/* <Text>SelectAddItemScreen</Text> */}
      {/* Category Column */}
      <ScrollView>
        <View className="flex justify-between px-4">
          <ProductCarousel />
          <View className="flex-row justify-between mt-5">
            <Text className="text-lg font-bold">Categories</Text>
            <Text className="text-sm text-blue-500">See all</Text>
          </View>
        </View>

        {/* Category Column */}

        {/* Category End */}

        
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          // className="flex-row justify-between items-center px-4"
        >
          {
            products?.map((product: any) => (
              <Cat4 key={product._id} product={product} />
            ))
          }
        </ScrollView>
        {/* <View className="flex justify-between items-center px-4">
          <Cat5 />
          <Cat5 />
          <Cat5 />
          <Cat5 />
        </View> */}
      </ScrollView>

      {/* Add Product Bottom Screen */}
      <BottomSheetComp
        title="Add Product"
        ref={openAddProductRef}
        memoArray={['25%', '50%', '70']}>
        <AddProductScreen
          hideHeader={true}
          closeSheet={() => openAddProductRef.current?.close()}
        />
      </BottomSheetComp>
      {/* End */}

      {/* Add Business Screen */}
      <BottomSheetComp
        title="Add Business"
        ref={openAddBusinessRef}
        memoArray={['25%', '50%', '70']}
        >
        <MerchantAccountSettingScreen
          navigation={navigation}
          hideHeader={true}
          routeRedirect={false}
          closeSheet={() => openAddBusinessRef.current?.close()}
        />
      </BottomSheetComp>
    </View>
  );
};
export default StoreScreen;
