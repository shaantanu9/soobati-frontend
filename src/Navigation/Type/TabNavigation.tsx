//@ts-ignore

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
  UserGroupIcon,
} from 'react-native-heroicons/outline';
import HomeScreen from '../../screens/Common/Home/Home';
import CommunityHome from '../../screens/CommunityScreen/CommunityScreen';
import StoreScreen from '../../screens/Ecommerce/StoreScreen/StoreScreen';
import SelectAddItemScreen from '../../screens/SelectAddItemScreen/SelectAddItemScreen';
import SubscriptionScreen from '../../screens/User/Subscription/SubscriptionScreen';
import styles from '../../styles';
import {StackRoute} from '../NavigationRoutes';
import TravelForm from '../../screens/CommunityTravel/CommunityTravel';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? '#FF4238' : 'black'} size={24} />
          ),
          headerShown: false,
        }}
      />

      {/* Store */}
      <Tab.Screen
        name="store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BuildingStorefrontIcon
              color={focused ? styles.darkPrimaryColor : 'black'}
              size={24}
            />
          ),

          tabBarLabel: '',
          headerShown: false,
        }}
      />
      {/* Plus Icon */}
      {/* <Tab.Screen
        name="PlusIcon"
        component={SelectAddItemScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                borderWidth: focused ? 2 : 0,
                borderColor: focused ? styles.darkPrimaryColor : 'white',
              }}
              className={`flex flex-row justify-center items-center border-5 border-white rounded-full bg-[${
                styles.darkPrimaryColor
              }] w-14 h-14 mt-[-20] ${focused && `bg-white  `}`}>
              <PulseTabIcon focused={focused} />
            </View>
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      /> */}

      {/*  */}

      {/* Travel Glob */}
      <Tab.Screen
        name="Swipe"
        component={CommunityHome}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              className={` border-5 w-[30px] font-extrabold h-8 mt-[10px]  ${
                focused && `bg-white`
              }`}>
              <UserGroupIcon
                color={focused ? styles.darkPrimaryColor : 'black'}
              />
            </View>
          ),

          tabBarLabel: '',
          headerShown: false,
        }}
      />

      {/*  */}
      <Tab.Screen
        name="PlusIcon"
        // component={}
        component={SelectAddItemScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <GlobeAsiaAustraliaIcon
              color={focused ? styles.darkPrimaryColor : 'black'}
              size={24}
            />
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      />

      {/* Subscription Page */}
      <Tab.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CalculatorIcon
              color={focused ? styles.darkPrimaryColor : 'black'}
              size={24}
            />
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={StackRoute.User.UserProfile}
        options={{
          headerShown: false,
          tabBarButton: () => null, // This will hide the tab bar button
        }}
      />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
    </Tab.Navigator>
  );
}

export default TabNavigation;
