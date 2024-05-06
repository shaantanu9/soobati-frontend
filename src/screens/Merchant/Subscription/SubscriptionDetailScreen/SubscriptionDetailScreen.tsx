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
import SubscriptionCalender from './SubscriptionCalender';
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
      <View style={styles.header} className="mt-2">
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
