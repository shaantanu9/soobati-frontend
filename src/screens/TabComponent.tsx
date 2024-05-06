// import {Layout, Tab, TabView, Text} from '@ui-kitten/components';
// import React from 'react';
// import {HomeIcon} from 'react-native-heroicons/outline';
// import styles from '../styles';

// export const TabViewLazyLoadingShowcase = (): React.ReactElement => {
//   const [selectedIndex, setSelectedIndex] = React.useState(0);

//   const shouldLoadComponent = (index: number): boolean =>
//     index === selectedIndex;

//   return (
//     <TabView
//       selectedIndex={selectedIndex}
//       shouldLoadComponent={shouldLoadComponent}
//       onSelect={index => setSelectedIndex(index)}>
//       <Tab
//         icon={<HomeIcon size={20} color={styles.darkPrimaryColor} />}
//         title="">
//         <Layout>
//           <Text category="h5">USERS</Text>
//         </Layout>
//       </Tab>
//       <Tab
//         icon={<HomeIcon size={20} color={styles.darkPrimaryColor} />}
//         title="">
//         <Layout>
//           <Text category="h5">PRODUCTS</Text>
//         </Layout>
//       </Tab>
//       <Tab icon={<HomeIcon size={20} color={styles.darkPrimaryColor} />}>
//         <Layout>
//           <Text category="h5">ORDERS</Text>
//           <Text category="h5">ORDERS</Text>
//         </Layout>
//       </Tab>
//       <Tab icon={<HomeIcon size={20} color={styles.darkPrimaryColor} />}>
//         <Layout>
//           <Text category="h5">TRANSACTIONS</Text>
//         </Layout>
//       </Tab>
//     </TabView>
//   );
// };

import {useIsFocused} from '@react-navigation/native';
import {Layout, Tab, TabView, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {HomeIcon} from 'react-native-heroicons/outline';
import styles from '../styles';

// Props type for the component
type TabProps = {
  tabs: Array<{
    title: string;
    icon?: React.ReactElement;
    content: React.ReactElement;
  }>;
};

// Main component definition
export const DynamicTabView: React.FC<TabProps> = ({
  tabs,
}): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index: number): boolean =>
    index === selectedIndex;

  const focused = useIsFocused();

  useEffect(() => {
    setSelectedIndex(0);
  }, [focused]);

  return (
    <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          icon={tab.icon}
          // title={tab.title}
        >
          <Layout style={{padding: 10}}>{tab.content}</Layout>
        </Tab>
      ))}
    </TabView>
  );
};

// Usage example
const TabViewLazyLoadingShowcase = () => {
  const tabData = [
    {
      title: 'USERS',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Text category="h5">User Details</Text>,
    },
    {
      title: 'PRODUCTS',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Text category="h5">Product List</Text>,
    },
    {
      title: 'ORDERS',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Text category="h5">Order Details</Text>,
    },
    {
      title: 'ORDERS22',
      icon: <HomeIcon size={20} color={styles.darkPrimaryColor} />,
      content: <Text category="h5">Order Details</Text>,
    },
  ];

  return <DynamicTabView tabs={tabData} />;
};

export {TabViewLazyLoadingShowcase};
