// import React from 'react';
// import {Text, View} from 'react-native';
// import {PieChart} from 'react-native-gifted-charts';
// const Gifted = ({title}: {title: string},

//   ) => {
//   const pieData = [
//     {
//       value: 47,
//       color: '#009FFF',
//       gradientCenterColor: '#006DFF',
//       focused: true,
//     },
//     {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
//     {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
//     {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
//     {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
//   ];

//   const renderDot = (color: any) => {
//     return (
//       <View
//         style={{
//           height: 10,
//           width: 10,
//           borderRadius: 5,
//           backgroundColor: color,
//           marginRight: 10,
//         }}
//       />
//     );
//   };

//   const renderLegendComponent = () => {
//     return (
//       <>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginBottom: 10,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               width: 120,
//               marginRight: 20,
//             }}>
//             {renderDot('#006DFF')}
//             <Text style={{color: 'white'}}>Excellent: 47%</Text>
//           </View>
//           <View
//             style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
//             {renderDot('#8F80F3')}
//             <Text style={{color: 'white'}}>Okay: 16%</Text>
//           </View>
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               width: 120,
//               marginRight: 20,
//             }}>
//             {renderDot('#3BE9DE')}
//             <Text style={{color: 'white'}}>Good: 40%</Text>
//           </View>
//           <View
//             style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
//             {renderDot('#FF7F97')}
//             <Text style={{color: 'white'}}>Poor: 3%</Text>
//           </View>
//         </View>
//       </>
//     );
//   };

//   return (

//       <View
//         // style={{
//         //   margin: 20,
//         //   padding: 16,
//         //   borderRadius: 20,
//         //   backgroundColor: '#232B5D',
//         // }}
//         className='bg-blue-800'
//         >
//         <Text
//         // style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}
//         className='text-white text-2xl font-bold p-5'
//         >
//           {title}
//         </Text>
//         <View style={{padding: 20, alignItems: 'center'}}>
//           <PieChart
//             data={pieData}
//             donut
//             showGradient
//             sectionAutoFocus
//             radius={90}
//             innerRadius={60}
//             innerCircleColor={'#232B5D'}
//             focusOnPress={true}
//             centerLabelComponent={() => {
//               return (
//                 <View style={{justifyContent: 'center', alignItems: 'center'}}>
//                   <Text
//                     style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
//                     47%
//                   </Text>
//                   <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
//                 </View>
//               );
//             }}
//           />
//         </View>
//         {renderLegendComponent()}
//       </View>

//   );
// };

// export default Gifted;

import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PieChart} from 'react-native-gifted-charts';
import {useAppSelector} from '../../hooks/useAppSelector';
import styles from 'src/styles';

const Gifted = ({
  title,
  bgColor,
  textColor,
}: {
  title?: string;
  bgColor: string;
  textColor?: string;
}) => {
  const subscriptionList = useAppSelector(
    state => state.subscription.subscriptions,
  );

  const [byStatus, setByStatus] = useState([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return '#009FFF';
      case 'Pending':
        return '#FFA5BA';
      case 'Cancelled':
        return '#FF7F97';
      case 'Returned':
        return '#BDB2FA';
      default:
        return '#FFA5BA';
    }
  };

  const aggregateSubscriptionsByActiveStatus = () => {
    const counts = subscriptionList.reduce((acc, sub) => {
      const key = sub.active ? 'Active' : 'Inactive';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(counts).map(key => ({
      value: counts[key],
      color: key === 'Active' ? '#009FFF' : '#FF7F97', // Active in blue, Inactive in red
      label: key,
    }));
    return setFilteredData(data);
  };

  const aggregateDeliveriesByStatus = () => {
    const deliveries: any = [];
    subscriptionList.map((item: any) => {
      deliveries.push(...item.deliveries);
    });
    const counts = deliveries.reduce((acc, delivery) => {
      acc[delivery.status] =
        (acc[delivery.status] || 0) + delivery.quantity || 1;
      return acc;
    }, {});
    const deliveryData = Object.keys(counts).map(status => ({
      value: counts[status],
      color: getStatusColor(status), // Define getStatusColor to map status to colors
      label: status,
    }));
    setFilteredData(deliveryData);
  };
  useEffect(() => {
    aggregateDeliveriesByStatus();
  }, [subscriptionList]);

  const renderDot = (color: string) => {
    return (
      <View
        className="h-2.5 w-2.5 rounded-full mr-2.5"
        style={{backgroundColor: color}}
      />
    );
  };

  const renderLegendComponent = pieData => {
    return (
      <>
        <View className="mt-[-20] flex-row justify-between">
          <TouchableOpacity onPress={aggregateDeliveriesByStatus}>
            <Text className="text-sm">Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={aggregateSubscriptionsByActiveStatus}>
            <Text className={
              `text-sm
              bg-[${styles.darkPrimaryColor}]
              ` +
            }>Active</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between flex-wrap">
          {pieData.map((entry, index) => (
            <View
              key={index}
              className="flex-row items-center w-30 mb-2.5 mx-5">
              {renderDot(entry.color)}
              <Text
                className={`${
                  textColor ? `text-[${textColor}]` : 'text-white'
                }`}>
                {entry.label}: {entry.value}
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <View className={`bg-[${bgColor}]`}>
      {title && (
        <Text
          className={
            `text-2xl font-bold` +
            `${textColor ? `text-[${textColor}]` : 'text-white'}
            `
          }>
          {title}
        </Text>
      )}
      <View className="p-5 items-center">
        <PieChart
          // data={byActiveStatus}
          data={filteredData}
          // data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          focusOnPress={true}
          centerLabelComponent={() => (
            <View className="justify-center items-center">
              <Text className="text-3xl text-white font-bold">
                {filteredData[0].value}
              </Text>
              <Text className="text-lg text-white">
                {filteredData[0].label}
              </Text>
            </View>
          )}
        />
      </View>
      {renderLegendComponent(filteredData)}
    </View>
  );
};

export default Gifted;
