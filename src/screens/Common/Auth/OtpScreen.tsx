import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import {AppleIcon, GoogleIcon} from '../../../assets/svg';

import {useAppDispatch} from '../../../hooks/useAppSelector';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {verifyOTP} from '../../../redux/features/userSlice';
import styles from '../../../styles';
import {NavigationProps} from '../../../utils/interface';
import { _userAccountService } from '../../../services/api/user';
const OtpScreen = ({navigation}: NavigationProps) => {
  const route: any = useRoute();
  // const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('Otp Screen', route);

    if(route.params?.sendOtp){
      console.log('Mobile Sending OTP', route.params.mobile);
      _userAccountService.sendOTP(route.params.mobile).then(res => {
        console.log('OTP Response', res);
      }
      ).catch(err => {
        console.log('OTP Error', err);
      });

    }
    // from

  }, []);

  const handleOtp = () => {
    console.log('OTP', otp);
    const mobile = route.params.mobile;

    dispatch(verifyOTP({mobile, otp}))
      .unwrap()
      .then(() => {
        navigation.navigate(StackKeys.Common.TabNavigation); // Navigate to the appropriate screen
      })
      .catch(error => {
        Alert.alert('Verification Error', error);
      });
  };

  const onChangeInput = (key: string, value: string) => {
    setOtp(value);
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar
        barStyle={'light-content'}
        // backgroundColor={'transparent'}
        backgroundColor={'#f89156'}

        // translucent={true} // this will make the status bar translucent so that the background image will be visible
      />
      <Image
        source={images.enterotp}
        className="w-full"
        resizeMode="contain"
        style={{height: hp('40%')}}
      />

      <View
        style={{
          // height: hp('50%'),
          borderTopLeftRadius: 135,
          borderTopRightRadius: 135,
        }}
        className=" flex flex-1 justify-start bg-white p-4 rounded-full ">
        <View className="flex justify-center items-center">
          <Text className="text-3xl font-bold">Enter OTP</Text>
        </View>

        <View>
          <TextInput
            // read msg and auto fill the otp
            autoComplete="one-time-code"
            keyboardType="number-pad"
            placeholder="OTP"
            className="border-b-2 border-gray-300 w-full py-2"
            onChangeText={text => onChangeInput('otp', text)}
          />
        </View>

        <View className="flex-row justify-between items-center my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate(StackKeys.Common.LoginScreen)}
            className="flex-row justify-center items-center">
            <Text>Already have an account?</Text>
            <Text
              className={`text-[${styles.darkPrimaryColor}] font-semibold ml-2`}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center w-full space-y-4">
          <TouchableOpacity
            onPress={handleOtp}
            className={` mb-1 flex-row justify-center items-center bg-[${styles.darkPrimaryColor}] rounded-full py-1 w-40`}>
            <Text className="text-white font-bold text-lg">Verify</Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center items-center space-x-4 mt-4">
          <Text>Sign up using</Text>
          <View className="flex-row justify-center items-center space-x-4 mt-4">
            <TouchableOpacity>
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <AppleIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-end items-center space-x-4 mt-4">
          <Text>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
