
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {StackRoute} from '../Navigation/NavigationRoutes';
import {useAppDispatch} from '../hooks/useAppSelector';
import {setUser} from '../redux/features/userSlice';
import {userservice} from '../services/api';
import {setItem} from '../utils/storage';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface UserData {
  name?: string;
  family?: {
    mobile?: string;
  };
  uncle?: {
    mobile?: string;
  };
  images?: string[];
  _id?: string;
}

const Login = ({navigation}: LoginProps) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [userData, setUserData] = useState<UserData>({});
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useAppDispatch();

  const handleLoginPress = () => {
    if (mobileNumber.trim() === '' || mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }
    setOtpSent(false);

    userservice._userAccountService
      .simpleUserMobileExist(mobileNumber.trim())
      .then(res => {
        if (res.statusCode == 200) {
          setUserData(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const confirmationHandler = (answer: string) => {
    console.log(answer, mobileNumber, 'answer, mobileNumber');
    if (answer === 'yes') {
      userservice._userAccountService
        .sendOTP(mobileNumber.trim())
        .then(res => {
          if (res.statusCode == 200) {
            setOtpSent(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (answer === 'no') {
      setMobileNumber('');
      setOtpSent(false);
      setUserData({});
    }
  };

  const refs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  useEffect(() => {
    const isAllFilled = otp.every(digit => digit !== '');
    isAllFilled && handleOtpFilled();
  }, [otp]);

  const handleOtpFilled = () => {
    const otpValue = otp.join('');

    userservice._userAccountService
      .verifyOTP(mobileNumber.trim(), otpValue)
      .then(res => {
        if (res.statusCode == 200) {
          Alert.alert('Success', 'OTP verified successfully');
          console.log(res.data, 'res.data');

          dispatch(setUser(res.data));

          userservice._userAccountService
            .saveWholeData()
            .then(res => {
              setItem('userData', JSON.stringify(res.data) || '');
            })
            .catch(err => {
              console.log(err, 'err');
            });
          navigation.navigate(StackRoute.TabNavigation);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOtpChange = (index:number, value:any) => {
    if (isNaN(value)) {
      // Only allow numeric input
      return;
    }

    // Update the current digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input
    if (value !== '' && index < otp.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        source={require('../assets/images/loginscreen.jpg')}
        style={{
          width: '100%',
          height: '100%',

          flex: 1,
          color: 'white',
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <View className="text-3xl flex justify-center text-white m-2">
          <Text className="text-3xl text-white font-bold">
            मोबाइल नंबर एंटर करा
          </Text>
          <TextInput
            className="border-white w-full p-2 my-2 text-white text-xl font-bold border-2 rounded-md"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            onChangeText={text => setMobileNumber(text)}
            value={mobileNumber}
            style={{color: 'white'}}
            placeholderTextColor={'white'}
          />

          <TouchableOpacity
            className="bg-[#FF4238] font-bold text-white  rounded-lg p-1"
            onPress={handleLoginPress}>
            <Text className="text-center font-bold text-white text-2xl">
              Login
            </Text>
          </TouchableOpacity>

          {userData.name && !otpSent && (
            <View className="flex flex-col justify-center items-start  gap-1 mt-4">
              <View className="mb-4 bg-gray-50 w-full rounded-lg px-4">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg text-[#FF4238] font-bold">नाव:</Text>
                  <Text className="text-lg text-[#FF4238] font-bold capitalize">
                    {userData?.name}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg text-[#FF4238] font-bold">
                    वडिलांचा नाव
                  </Text>
                  <Text className="text-lg text-[#FF4238] font-bold capitalize">
                    {userData?.family?.father}
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg text-[#FF4238] font-bold">
                    वडिलांचा मोबाइल नंबर
                  </Text>
                  <Text className="text-lg text-[#FF4238] font-bold">
                    {userData?.family?.mobile}
                  </Text>
                </View>
              </View>
              <View className="flex flex-col justify-center  text-white gap-1  bg-white w-full px-20 py-5 rounded-lg">
                <Text className="text-lg text-[#FF4238] font-bold">
                  हे Account तुमचा आहे का?
                </Text>
                <View className="flex flex-row justify-between items-center w-70">
                  <TouchableOpacity
                    className="bg-[#FF4238] font-bold text-white  rounded-lg p-1 px-4"
                    onPress={() => confirmationHandler('yes')}>
                    <Text className="text-center font-bold text-white text-lg">
                      हो
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-[#FF4238] font-bold text-white  rounded-lg p-1 px-4"
                    onPress={() => confirmationHandler('no')}>
                    <Text className="text-center font-bold text-white text-lg ">
                      नाही
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {otpSent && (
            <View className="mt-2">
              <Text className="text-2xl text-white font-bold">
                कृपया OTP टाका
              </Text>
              <View className="flex flex-row justify-between ">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={refs[index]}
                    placeholder="0"
                    className="w-1/6 border-2 rounded-md  justify-center m-1 text-center mx-3 text-white text-2xl font-bold  border-white "
                    placeholderTextColor={'white'}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={value => handleOtpChange(index, value)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
