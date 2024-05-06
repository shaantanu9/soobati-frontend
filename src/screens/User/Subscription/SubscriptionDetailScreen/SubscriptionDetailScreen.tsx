// import {useRoute} from '@react-navigation/native';
// import React, {useEffect} from 'react';
// import {
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {ChevronLeftIcon, PencilIcon} from 'react-native-heroicons/outline';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import ImageAssets from '../../../assets/images';
// import {NavigationProps} from '../../../utils/interface';
// import SubscriptionCalender from './SubscriptionCalender';

// const SubscriptionDetailScreen = ({navigation}: NavigationProps) => {
//   const route = useRoute();
//   const {item}: any = route.params;

//   useEffect(() => {
//     console.log('subscription', item);
//   }, [route]);

//   return (
//     <KeyboardAvoidingView>
//       <View className="bg-gray-50">
//         <View className="flex bg-white">
//           <View className="flex-row items-center justify-between p-4">
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.goBack();
//               }}>
//               <ChevronLeftIcon size={24} color="#000" />
//             </TouchableOpacity>
//             <Text className="text-lg font-bold">{item.productName}</Text>
//             <View className="flex-row items-center space-x-2">
//               {/* <ShareIcon size={24} color="#000" /> */}
//               {/* <ShoppingCartIcon size={24} color="#000" /> */}
//               {/* <TouchableOpacity onPress={openNotification}>
//               <BellAlertIcon size={24} color="#000" />
//             </TouchableOpacity> */}
//               <TouchableOpacity
//               // onPress={() => customSnapOpen(openAddSubscriptionRef, 2)}
//               >
//                 <PencilIcon
//                   size={20}
//                   color="#000"
//                   // className='bg-[#F2F2F2] rounded-full p-2 animate-bounce'
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <ScrollView>
//           <View
//             className="flex justify-center items-center
//         bg-white rounded-t-3xl shadow-lg
//         ">
//             <Image
//               source={ImageAssets.bookImage1}
//               style={{height: hp('50%'), width: '90%'}}
//             />
//           </View>
//           <View className="bg-white p-4 rounded-t-3xl shadow-lg">
//             <Text className="text-xl font-semibold">Subscription Details</Text>
//           </View>

//           <SubscriptionCalender />

//           <View className="rounded-t-3xl shadow-lg"></View>
//           <View className="py-4 rounded-t-3xl shadow-lg">
//             <View className="flex-row justify-between flex-wrap">
//               <Text className="text-lg font-semibold">Subscription Details</Text>
//               <Text className="text-lg font-semibold">Subscription Details</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default SubscriptionDetailScreen;

import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronLeftIcon, PencilIcon} from 'react-native-heroicons/outline';
import ImageAssets from '../../../../assets/images';
import {NavigationProps} from '../../../../utils/interface';
import SubscriptionCalender from '../SubscriptionCalender';
import SubscriptionDetailScreenTab from './SubscriptionDetailScreenTab';

const SubscriptionDetail = ({navigation}: NavigationProps) => {
  const route = useRoute();
  const {item}: any = route.params;

  useEffect(() => {
    console.log('subscription', item);
  }, [route]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{item.productName}</Text>
          <TouchableOpacity>
            <PencilIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Image source={ImageAssets.bookImage1} style={styles.bookImage} />
        <Text style={styles.sectionTitle}>Subscription Details</Text>

        <SubscriptionCalender />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Subscription Details</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const SubscriptionDetailScreen = ({navigation}: NavigationProps) => {
  const route = useRoute();
  const {item}: any = route.params;
  return (
    <>
      <View style={styles.header}
      className='mt-2'
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{item.productName}</Text>
        <TouchableOpacity>
          <PencilIcon size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <SubscriptionDetailScreenTab item={item} />
    </>
  );
};
export default SubscriptionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'gray-50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookImage: {
    height: 300,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});
