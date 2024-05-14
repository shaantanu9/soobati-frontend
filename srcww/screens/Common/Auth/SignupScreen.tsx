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
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import {AppleIcon, GoogleIcon} from '../../../assets/svg';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {_userAccountService} from '../../../services/api/user';
import {NavigationProps} from '../../../utils/interface';

import styles from '../../../styles';
const SignUpScreen = ({navigation}: NavigationProps) => {
  const route = useRoute();

  const [signupData, setSignupData] = React.useState({
    name: '',
    mobile: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onChangeInput = (key: string, value: string) => {
    setSignupData({...signupData, [key]: value});
    console.log('Onchange Signup Data', signupData);
  };

  const signupHandler = () => {
    console.log('Signup', signupData);
    _userAccountService
      .createUser(signupData)
      .then(res => {
        console.log('Signup Response', res);
        if (res.statusCode === 200) {
          navigation.navigate(StackKeys.Common.OTPScreen, {
            mobile: signupData.mobile,
          });
        }
      })
      .catch(err => {
        console.log('Signup Error', err);
      });
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#f89156'}
        // backgroundColor={'transparent'}
        // translucent={true} // this will make the status bar translucent so that the background image will be visible
      />
      <Image
        source={images.signup}
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
        className=" flex flex-1 justify-start bg-white p-4 rounded-full">
        <View className="flex justify-center items-center">
          <Text className="text-3xl font-bold text-[#f89156]">
            Create Account
          </Text>
        </View>

        <View>
          <TextInput
            placeholder="Name"
            placeholderTextColor={'#f89156'}
            className="border-b-2 border-gray-300 w-full py-2"
            onChangeText={text => onChangeInput('name', text)}
          />
          <TextInput
            placeholder="Mobile"
            autoComplete="tel"
            keyboardType="phone-pad"
            maxLength={10}
            className="border-b-2 border-gray-300 w-full py-2"
            placeholderTextColor={'#f89156'}
            onChangeText={text => onChangeInput('mobile', text)}
          />
          <View className="flex flex-row items-center w-full justify-between border-b-2 border-gray-300">
            <TextInput
              placeholder="Password"
              secureTextEntry={passwordVisible ? false : true}
              className=" py-2 w-11/12"
              placeholderTextColor={'#f89156'}
              onChangeText={text => onChangeInput('password', text)}
            />

            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="p-2">
              {passwordVisible ? (
                <EyeIcon color={styles.darkPrimaryColor} size={20} />
              ) : (
                <EyeSlashIcon color={styles.darkPrimaryColor} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center my-4">
          <TouchableOpacity
            onPress={() => navigation.navigate(StackKeys.Common.LoginScreen)}
            className="flex-row justify-center items-center">
            <Text>Already have an account?</Text>
            <Text className="text-[#f89156] font-semibold ml-2">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center w-full space-y-4">
          <TouchableOpacity
            className=" mb-1 flex-row justify-center items-center bg-[#f89156] rounded-full py-3 w-40"
            onPress={signupHandler}>
            <Text className="text-white font-semibold">Signup</Text>
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
          <Text className="text-gray-400 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
