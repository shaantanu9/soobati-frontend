import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, Image, View} from 'react-native';
import {RootStackParamList} from '../App';
import useDeviceInfo from '../hooks/useDeviceInfo';
import {getItem} from '../utils/storage';

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WelcomeScreen'
>;

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  const imageUrl =
    'https://m.media-amazon.com/images/M/MV5BNjUyZTcwMTgtMzhkZS00YTFmLThiOGItMjRhNjAzOWZkZTNkXkEyXkFqcGdeQXVyMTU0ODI1NTA2._V1_.jpg';

  const detail = useDeviceInfo();
  console.log(detail, 'detail');

  useEffect(() => {
    const loginTimeout = setTimeout(() => {
      const token = getItem('token');
      // console.log(token, 'token');

      const loginProcess = async () => {
        if (token) {
          try {
            const res: any =[{}]
            if (res.tokenChanged) {
              navigation.replace('Login');
              Alert.alert('Mobile Already Login in another device');
            } else if (res) {
              console.log(res, 'res from saveWholeUser');
              console.log('Save successful');
              navigation.replace('BottomTabs');
            } else {
              console.log('From Else 37',res);
              navigation.replace('Login');
            }
          } catch (error) {
            console.error('Save failed:', error);
            // Retry after a delay
            loginProcess();
          }
        } else {
          navigation.replace('Login');
        }
      };

      loginProcess();
      // navigation.replace('Home');
    }, 2000);

    // Cleanup the timeout in case the component unmounts before the login completes
    return () => clearTimeout(loginTimeout);
  }, []);

  return (
    <View>
      <Image
        source={{uri: imageUrl}}
        style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      />
    </View>
  );
};

export default WelcomeScreen;
