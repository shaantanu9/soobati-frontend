import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
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
import style from '../../../styles/index';

import {StackKeys} from '../../../Navigation/NavigationKeys';
import {_userAccountService} from '../../../services/api/user';
import {NavigationProps} from '../../../utils/interface';

const LoginScreen = ({navigation}: NavigationProps) => {
  const route = useRoute();

  const [mobile, setMobile] = React.useState('');

  const searchUserExist = () => {
    _userAccountService
      .simpleUserMobileExist(mobile)
      .then(res => {
        console.log('User Exist', res);
        if (res.statusCode === 200) {
          // also pass from which screen the user is coming
          navigation.navigate(StackKeys.Common.OTPScreen, {
            mobile,
            sendOtp: true
          });
        }
      })
      .catch(err => {
        console.log('User Exist Error', err);
      });
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar
        barStyle={'light-content'}
        // backgroundColor={'transparent'}
        backgroundColor={style.darkPrimaryColor}

        // translucent={true} // this will make the status bar translucent so that the background image will be visible
      />
      <Image
        source={images.forgetpassword}
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
        className=" flex flex-1 justify-between bg-white p-4 rounded-full ">
        <View className="flex justify-center items-center">
          <Text
            className={`text-3xl font-bold text-[${style.darkPrimaryColor}]`}>
            Forget Password
          </Text>
        </View>

        <View>
          <TextInput
            placeholder="Mobile"
            maxLength={10}
            keyboardType={'number-pad'}
            className="border-b-2 border-gray-300 w-full py-2"
            placeholderTextColor={style.darkPrimaryColor}
            onChangeText={text => setMobile(text)}
          />
        </View>

        <View className="flex-row justify-between items-center my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
            className="flex-row justify-center items-center">
            <Text>Don't have an account?</Text>
            <Text
              className={`text-[${style.darkPrimaryColor}] font-semibold ml-2`}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center w-full space-y-4">
          <TouchableOpacity
            onPress={searchUserExist}
            className={`mb-1 flex-row justify-center items-center bg-[${style.darkPrimaryColor}] rounded-full py-3 w-40`}>
            <Text className="text-white font-semibold">Send Otp</Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center items-center space-x-4 mt-2">
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
        <View className="flex-row justify-end items-center space-x-4 mt-2">
          <Text className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

// import React from 'react';
// import {Text, View} from 'react-native';
// const Details = () => {
//   return (
//     <View className="text-2xl">
//       <Text className="text-2xl">Details</Text>
//     </View>
//   );
// };

// export default Details;
