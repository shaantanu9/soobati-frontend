import {Text} from '@ui-kitten/components';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import styles from '../../styles';

const CommunityOrderCard = ({
  order,
  openAddCommitmentRef,
  selectedOrder,
  setSelectedOrder,
}: any) => {
  //   const dispatch = useDispatch();

  //   const handleJoinOrder = () => {
  //     // Dispatch action to join the order
  //     // dispatch(onJoin(order));
  //     console.log('Join Order', order);
  //   };

  //   const openAddCommitmentRef = React.useRef(null);

  const customSnapOpen = (ref: any, index: number) => {
    setSelectedOrder(order);
    ref.current.snapToIndex(index);
  };

  return (
    <View className="rounded-xl shadow-lg">
      <View className="flex justify-center items-center">
        <Image
          source={{uri: order?.product?.thumbnail}}
          style={{width: widthPercentageToDP(50), height: 100}}
        />
      </View>
      <View className="p-4 rounded-lg shadow-md space-y-1">
        <Text
          className="text-xl"
          style={{
            fontWeight: 'bold',
            color: 'black',
            textTransform: 'capitalize',
          }}>
          {order?.product?.name}
        </Text>
        <Text>{order?.organizer?.username}</Text>

        <View className="flex justify-between items-start">
          <Text>Order ends in 2 days</Text>
          <Progress.Bar progress={0.5} width={200} />
        </View>

        <View className="flex-row justify-between items-center">
          <Text>Order ends in 2 days</Text>
          <TouchableOpacity
            onPress={() => customSnapOpen(openAddCommitmentRef, 2)}
            className={`flex-row justify-center items-center bg-[${styles.darkPrimaryColor}] rounded-full py-2 w-20`}>
            <Text
              className="text-white font-semibold"
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              Join
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomSheetComp
        title="Join Order"
        ref={openAddCommitmentRef}
        // snapPoints=[0, 60, 80]
        // order={order}
        // handleJoinOrder={handleJoinOrder}
        memoArray={['25%', '60%', '96%']}>
        <AddCommitment order={order} />
      </BottomSheetComp> */}
    </View>
  );
};

export default CommunityOrderCard;
