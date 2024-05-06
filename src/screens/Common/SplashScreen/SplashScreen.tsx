import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import ImageAssets from '../../../assets/images/index';

import {useAppDispatch} from '../../../hooks/useAppSelector';
import {fetchBusinesses} from '../../../redux/features/business/businessThunk';
import {fetchUserSubscriptions} from '../../../redux/features/subscription/subscriptionThunk';
import {getAuthCred} from '../../../utils';
import {NavigationProps} from '../../../utils/interface';
const SplashScreen: React.FC<NavigationProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      const {token} = getAuthCred();
      if (token.length > 10) {
        dispatch(fetchBusinesses());
        dispatch(fetchUserSubscriptions({}));
        navigation.replace('TabNavigation');
      } else {
        navigation.replace('GettingStarted');
      }
    }, 1000);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={ImageAssets.getstarted} className="w-40 h-40" />
      <Text className="text-2xl font-bold text-gray-800">Soobati</Text>
      <Text className="text-xs font-semibold text-gray-800">
        You Personal Growth Hyperlocal Social Media App
      </Text>
      <Progress.CircleSnail color={'#FFBE98'} />
    </View>
  );
};

export default SplashScreen;
