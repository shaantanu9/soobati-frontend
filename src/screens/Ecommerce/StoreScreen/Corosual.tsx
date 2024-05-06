import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import images from '../../../assets/images';
const ProductCarousel = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      image: images.bookImage1,
      title: 'The trials of apollo the burning maze',
     
    },
    {
      id: 2,
      image: images.bookImage2,
      title: 'Sun Tzu - The Art of War: Strategies for competition',
      
    },
    {
      id: 3,
      image: images.bookImage4,
      title: 'The Book of Ikigai',
      subTitle: 'Action, Adventure',
      
    },
    {
      id: 4,
      image: images.bookImage3,
      title:
        'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
     
    },
  ]);
  const carouselRef = useRef(null);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.slide} className="rounded-lg shadow-lg">
        <Image
          source={item.image}
          style={styles.image}
          className="rounded-lg"
        />
        <Text
          className="text-white font-bold py-2 rounded-lg"
          style={styles.title}>
          {item.title}
        </Text>
      </View>
    );
  };

  const {width: viewportWidth} = Dimensions.get('window');
  console.log('viewportWidth', viewportWidth);
  return (
    <Carousel
      ref={carouselRef}
      data={entries}
      renderItem={renderItem}
      sliderWidth={viewportWidth - 10}
      itemWidth={viewportWidth - 100}
      layout={'default'} // You can experiment with 'stack' or 'tinder' layouts as well
      autoplay={true}
      style={{height: hp('10%')}}
      scrollsToTop={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    height: hp('20%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default ProductCarousel;
