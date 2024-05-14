// Screens

// User
import SingleUserDetail from '../screens/SingleUserDetail';
import SubscriptionScreen from '../screens/User/Subscription/SubscriptionScreen';
import UserProfile from '../screens/User/UserProfile/UserProfile';

// Ecommerce
import ProductDetail from '../screens/Details';
import Cart from '../screens/Ecommerce/Cart/Cart';
import OrderConfimation from '../screens/Ecommerce/Order/OrderConfirmation';
import Order from '../screens/Ecommerce/Order/OrderHistory';
import OrderSuccessScreen from '../screens/Ecommerce/Order/OrderSuccessScreen';
import Listing from '../screens/Listing';
import MyOrder from '../screens/Merchant/OrderManagment/NewOrder';
// Admin

// Common
import AuthScreen from '../screens/Common/Auth/AuthScreen';
import ForgetPasswordScreen from '../screens/Common/Auth/ForgetPassword';
import LoginScreen from '../screens/Common/Auth/LoginScreen';
import OtpScreen from '../screens/Common/Auth/OtpScreen';
import SignupScreen from '../screens/Common/Auth/SignupScreen';
import GettingStarted from '../screens/Common/GettingStarted/GettingStarted';
import HomeScreen from '../screens/Common/Home/Home';
import SplashScreen from '../screens/Common/SplashScreen/SplashScreen';
import Login from '../screens/Login';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigation from './Type/TabNavigation';

// DeliveryPartner
import TodaysOrders from '../screens/DeliveryPartner/TodaysOrder/TodaysOrder';

// Merchant
import MerchantAccountSettingScreen from '../screens/Merchant/MerchantAccountSetting/MerchantAccountSetting';
import AddProductScreen from '../screens/Merchant/ProductManagment/AddProductScreen';
import SubscriptionDetailMerchantScreen from '../screens/Merchant/Subscription/SubscriptionDetailScreen/SubscriptionDetailMerchantScreen';
import SubscriptionDetailScreen from '../screens/User/Subscription/SubscriptionDetailScreen/SubscriptionDetailScreen';

import ProfileSettings from '../screens/Common/Settings/ProfileSettings';
import DeliveryPartnerHome from '../screens/DeliveryPartner/DeliveryPartnerHome/DeliveryPartnerHome';
import {MerchantHome} from '../screens/Merchant/MerchantHome/MerchantHome';
import SubscriptionScreenMerchant from '../screens/Merchant/Subscription/SubscriptionScreenMerchant';

export const StackRoute = {
  // Home,
  Common: {
    WelcomeScreen,
    TabNavigation,
    Login,
    SplashScreen,
    GettingStarted,
    HomeScreen,
    SignupScreen,
    LoginScreen,
    AuthScreen,
    ForgetPasswordScreen,
    OtpScreen,
  },
  Ecommerce: {
    Listing,
    ProductDetail,
    Order,
    Cart,
    OrderSuccessScreen,
    OrderConfimation,
  },
  Admin: {},
  User: {
    SubscriptionScreen,
    UserProfile,
    SubscriptionDetailScreen,
    SingleUserDetail,
    ProfileSettings,
  },
  DeliveryPartner: {
    TodaysOrders,
    DeliveryPartnerHome,
  },

  Merchant: {
    MyOrder,
    AddProductScreen,
    MerchantAccountSettingScreen,
    SubscriptionScreenMerchant,
    MerchantHome,
    SubscriptionDetailMerchantScreen,
  },
};

export const AuthRoute = {};

export const TabRoute = {};
