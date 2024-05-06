import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function Screen2({showPointer = false}) {
  const [data, SetData] = useState([
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
    {
      image: require('../assets/images/5.jpeg'),
    },
    {
      image: require('../assets/images/6.webp'),
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const flatListRef = useRef();

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      // console.log('currentIndex', currentIndex, data.length - 1);
      if (currentIndex < data.length - 1) {
        // If not at the last item, scroll to the next item
        setCurrentIndex(prevIndex => prevIndex + 1);
        flatListRef.current.scrollToIndex({
          animated: true,
          index: currentIndex + 1,
        });
      } else {
        // If at the last item, scroll back to the start
        setCurrentIndex(0);
        flatListRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      }
    }, 3000); // Adjust the interval as needed (e.g., 3000 milliseconds for 3 seconds)

    // Cleanup the interval on component unmount
    return () => clearInterval(autoScrollInterval);
  }, [currentIndex, data]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          height: height / 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.FlatList
          // ref={ref}
          ref={flatListRef}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            // console.log(x / width - 50);
            // setCurrentIndex(Math.floor(x / (width - 50)).toFixed(0));
            setCurrentIndex(Math.floor(x / (width - 50)));
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <Animated.View
                style={{
                  width: width - 50,
                  height: height / 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: '#FF4238',
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
      {showPointer && (
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
                style={{
                  width: currentIndex == index ? 50 : 8,
                  height: currentIndex == index ? 10 : 8,
                  borderRadius: currentIndex == index ? 5 : 4,
                  backgroundColor: currentIndex == index ? 'green' : 'gray',
                  marginLeft: 5,
                }}></View>
            );
          })}
        </View>
      )}
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
