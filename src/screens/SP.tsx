import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {getAge} from '../utils/functions';
import {getItem, setItem} from '../utils/storage';

// demo purposes only
function* range(start: any, end: any) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Example = () => {
  const {width, height} = Dimensions.get('window');
  const swiperRef = useRef(null);
  const [cards, setCards] = useState([...range(0, 3)]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  let data: any = getItem('userData') || [];
  // const [data, setData] = useState<any>([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('useFocusEffect');
  //     let data = getItem('userData') || [];
  //     // setCards([...range(0, data.length - 1)]);
  //     setCards([...data]);
  //     // setData(data);
  //   }, []),
  // );

  // useEffect(() => {
  //   let data = getItem('userData') || [];
  //   // setCards([...range(0, data.length - 1)]);
  //   setCards([...data]);
  //   // setData(data);
  // }, []);

  const renderCard = (card: any, index: any) => {
    // const {name, dob, family, education, salary} = card?.[index];
    const {name, dob, family, education, salary} = data?.[index];

    return (
      <View style={styles.card}>
        <Image
          source={require('../assets/images/myphoto.jpeg')}
          style={{flex: 1, borderRadius: 4}}
          height={height - 200}
          width={width - 20}
          className="rounded-lg w-full h-full"
        />
        <View style={{position: 'absolute', bottom: 0, padding: 3}}>
          <View className="flex flex-row justify-between items-center font-bold text-xl gap-2 w-full">
            <Text className="font-bold text-xl text-white capitalize">
              {name}
            </Text>
            <Text className="font-bold text-xl text-white">{getAge(dob)}</Text>
          </View>
          <View className="flex flex-row justify-between items-center font-bold text-xl">
            <Text className="font-bold text-xl text-white">{education}</Text>
          </View>
          <View className="flex flex-row justify-between items-center font-bold text-xl">
            <Text
              className="font-bold text-xl text-white"
              style={{color: 'white'}}>
              {salary} हजार / महिना
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onSwiped = (type: any) => {
    console.log(`on swiped ${type}`, {cardIndex});
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const swipeLeft = () => {
    console.log('swipeLeft');
  };

  const swipeRight = (index: any) => {
    const getUserLiked = getItem('likedUser') || [];
    const user = data[index]._id;
    if (getUserLiked.includes(user)) {
      return;
    } else {
      getUserLiked.push(user);
      setItem('likedUser', getUserLiked);
    }

    console.log(index, 'getUserLiked');
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        onSwiped={() => onSwiped('general')}
        onSwipedLeft={() => onSwiped('left')}
        onSwipedRight={index => swipeRight(index)}
        onSwipedTop={() => onSwiped('top')}
        onSwipedBottom={() => onSwiped('bottom')}
        onTapCard={swipeLeft}
        backgroundColor="#FFFFFF"
        cards={cards}
        cardIndex={cardIndex}
        cardVerticalMargin={80}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        overlayLabels={{
          bottom: {title: 'BLEAH', style: styles.overlayLabel},
          left: {title: 'NOPE', style: styles.overlayLabel},
          right: {title: 'LIKE', style: styles.overlayLabel},
          top: {title: 'SUPER LIKE', style: styles.overlayLabel},
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard>
        <Button
          onPress={() => swiperRef?.current.swipeBack()}
          title="Swipe Back"
          color="#FF4238"
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    // borderColor: '#E8E8E8',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  overlayLabel: {
    label: {
      backgroundColor: 'black',
      borderColor: 'black',
      color: 'white',
      borderWidth: 1,
    },
    wrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
  },
});

export default Example;
