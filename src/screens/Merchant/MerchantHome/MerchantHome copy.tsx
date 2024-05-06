import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  ArchiveBoxArrowDownIcon,
  CalendarIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import {StackRoute} from '../../../Navigation/NavigationRoutes';
import {DynamicTabView} from '../../../screens/TabComponent';
import styles from '../../../styles';
import MyOrdersScreen from '../OrderManagment/NewOrder';
import SubscriptionDetailScreen from '../Subscription/SubscriptionDetailScreen/SubscriptionDetailScreen';
import SubscriptionScreen from '../Subscription/SubscriptionScreen';
import HomeDashbaord from './HomeDashbaord';

const {Navigator, Screen} = createBottomTabNavigator();

const UsersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <HomeDashbaord />
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <MyOrdersScreen />
  </Layout>
);

const Subscriptions = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <SubscriptionScreen />
  </Layout>
);

const Products = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text category="h1">PRODUCTS</Text> */}
    </Layout>
  );
};

const BottomTabBar = ({navigation, state}: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab
      // title="USERS"
      icon={<HomeIcon color={styles.darkPrimaryColor} />}
    />
    <BottomNavigationTab
      // title="ORDERS"

      icon={<ArchiveBoxArrowDownIcon color={styles.darkPrimaryColor} />}
    />
    <BottomNavigationTab
      // title="SUBSCRIPTIONS"
      icon={<CalendarIcon color={styles.darkPrimaryColor} />}
    />
    <BottomNavigationTab
      // title="PRODUCTS"
      icon={<ArchiveBoxArrowDownIcon color={styles.darkPrimaryColor} />}
    />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name="Users"
      component={HomeDashbaord}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="Subscriptions"
      component={Subscriptions}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="Products"
      component={Products}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="SubscriptionDetailScreen"
      component={SubscriptionDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="MainCustomerHome"
      component={StackRoute.Common.TabNavigation}
    />
  </Navigator>
);

export const MerchantHome = () => {
  const tabs = [
    {
      title: 'Home',
      content: <HomeDashbaord />,
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
    },
    {
      title: 'Orders',
      content: <MyOrdersScreen />,
      icon: (
        <ArchiveBoxArrowDownIcon size={20} color={styles.darkPrimaryColor} />
      ),
    },
    {
      title: 'Subscriptions',
      content: <SubscriptionScreen />,
      icon: <CalendarIcon size={20} color={styles.darkPrimaryColor} />,
    },
    {
      title: 'Products',
      content: <Products />,
      icon: (
        <ArchiveBoxArrowDownIcon size={20} color={styles.darkPrimaryColor} />
      ),
    },
  ];

  return (
    // <NavigationContainer independent={true}>
    //   <TabNavigator />
    // </NavigationContainer>
    <ScrollView>
      <DynamicTabView tabs={tabs} />
    </ScrollView>
  );
};
