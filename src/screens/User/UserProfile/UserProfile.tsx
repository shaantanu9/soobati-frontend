import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {
  AdjustmentsHorizontalIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../../../assets/images';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {DynamicTabView} from '../../../screens/TabComponent';
import {_userAccountService} from '../../../services/api/user';
import styles from '../../../styles';
import ProductCard from './Catlog';
import Catlog2 from './Catlog2';
import Catlog3 from './Catlog3';
import Userdetail from './UserDetails';

const ProfileScreen = ({navigation}: any) => {
  const routes = useRoute();
  const {_id}: any = routes.params;
  const [userDetail, setUserDetail] = useState<any>({});
  const [ownProfile, setOwnProfile] = React.useState(false);
  const loginAccount = useAppSelector(state => state.user);

  // Replace with actual data
  const profileData = {
    name: 'Leonardo Mecci',
    role: 'Periodista en El Diario Argentino',
    profileImage: images.profileImage1, // Import your image accordingly
    experience: [
      {
        companyLogo: 'path-to-playmedia-logo', // Import your image accordingly
        role: 'Jefe de redacción del área "medicina"',
        companyName: 'Playmedia',
      },
      // ... Add other experiences
    ],
  };

  useEffect(() => {
    _userAccountService.getSingleUserProfile(_id).then(res => {
      if (res.statusCode === 200) {
        setUserDetail(res.data);
        console.log('User Detail: useEffect', res.data);
        if (res?.data?.mobile === loginAccount.mobile) {
          setOwnProfile(true);
        }
      }
    });
  }, [routes.params]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points for the Bottom Sheet
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // Function to handle Bottom Sheet changes
  const handleSheetChanges = (index: number) => {
    console.log('Bottom sheet position:', index);
  };

  const tabs = [
    {
      title: 'Tab 1',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Userdetail userDetail={userDetail} ownProfile={ownProfile} />,
    },
    {
      icon: (
        <BuildingStorefrontIcon size={20} color={styles.darkPrimaryColor} />
      ),
      title: 'Tab 2',
      content: <ProductCard ownerId={_id} ownProfile={ownProfile} />,
    },
    {
      title: 'Tab 3',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Catlog2 />,
    },
    {
      title: 'Tab 4',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Catlog3 />,
    },
  ];

  return (
    <>
      <View className="flex-row justify-between items-center px-4 pt-2 bg-white shadow-md">
        {/* <TouchableOpacity>
          <ArrowLeftIcon className="w-6 h-6" size={24} color="black" />
        </TouchableOpacity> */}
        <Text className="text-lg font-bold tracking-wider">
          {userDetail?.username || 'User Profile'}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackKeys.User.ProfileSettings)}>
          <AdjustmentsHorizontalIcon
            className="w-6 h-6"
            size={24}
            color={styles.darkPrimaryColor}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}} className="bg-white">
        <View className="flex-1 justify-center items-center">
          <View className="relative flex-col items-center rounded-3xl w-96  p-4 bg-white shadow-3xl dark:bg-navy-800 dark:text-white">
            <View className="flex-1 items-center justify-center">
              <ImageBackground
                source={images.backgroundImage}
                className="w-full justify-center items-center"
                style={{height: hp('20%'), width: wp('100%')}}
                resizeMode="cover">
                {ownProfile && (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: hp('1%'), // Adjust top position as needed
                        left: hp('1%'), // Adjust right position as needed
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <Cog8ToothIcon
                          size={24}
                          color="white"
                          className="mr-2"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        top: hp('1%'), // Adjust top position as needed
                        right: hp('1%'), // Adjust right position as needed
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <Cog6ToothIcon size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <Image
                  source={images.profileImage1}
                  className="rounded-full border-4 border-white bg-pink-400 dark:border-navy-700"
                  style={{
                    height: hp('10%'), // Making the image size to be 10% of the screen height
                    width: hp('10%'), // Maintain aspect ratio by making width equal to height
                    borderRadius: hp('5%'), // Half of height and width to make it perfectly circular
                    position: 'absolute',
                    bottom: hp('1%'), // Adjust this value to position it according to your design
                    // white border around the image
                    borderWidth: 4,
                    borderColor: 'white',
                  }}
                />
              </ImageBackground>
            </View>
            <View className=" flex-row items-center justify-center ">
              <View className="mb-3 flex-row gap-14">
                <View className="flex-col items-center justify-center">
                  <Text className="text-lg font-bold text-navy-700 dark:text-white">
                    17
                  </Text>
                  <Text className="text-sm font-normal text-gray-600">
                    Posts
                  </Text>
                </View>
                <View className="flex-col items-center justify-center">
                  <Text className="text-lg font-bold text-navy-700 dark:text-white">
                    9.7K
                  </Text>
                  <Text className="text-sm font-normal text-gray-600">
                    Followers
                  </Text>
                </View>
                <View className="flex-col items-center justify-center">
                  <Text className="text-lg font-bold text-navy-700 dark:text-white">
                    434
                  </Text>
                  <Text className="text-sm font-normal text-gray-600">
                    Following
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView>
          <DynamicTabView tabs={tabs} />
        </ScrollView>
      </ScrollView>

      {/* <BottomSheetComp title='' >
      <Login
        navigation={navigation}
        route={navigation}
      />
      </BottomSheetComp> */}
      {/* <CustomBottomSheet snapPoints={['80%', '100%']} initialSnapIndex={0}>
  <Text>This is a flexible bottom sheet.</Text>
</CustomBottomSheet> */}
    </>
  );
};

export default ProfileScreen;
