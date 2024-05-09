import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StackRoute} from '../NavigationRoutes';
// import { StackNav } from '../NavigationKeys';
// export type RootStackParamList = {
//   Home: undefined;
//   Details: undefined;
//   TabNavigation: undefined;
// };

export type RootStackParamList = {
  // Common
  WelcomeScreen: undefined;
  GettingStarted: undefined;
  TabNavigation: undefined;
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  AuthScreen: undefined;
  ForgetPasswordScreen: undefined;

  // User
  AccountDetails: {userData: any};
  SingleUserDetail: {userData: any};
  Login: undefined;
  OTPScreen: {mobile: string; sendOtp?: boolean};
  UserProfile: {userId: string};
  SubscriptionScreen: undefined;
  SubscriptionDetailScreen: {
    item: any;
  };

  // DeliveryPartner
  TodaysOrders: undefined;
  DeliveryPartnerHome: undefined;

  // Ecommerce
  ProductDetail: {
    data: any;
  };
  Listing: {
    userData: any;
  };
  Order: undefined;
  CartScreen: {
    data: any;
  };
  OrderSuccessScreen: undefined;
  OrderConfirmationScreen: undefined;
  // Merchant
  MyOrder: undefined;
  AddProductScreen: undefined;
  MerchantAccountSettingScreen: undefined;
  SubscriptionScreenMerchant: undefined;
  ProfileSettings: undefined;
  MerchantSettings: undefined;
  DeilveryPartnerSettings: undefined;
  MerchantHome: undefined;
  SubscriptionDetailMerchantScreen: {
    item: any;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      // initialRouteName="SubscriptionScreenMerchant"
      // initialRouteName="SubscriptionScreen"
      // initialRouteName="TabNavigation"
      // initialRouteName="DeliveryPartnerHome"
      // initialRouteName="MerchantHome"
      initialRouteName="SplashScreen"
      // initialRouteName='SubscriptionScreen'

      // initialRouteName="AddProductScreen"
      // initialRouteName="AuthScreen"
      // initialRouteName="MerchantAccountSettingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
        name={'WelcomeScreen'}
        component={StackRoute.Common.WelcomeScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name={'SplashScreen'}
        component={StackRoute.Common.SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name={'Listing'} component={StackRoute.Ecommerce.Listing} />
      {/* <Stack.Screen name="AccountDetails" component={StackRoute.AccountDetails} /> */}
      <Stack.Screen
        name={'UserProfile'}
        component={StackRoute.User.UserProfile}
      />
      {/* User */}

      {/* <Stack.Screen
        name="SingleUserDetail"
        component={StackRoute.SingleUserDetail}
      /> */}
      {/* Admin */}

      {/* Common */}

      <Stack.Screen
        name={'GettingStarted'}
        component={StackRoute.Common.GettingStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'TabNavigation'}
        component={StackRoute.Common.TabNavigation}
      />
      <Stack.Screen name={'Login'} component={StackRoute.Common.Login} />
      <Stack.Screen
        name={'SignupScreen'}
        component={StackRoute.Common.SignupScreen}
      />
      <Stack.Screen
        name={'LoginScreen'}
        component={StackRoute.Common.LoginScreen}
      />
      <Stack.Screen
        name={'AuthScreen'}
        component={StackRoute.Common.AuthScreen}
      />
      <Stack.Screen
        name={'ForgetPasswordScreen'}
        component={StackRoute.Common.ForgetPasswordScreen}
      />
      <Stack.Screen
        name={'OTPScreen'}
        component={StackRoute.Common.OtpScreen}
      />
      <Stack.Screen
        name={'SubscriptionScreen'}
        component={StackRoute.User.SubscriptionScreen}
      />
      <Stack.Screen
        name={'SubscriptionDetailScreen'}
        component={StackRoute.User.SubscriptionDetailScreen}
      />

      <Stack.Screen
        name={'ProfileSettings'}
        component={StackRoute.User.ProfileSettings}
      />

      {/* Ecommerce */}
      <Stack.Screen
        name={'ProductDetail'}
        component={StackRoute.Ecommerce.ProductDetail}
      />
      <Stack.Screen name={'Order'} component={StackRoute.Ecommerce.Order} />
      <Stack.Screen name={'CartScreen'} component={StackRoute.Ecommerce.Cart} />
      <Stack.Screen
        name={'OrderSuccessScreen'}
        component={StackRoute.Ecommerce.OrderSuccessScreen}
      />
      <Stack.Screen
        name={'OrderConfirmationScreen'}
        component={StackRoute.Ecommerce.OrderConfimation}
      />

      {/* DeleveryPArtner */}
      <Stack.Screen
        name={'TodaysOrders'}
        component={StackRoute.DeliveryPartner.TodaysOrders}
      />

      <Stack.Screen
        name={'DeliveryPartnerHome'}
        component={StackRoute.DeliveryPartner.DeliveryPartnerHome}
      />

      {/* Merchant */}
      <Stack.Screen
        name={'MerchantHome'}
        component={StackRoute.Merchant.MerchantHome}
      />
      <Stack.Screen name={'MyOrder'} component={StackRoute.Merchant.MyOrder} />
      <Stack.Screen
        name={'AddProductScreen'}
        component={StackRoute.Merchant.AddProductScreen}
      />
      <Stack.Screen
        name={'MerchantAccountSettingScreen'}
        component={StackRoute.Merchant.MerchantAccountSettingScreen}
      />
      <Stack.Screen
        name={'SubscriptionScreenMerchant'}
        component={StackRoute.Merchant.SubscriptionScreenMerchant}
      />
      <Stack.Screen
        name={'SubscriptionDetailMerchantScreen'}
        component={StackRoute.Merchant.SubscriptionDetailMerchantScreen}
      />
    </Stack.Navigator>
  );
}

// Types for StackNavigation.tsx

export type OtpScreenProps = StackScreenProps<RootStackParamList, 'OTPScreen'>;
