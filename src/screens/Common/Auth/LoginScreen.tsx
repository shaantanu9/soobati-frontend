import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
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
import {useAppDispatch} from '../../../hooks/useAppSelector';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {loginWithPassword} from '../../../redux/features/userThunk';
import styles from '../../../styles/index';
import {NavigationProps} from '../../../utils/interface';

const LoginScreen = ({navigation}: NavigationProps) => {
  const route = useRoute();
  // const navigation = useNavigation();

  const [loginData, setLoginData] = React.useState({
    mobile: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onChangeInput = (key: string, value: string) => {
    setLoginData({
      ...loginData,
      [key]: value,
    });
  };

  const loginHandler = () => {
    console.log('Login', loginData);

    dispatch(loginWithPassword(loginData))
      .unwrap()
      .then(res => {
        console.log('Signup Response', res);
        // if (res.statusCode === 200) {
        navigation.navigate(StackKeys.Common.TabNavigation);
        // }
      })
      .catch(err => {
        console.log('Signup Error', err);
      });

    // _userAccountService
    //   .loginUserWithPassword(loginData)
    //   .then(res => {
    //     console.log('Signup Response', res);
    //     if (res.statusCode === 200) {
    //       navigation.navigate(StackKeys.Common.TabNavigation);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Signup Error', err);
    //   });
  };

  return (
    <ScrollView>
      <View className="bg-white flex-1">
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={styles.darkPrimaryColor}
        />
        <Image
          source={images.login}
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
            <Text
              className={`text-3xl font-bold text-[${styles.darkPrimaryColor}]`}>
              Login
            </Text>
          </View>

          <View>
            <TextInput
              placeholder="Mobile"
              className="border-b-2 border-gray-300 w-full py-2"
              placeholderTextColor={styles.darkPrimaryColor}
              autoComplete="tel"
              keyboardType="phone-pad"
              maxLength={10}
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

          <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(StackKeys.Common.ForgetPasswordScreen)
              }
              // onPress={() => navigation.navigate('ForgetPasswordScreen')}
              className="flex-row justify-center items-center ">
              <Text
                className={`text-[${styles.darkPrimaryColor}] font-semibold`}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center my-4">
            <TouchableOpacity
              onPress={() => navigation.navigate(StackKeys.Common.SignupScreen)}
              className="flex-row justify-center items-center">
              <Text>Don't have an account?</Text>
              <Text
                className={`text-[${styles.darkPrimaryColor}] font-semibold ml-2`}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex justify-center items-center w-full space-y-4">
            <TouchableOpacity
              className={` mb-1 flex-row justify-center items-center bg-[${styles.darkPrimaryColor}] rounded-full py-3 w-40`}
              onPress={loginHandler}>
              <Text className="text-white font-semibold">Login</Text>
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
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
