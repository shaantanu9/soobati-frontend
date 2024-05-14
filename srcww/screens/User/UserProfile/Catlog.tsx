import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '../../../assets/images';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppSelector';
import {fetchProducts} from '../../../redux/features/product/productThunk';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Mock data similar to your IProduct interface
const product = {
  name: 'Eco-friendly Notebook',
  description:
    'Made from recycled materials, perfect for all your writing needs.',
  price: 19.99,
  images: [images.bookImage1, images.bookImage2, images.bookImage3],
  category: 'Stationery',
  isSubscriptionAvailable: true,
  subscriptionPlans: [{frequency: 'Monthly', price: 17.99}],
  status: 'Available',
};

const ProductCard = () => {
  return (
    <>
      <View style={styles.card}>
        <Image
          source={images.bookImage1}
          style={styles.image}
          resizeMode="cover"
          // className="w-full rounded-lg absolute"

          // style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 8 }}
        />
        <Text style={styles.name}>{product.name}</Text>
        {/* <Text style={styles.description}>{product.description}</Text> */}
        <Text style={styles.price}>${product.price}</Text>
        {product.isSubscriptionAvailable && (
          <Text style={styles.subscription}>
            Subscribe and save: ${product.subscriptionPlans[0].price} /{' '}
            {product.subscriptionPlans[0].frequency}
          </Text>
        )}
        <Text style={styles.status}>{product.status}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subscription: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: product.status === 'Available' ? 'green' : 'red',
  },
});

const Catlog = ({ownerId}: any) => {
  const dispatch = useAppDispatch();
  const productList: any = useAppSelector(state => state.product);

  useEffect(() => {
    // console.log('ProductCard rendered', {ownerId, productList});
    dispatch(
      fetchProducts({
        ownerId,
      }),
    );
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', height: hp('100%'), width: wp('100%')
    }}>
      {productList.products.map((product: any) => (
        <ProductCard key={product._id} />
      ))}
      {/* <ProductCard />
      
      <ProductCard />
      <ProductCard />
      <ProductCard /> */}
    </View>
  );
};

export default Catlog;
