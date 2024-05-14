import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import images from '../../../assets/images';
import styles from '../../../styles';

const SubscriptionList = ({ subscriptionList }) => {
  return (
    <FlatList
      data={subscriptionList}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
            marginVertical: 8,
            backgroundColor: '#FFF',
            borderRadius: 8,
            // ...shadowStyle,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={images.bookImage1}
              style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' }}>
                {item.productName}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {item.businessName}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 12 }}>
              ${item.payments[0].amount}
            </Text>
            <ChevronRightIcon size={24} color="#000" />
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
    />
  );
};

export default SubscriptionList;
