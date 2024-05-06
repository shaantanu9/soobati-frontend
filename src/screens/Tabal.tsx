//@ts-nocheck
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const SimpleTable = ({userData}: any) => {
  const openDialer = () => {
    // Use Linking to open the phone dialer
    const phoneNumber = userData?.family?.mobile;
    if (phoneNumber) {
      const dialerUrl = `tel:${phoneNumber}`;
      Linking.openURL(dialerUrl);
    }
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Image
          source={
            //   {
            //   uri:
            //     userData?.images?.[0] ||
            //     'https://media.licdn.com/dms/image/D4D03AQEegEL4LbbSEA/profile-displayphoto-shrink_200_200/0/1698299653999?e=1709769600&v=beta&t=prozbHAyu8c_cxnfSb73rcMqfJDjyJ38SgSOGTWBz9M' ||
            //     'https://i.imgur.com/An9lt8E.png',
            // }
            require('../assets/images/myphoto.jpeg')
          }
          resizeMode="cover"
          style={{
            width: '100%',
            height: 330,
          }}
        />
        {/* Personal */}
        <View className="flex flex-row justify-between ml-2 mt-2">
          <Text className="text-[22px] text-black  capitalize font-extrabold">
            व्यक्तिगत माहिती
          </Text>
        </View>
        <View style={styles.table}>
          {/* Row 1 */}
          {/* Pustak Number */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">
                {userData?.pustak?.name || 'सोयर'} क्रमांक
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                className="text-md text-black font-bold capitalize"
                style={styles.text}>
                {userData?.pustak?.number || 12}
              </Text>
            </View>
          </View>
          {/* Name */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">नाव</Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={styles.text}
                className="text-md text-black font-bold capitalize">
                {userData?.name || 'शंतनू बोंबटकर'}
              </Text>
            </View>
          </View>
          {/* City */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">गाव</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black font-bold capitalize">
                {userData?.family?.address?.city || 'शिर्डी'}
              </Text>
            </View>
          </View>
          {/* Education */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">शिक्षण</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black font-bold capitalize">
                {userData?.education || 'शिर्डी'}
              </Text>
            </View>
          </View>
          {/* Income */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">
                उत्पन्न
              </Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black font-bold capitalize">
                {userData?.salary || '0'} हजार रुपये प्रती महिना
              </Text>
            </View>
          </View>
        </View>

        {/* Family */}
        <View className="flex flex-row justify-between ml-2">
          <Text className="text-[22px] text-black  capitalize font-extrabold">
            पारिवारिक माहिती
          </Text>
        </View>
        <View style={styles.table}>
          {/* Father */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">वडील</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black font-bold capitalize">
                {userData?.family?.father}
              </Text>
            </View>
          </View>
          {/* Mobile */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">मोबाइल</Text>
            </View>
            <View style={styles.cell} className="flex flex-row">
              <TouchableOpacity
                onPress={() => openDialer(userData?.family?.mobile)}>
                <Text className="text-[16px] text-black font-bold capitalize">
                  <Icon name="phone" size={20} color="#FF4238" />{' '}
                  {userData?.family?.mobile}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Farm */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">शेती</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black font-bold capitalize">
                {userData?.family?.farm?.bagayti} एकर बागायती आणि{' '}
                {userData?.family?.farm?.jirayti} एकर जिरायती
              </Text>
            </View>
          </View>
          {/* Address */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black capitalize">पत्ता</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black capitalize font-bold">
                {userData?.family?.address.addressLine1}
              </Text>
            </View>
          </View>
          {/* City */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">गाव</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.family?.address.city}
              </Text>
            </View>
          </View>
          {/* व्यवसाय  */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">
                व्यवसाय
              </Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.family?.occupation}
              </Text>
            </View>
          </View>
          {/* Brother */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize ">भाऊ</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.family?.brother}
              </Text>
            </View>
          </View>
          {/* Sister */}
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">बहीण</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.family?.sister}
              </Text>
            </View>
          </View>
        </View>

        <View
          className="flex flex-row justify-between ml-2 mb-2"
          style={{marginTop: 20}}>
          <Text className="text-[22px] text-black  capitalize font-extrabold">
            मामकूळ
          </Text>
        </View>

        <View
          style={styles.table}
          style={{
            flex: 1,
            // height: 600,
          }}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black capitalize">नाव</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.uncle?.name}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">मोबाइल</Text>
            </View>
            <View style={styles.cell}>
              <TouchableOpacity
                onPress={() => openDialer(userData?.uncle?.mobile)}>
                <Text className="text-[16px] text-black  capitalize font-bold">
                  <Icon name="phone" size={20} color="#FF4238" />{' '}
                  {userData?.uncle?.mobile}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">पत्ता</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.uncle?.address?.addressLine1}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize ">गाव</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.uncle?.address?.city}
              </Text>
            </View>
          </View>
          {/* <View style={styles.row}>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize">मामकूळ</Text>
            </View>
            <View style={styles.cell}>
              <Text className="text-[16px] text-black  capitalize font-bold">
                {userData?.uncle?.name}
              </Text>
            </View>
          </View> */}
          {/* </ScrollView> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,

    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default SimpleTable;
