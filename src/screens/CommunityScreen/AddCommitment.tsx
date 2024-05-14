import {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {_communityOrderService} from '../../services/api/communityOrder';
import styles from '../../styles';
import MyText from '../User/Subscription/MyText';
// import {BuildCommunityOrderQueryPayload} from '../../utils/interface';
interface addCommitmentProps {
  order: any;
  closeSheet: any;
}

const AddCommitment = ({order, closeSheet}: addCommitmentProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetQuantity = order?.targetQuantity || 1;
    const currentQuantity = order?.currentQuantity || 0;
    setProgress(currentQuantity / targetQuantity);
  }, [order]);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const handleJoinOrder = () => {
    console.log('Join Order', {order, quantity});
    _communityOrderService
      .addParticipantToCommunityOrder(order._id, {
        quantity,
        committed: true,
        message: 'I am committed',
      })
      .then(
        res => {
          console.log('res', res);
          if (res.statusCode === 200) {
            console.log('success', res.data);
            setQuantity(0);
            closeSheet();
          }
        },
        err => {
          console.log('err', err);
          closeSheet();
        },
      )
      .catch(err => {
        closeSheet();
        console.log('catch', err);
      });
  };

  return (
    <View>
      <View className="flex justify-center items-center">
        <Image
          source={{uri: order?.product?.thumbnail}}
          style={{width: widthPercentageToDP(98), height: 100}}
          //   resizeMode="cover"
        />
      </View>
      <View className="flex-row justify-between items-center">
        <View className="px-4 py-1 rounded-lg shadow-md">
          <Text className="text-lg font-bold tracking-wider capitalize">
            {order?.product?.name}
          </Text>
          <Text
            className="text-sm font-bold tracking-wider capitalize"
            style={{color: styles.darkPrimaryColor}}>
            {order?.organizer?.username}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-bold tracking-wider capitalize">
            {currentTime}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center px-4 space-x-2">
        <View className="flex flex-col space-y-2 border border-gray-200 p-1 rounded-lg">
          <Text className="font-bold">Total Participant{'  '}</Text>
          <Text className={`font-bold text-[${styles.darkPrimaryColor}]`}>
            {order?.participants?.length}
          </Text>
        </View>
        <View className="flex flex-col space-y-2  border border-gray-200 p-1 rounded-lg">
          <Text className="font-bold">
            Price per {order?.product?.unit}
            {'           '}
          </Text>
          <Text className={`font-bold text-[${styles.darkPrimaryColor}]`}>
            {order?.pricePerUnit} / {order?.product?.unit}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center  py-2 px-4 space-x-3">
        <View
          className={`flex flex-col space-y-2 border border-gray-200 p-2 rounded-lg
        `}>
          <Text className="font-bold">Target Quantity{'  '}</Text>
          <Text className={`font-bold text-[${styles.darkPrimaryColor}]`}>
            {order?.targetQuantity}
          </Text>
        </View>
        <View className="flex flex-col space-y-2 border border-gray-200 p-2 rounded-lg">
          <Text className="font-bold">Current Quantity</Text>
          <Text className={`font-bold text-[${styles.darkPrimaryColor}]`}>
            {order?.currentQuantity}
          </Text>
        </View>
      </View>
      <View className="flex flex-col justify-between items-start space-y-2 p-2 rounded-lg border border-gray-200  mb-3">
        <Text className="font-bold capitalize">
          Done {(progress * 100).toFixed(2)}%{' '}
        </Text>
        <View className="flex flex-col justify-center items-center">
          <Progress.Bar
            color={styles.darkPrimaryColor}
            progress={progress}
            width={widthPercentageToDP('80')}
          />
        </View>
      </View>

      <View>
        {/* <Text className="font-bold">Add Commitment in {order?.product?.unit}</Text>
        <TextInput
          value={commitment}
          onChangeText={setCommitment}
          placeholder={`Enter your commitment in ${order?.product?.unit}`}
          className="border-2 border-gray-200 p-2 w-full rounded-lg"
          //   placeholderTextColor={'#000'}
        /> */}
        <MyText
          placeholder={`Enter your commitment in ${order?.product?.unit}`}
          text={quantity.toString() || '0'}
          setText={text => setQuantity(Number(text) || 0)}
          keyboardTypeInput={'2'}
        />
        <TouchableOpacity
          onPress={handleJoinOrder}
          disabled={quantity === 0}
          className={`text-white p-3 rounded-lg mt-2 
          bg-[${styles.darkPrimaryColor}]
            ${quantity === 0 ? 'opacity-50' : ''}
          `}>
          <Text className="text-center text-white font-bold">
            Add Commitment
          </Text>
        </TouchableOpacity>
        <Text className="text-center  font-bold">
          Total Paid Amount : {quantity * order?.pricePerUnit}
        </Text>
      </View>
    </View>
  );
};

export default AddCommitment;
