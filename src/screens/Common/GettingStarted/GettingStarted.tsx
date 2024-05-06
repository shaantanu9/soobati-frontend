import {NavigationProps} from '../../../utils/interface';

import React, {useEffect, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import ImageAssets from '../../../assets/images/index';

const images = [
  ImageAssets.onBoardingImage1,
  ImageAssets.onBoardingImage2,
  ImageAssets.onBoardingImage3,
];

const texts = ['Getting Started', 'Learn the Basics', 'Advanced Techniques'];

const descriptions = [
  'Welcome to React Native Template',
  'Explore React Native features',
  'Master React Native development',
];

const GettingStarted: React.FC<NavigationProps> = ({navigation}) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0.1));
  const [progressState, setProgressState] = useState(0.1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (step + 1) * 0.33, // Assuming each step is 33% of the process
      duration: 500,
      useNativeDriver: false,
    }).start();
    setProgressState((step + 1) * 0.33);
  }, [step]);

  const handlePress = () => {
    console.log('Step:', step);
    if (step < 2) {
      setStep(step + 1);
    }
    if (step === 2) {
      navigation.navigate('AuthScreen');
    }
  };

  return (
    <View className="flex-1 flex justify-end">
      <Image
        source={images[step]}
        className="w-full h-full absolute"
        style={{width: '100%', height: '100%'}}
      />
      <View className="px-5">
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />
        <View>
          <Text className="text-white text-2xl">{texts[step]}</Text>
          <Text className="text-white text-xl">{descriptions[step]}</Text>

          <View className="flex justify-center items-center">
            <Progress.Bar
              className="my-5 text-center "
              progress={progressState}
              width={200}
              animated={true}
              color={'#FF6347'}
            />
          </View>
        </View>
        <TouchableOpacity
          className="bg-orange-500 w-full rounded-full p-3  justify-center items-center"
          onPress={() => handlePress()}>
          <Text className="text-white text-lg">
            {step < 2 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GettingStarted;
