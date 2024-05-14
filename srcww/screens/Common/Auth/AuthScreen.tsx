import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import {AppleIcon, GoogleIcon} from '../../../assets/svg';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import styles from '../../../styles';
import {NavigationProps} from '../../../utils/interface';

const AuthScreen = ({navigation}: NavigationProps) => {
  const route = useRoute();
  //   const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
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
        source={images.auth}
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
        <View className="flex justify-between items-start mb-10">
          <Text className="text-3xl font-bold">Hello,</Text>
          <Text className="text-2xl font-bold">Welcome to Soobati App</Text>
        </View>

        <View className="flex justify-center items-center w-full space-y-4">
          <TouchableOpacity
            className={` mb-1 flex-row justify-center items-center bg-[${styles.darkPrimaryColor}] rounded-full py-3 w-40`}
            onPress={() =>
              navigation.navigate(StackKeys.Common.LoginScreen, {
                from: 'AuthScreen',
              })
            }>
            <Text className="text-white font-semibold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" mb-1 flex-row justify-center items-center bg-white rounded-full py-3 w-40 border border-[#FFBE98]"
            onPress={() => navigation.navigate(StackKeys.Common.SignupScreen)}
            // onPress={() => navigation.navigate('SignupScreen')}
          >
            <Text
              className={` text-[${styles.darkPrimaryColor}] font-semibold`}>
              Signup
            </Text>
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

export default AuthScreen;

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
