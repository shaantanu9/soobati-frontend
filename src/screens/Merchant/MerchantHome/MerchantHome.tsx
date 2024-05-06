import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '@ui-kitten/components';
import React from 'react';
import {ScrollView} from 'react-native';
import {
  ArchiveBoxArrowDownIcon,
  CalendarIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import ProfileSettings from '../../../screens/Common/Settings/ProfileSettings';
import {DynamicTabView} from '../../../screens/TabComponent';
import styles from '../../../styles';
import MyOrdersScreen from '../OrderManagment/NewOrder';
import SubscriptionScreen from '../Subscription/SubscriptionScreen';
import HomeDashbaord from './HomeDashbaord';

const {Navigator, Screen} = createBottomTabNavigator();

const Products = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text category="h1">PRODUCTS</Text> */}
    </Layout>
  );
};

export const MerchantHome = () => {
  const navigation = useNavigation();
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
      content: <ProfileSettings navigation={navigation} hideHeader={true} />,
      icon: (
        <ArchiveBoxArrowDownIcon size={20} color={styles.darkPrimaryColor} />
      ),
    },
  ];

  return (
    <ScrollView>
      <DynamicTabView tabs={tabs} />
    </ScrollView>
  );
};
