import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {
  ArchiveBoxArrowDownIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import {StackKeys} from '../../../Navigation/NavigationKeys';
import {DynamicTabView} from '../../../screens/TabComponent';
import styles from '../../../styles';
import MyOrdersScreen from '../OrderManagment/NewOrder';

const MoveToHome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    console.log('MoveToHome');
    // navigation.navigate(StackKeys.Common.TabNavigation);
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate(StackKeys.Common.TabNavigation)}>
        <Text>Move to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const DeliveryPartnerHome = () => {
  const tabs = [
    // {
    //   title: 'Home',
    //   content: <HomeDashbaord />,
    //   icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
    // },
    {
      title: 'Orders',
      content: <MyOrdersScreen />,
      icon: (
        <ArchiveBoxArrowDownIcon size={20} color={styles.darkPrimaryColor} />
      ),
    },
    {
      title: 'Subscriptions',
      content: <MoveToHome />,
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
    },
    // {
    //   title: 'Products',
    //   content: <Products />,
    //   icon: (
    //     <ArchiveBoxArrowDownIcon size={20} color={styles.darkPrimaryColor} />
    //   ),
    // },
  ];

  return (
    <ScrollView>
      <DynamicTabView tabs={tabs} />
    </ScrollView>
  );
};

export default DeliveryPartnerHome;
