import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styles from '../../styles';
const CommunityOrderCard = ({
  order,
  openAddCommitmentRef,
  selectedOrder,
  setSelectedOrder,
}: any) => {
  const customSnapOpen = (ref: any, index: number) => {
    setSelectedOrder(() => {
      ref.current.snapToIndex(index);
      return order;
    });
  };
  const [randomColorState, setRandomColorState] = useState('');
  const [progress, setProgress] = useState(0);
  const [randomColorTextState, setRandomColorTextState] = useState('');
  const randomColor = [
    // 'bg-red-500',
    // 'bg-yellow-500',
    // 'bg-green-500',
    // 'bg-blue-500',
    // 'bg-indigo-500',
    // 'bg-purple-500',
    // 'bg-pink-500',
    // 'bg-orange-400',
    'bg-white',
  ];
  const randomColorText = [
    // 'text-red-500',
    // 'text-yellow-500',
    // 'text-green-500',
    // 'text-blue-300',
    // 'text-indigo-500',
    // 'text-purple-500',
    // 'text-pink-500',
    'text-orange-400',
  ];

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
    }, 1000);
    const randInt = Math.floor(Math.random() * randomColor.length);
    setRandomColorState(randomColor[randInt]);
    setRandomColorTextState(randomColorText[randInt]);
    setProgress(order?.currentQuantity / order?.targetQuantity);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);
  console.log(
    order?.participants,
    'order?.participants',
    order?.currentQuantity,
    order?.targetQuantity,
    progress,
    'progress',
  );

  return (
    <View
      className={`
        ${randomColorState}
        rounded-xl shadow-lg m-2 p-3

        `}>
      <View className="flex-row justify-between items-center">
        <View>
          <Image
            source={{uri: order?.product?.thumbnail}}
            className="rounded-lg"
            style={{
              width: widthPercentageToDP(20),
              height: heightPercentageToDP(10),
            }}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text className="font-bold text- capitalize text-xl">
            {order?.product?.name}
          </Text>
          <Text className="font-bold text- capitalize">
            {order?.pricePerUnit} rs/ {order?.product?.unit}
          </Text>
          <Text className="font-bold text- capitalize">
            {order?.organizer?.username}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => customSnapOpen(openAddCommitmentRef, 2)}
            // border-gray-200
            className={`flex-row justify-center items-center 
              rounded-full py-2 w-20 border-2 
              mr-3 
              border-orange-200
               `}>
            <Text
              className={`text-[${styles.darkPrimaryColor}] font-bold shadow-md text-md
            
            `}>
              Join
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="flex-row justify-between items-start py-4 rounded-lg shadow-md w-full">
          <Text className="font-bold text- capitalize">
            {order?.currentQuantity} / {order?.targetQuantity}{' '}
            {order?.product?.unit}
          </Text>
          <Text className="font-bold text- capitalize">
            {(progress * 100).toFixed(2)} %
          </Text>
        </View>
        <Progress.Bar
          progress={progress}
          width={widthPercentageToDP(90)}
          color={styles.darkPrimaryColor}
        />
      </View>
      <View className="flex-row justify-between items-center rounded-lg  w-full ">
        <TouchableOpacity className="flex-row justify-start items-center rounded-lg ">
          <View className="flex-row justify-start items-center p-4 rounded-lg ">
            {order?.participants?.map((participant: any, index: number) => {
              if (index > 2) return;
              return (
                <View
                  key={participant.userId}
                  className="p-2 rounded-full bg-orange-200 ml-[-7]">
                  <Text className={`${randomColorTextState}`}>
                    {participant?.name?.slice(0, 1).toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text className="font-bold text- capitalize">
            {order?.participants?.length}+
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center rounded-lg shadow-md w-full ">
        <View>
          <Text className="font-bold text-">Order ends in 1 days</Text>
        </View>
        <View>
          <Text className="font-bold text- capitalize">{currentTime}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className={`rounded-xl shadow-lg ${randomColorState} m-2`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl text-white font-bold tracking-wider capitalize p-4 rounded-lg shadow-md ">
          {order?.product?.name}{' '}
          {order.currentQuantity &&
            ((order?.currentQuantity / order?.targetQuantity) * 100).toFixed(2)}
          % {/* {order?.organizer?.username.split(' ')[0]} */}
        </Text>
        <TouchableOpacity
          onPress={() => customSnapOpen(openAddCommitmentRef, 2)}
          className={`flex-row justify-center items-center 
          rounded-full py-2 w-20 border-2 border-gray-50 mr-3 `}>
          <Text className="text-white font-bold shadow-md text-md">Join</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-start items-center p-4 rounded-lg shadow-md">
        {order?.participants?.map((participant: any, index: number) => {
          if (index > 2) return;
          return (
            <View
              key={participant.userId}
              className="p-2 rounded-full shadow-md bg-white ml-[-7]">
              <Text className={`${randomColorTextState}`}>
                {participant?.name?.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          );
        })}
        {/* {order?.participants?.map((participant: any, index: number) => {
          if (index > 2) return;
          return (
            <View
              key={participant.userId}
              className="p-2 rounded-full shadow-md bg-white ml-[-7]">
              <Text className={`${randomColorTextState}`}>
                {participant?.name?.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          );
        })} */}
      </View>

      <View className="flex-row justify-between items-start p-4 rounded-lg shadow-md">
        <Text className="font-bold text-white">
          {order?.currentQuantity} / {order?.targetQuantity}{' '}
          {order?.product?.unit}
        </Text>
        <Text className="font-bold text-white">
          {order?.pricePerUnit} / {order?.product?.unit}
        </Text>
      </View>
      <View className="flex justify-between items-start p-4 rounded-lg shadow-md w-full">
        <View className="flex-row justify-between w-full mb-2">
          <View>
            <Text className="font-bold text-white">Order ends in 2 days</Text>
          </View>
          <View>
            <Text className="font-bold text-white">{currentTime}</Text>
          </View>
        </View>
        <Progress.Bar progress={progress} width={200} color={'#fff'} />
      </View>
    </View>
  );

  //   return (
  //     <View className="rounded-xl shadow-lg">
  //       <View className="flex justify-center items-center">
  //         <Image
  //           source={{uri: order?.product?.thumbnail}}
  //           style={{width: widthPercentageToDP(50), height: 100}}
  //         />
  //       </View>
  //       <View className="p-4 rounded-lg shadow-md space-y-1">
  //         <Text
  //           className="text-xl"
  //           style={{
  //             fontWeight: 'bold',
  //             color: 'black',
  //             textTransform: 'capitalize',
  //           }}>
  //           {order?.product?.name}
  //         </Text>
  //         <Text>{order?.organizer?.username}</Text>

  //         <View className="flex justify-between items-start">
  //           <Text>Order ends in 2 days</Text>
  //           <Progress.Bar progress={0.5} width={200} />
  //         </View>

  //         <View className="flex-row justify-between items-center">
  //           <Text>Order ends in 2 days</Text>
  //           <TouchableOpacity
  //             onPress={() => customSnapOpen(openAddCommitmentRef, 2)}
  //             className={`flex-row justify-center items-center bg-[${styles.darkPrimaryColor}] rounded-full py-2 w-20`}>
  //             <Text
  //               className="text-white font-semibold"
  //               style={{
  //                 fontWeight: 'bold',
  //                 color: 'white',
  //               }}>
  //               Join
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       {/* <BottomSheetComp
  //         title="Join Order"
  //         ref={openAddCommitmentRef}
  //         // snapPoints=[0, 60, 80]
  //         // order={order}
  //         // handleJoinOrder={handleJoinOrder}
  //         memoArray={['25%', '60%', '96%']}>
  //         <AddCommitment order={order} />
  //       </BottomSheetComp> */}
  //     </View>
  //   );
};

export default CommunityOrderCard;
