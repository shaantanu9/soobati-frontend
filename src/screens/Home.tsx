import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyCarousel from '../components/MyCarousel';
import MyCarousel2 from '../components/MyCarousel2';
// import RangeSlider from '../components/RangeSlider';
import SearchModal from '../components/SearchModal';

const data = [
  {
    id: 1,
    // name:'abc',
    image: require('../assets/images/1.jpg'),
    // description:'Lorem ipsum dol
  },
  {
    id: 2,
    // name:'abc',
    image: require('../assets/images/2.jpeg'),
    // description:'Lorem ipsum dol
  },
  {
    id: 3,
    // name:'abc',
    image: require('../assets/images/3.jpeg'),
    // description:'Lorem ipsum dol
  },
  {
    id: 4,
    // name:'abc',
    image: require('../assets/images/4.jpeg'),
    // description:'Lorem ipsum dol
  },
  {
    id: 5,
    // name:'abc',
    image: require('../assets/images/5.jpeg'),
    // description:'Lorem ipsum dol
  },
  {
    id: 6,
    // name:'abc',
    image: require('../assets/images/6.webp'),
    // description:'Lorem ipsum dol
  },
  {
    id: 7,
    // name:'abc',
    image: require('../assets/images/7.webp'),
    // description:'Lorem ipsum dol
  },
  {
    id: 8,
    // name:'abc',
    image: require('../assets/images/8.jpeg'),
    // description:'Lorem ipsum dol
  },
  // // {
  // //   id:9,
  // //   // name:'abc',
  // //   image:require('../assets/images/9.jpg'),
  // //   // description:'Lorem ipsum dol
  // // },
  // {
  //   id: 10,
  //   // name:'abc',
  //   image: require('../assets/images/10.jpeg'),
  //   // description:'Lorem ipsum dol
  // },
];

const Home = () => {
  // const [userData, setUserData] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // get screen dimensions
  const {width, height} = Dimensions.get('screen');

  // return
  const openFilter = () => {
    console.log('openFilter');
    setIsModalVisible(true);
  };

  useEffect(() => {
    return () => {
      setIsModalVisible(false);
    };
  }, []);

  const handleOverlayPress = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;

    // Check if the tap is outside the modal content
    if (locationY < 0 || locationY > 250 || locationX < 0 || locationX > 375) {
      console.log('handleOverlayPress');
      setIsModalVisible(false);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          // height: height,
          flex: 1,
          width: width * 0.9,
          margin: width * 0.03,
        }}>
        {/* <View className="flex flex-row justify-center items-center py-4"> */}
        <View className="flex flex-row justify-center items-center rounded-lg border-gray-400 border w-full">
          {/* <Text className="text-black center font-bold text-lg">Home</Text> */}
          {/* <View className="flex flex-row justify-center items-center rounded-lg border-gray-400 border ml-10 w-90"> */}
          <TouchableOpacity onPress={openFilter}>
            <View className="flex flex-row justify-center items-center rounded-lg ">
              <Icon name="search" size={24} color="black" />
              <View
                style={{
                  width: '85%',
                  // height: '100%',
                  color: 'black',
                  // fontSize: 20,
                  // fontWeight: 'bold',
                }}
                className={`w-80 text-black text-xl font-bold p-2`}>
                <Text className="text-black p-2">Search</Text>
              </View>
              {/* <TextInput
              placeholder="Search"
              style={{
                width: '85%',
                // height: '100%',
                color: 'black',
                // fontSize: 20,
                // fontWeight: 'bold',
              }}
              // className={`w-80 text-black text-xl font-bold`}
              placeholderTextColor={'black'}
            /> */}

              <Icon name="filter" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../assets/images/1.jpg')}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'cover',
            borderRadius: 10,
            marginTop: 10,
          }}
        />

        <MyCarousel cdata={data} subheight={600} />
        <MyCarousel2 cdata={data} subheight={600} />

        {/* <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          style={{
            // height: 250,
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            // margin: 'auto',
          }}
          onRequestClose={() => setIsModalVisible(false)}>
          <TouchableWithoutFeedback onPress={handleOverlayPress}>
            <View className="flex flex-1">
              <View className="flex flex-row justify-between items-start bg-white h-80 p-4 rounded-t-3xl mt-[110%] bottom-6 border-gray-300 border">
                <View>
                  <Text className="text-black text-lg font-bold">Filter</Text>
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Icon name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              // height: 250,
              width: '100%',
              flex: 1,
              justifyContent: 'start',
              marginTop: 172,
              backgroundColor: 'green',
              padding: 10,
            }}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, quidem.
            </Text>
            <RangeSlider
            value={0}
            setValue={() => {}}
            min={0}
            max={100}
            step={1}
             />
          </View>
        </Modal> */}
        <SearchModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
