import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function MyCarousel2() {
  // const [data, SetData] = useState([1, 1, 1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const [data, SetData] = useState([
    {
      image: require('../assets/images/2.jpeg'),
    },
    {
      image: require('../assets/images/6.webp'),
    },
    {
      image: require('../assets/images/10.jpeg'),
    },
    {
      image: require('../assets/images/2.jpeg'),
    },
    {
      image: require('../assets/images/3.jpeg'),
    },
    {
      image: require('../assets/images/4.jpeg'),
    },
  ]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          height: height / 2.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.FlatList
          ref={ref}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            console.log(x / width - 50);
            setCurrentIndex((x / (width - 50)).toFixed(0));
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <Animated.View
                key={item + Math.random()}
                style={{
                  width: width - 50,
                  height: height / 2.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '90%',
                    height: '90%',
                    // backgroundColor: 'green',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={item.image}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.map((item, index) => {
          return (
            <View
              key={item + Math.random()}
              style={{
                width: currentIndex == index ? 50 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? '#FF3131' : 'gray',
                marginLeft: 5,
              }}></View>
          );
        })}
      </View>
      {/* <View
        style={{
          width: width,
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        {currentIndex == 0 ? null : (
          <TouchableOpacity
            style={{
              width: data.length - 1 == currentIndex ? '100%' : 100,
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'orange',
            }}
            onPress={() => {
              setCurrentIndex(currentIndex - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 1,
              });
            }}>
            <Text>Previous</Text>
          </TouchableOpacity>
        )}
        {data.length - 1 == currentIndex ? null : (
          <TouchableOpacity
            style={{
              width: currentIndex == 0 ? '100%' : 100,
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'orange',
            }}
            onPress={() => {
              setCurrentIndex(currentIndex + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) + 1,
              });
            }}>
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
}
