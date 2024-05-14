import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PieChart} from 'react-native-gifted-charts';
import {useAppSelector} from '../../hooks/useAppSelector';
import styles from '../../styles';

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
    const counts = subscriptionList.reduce((acc: any, sub) => {
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
      if (item?.deliveries) deliveries.push(...item?.deliveries);                 
    });
    const counts = deliveries?.reduce((acc: any, delivery: any) => {
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

  const renderLegendComponent = (pieData: any) => {
    return (
      <View className="flex-row justify-between flex-wrap mt-[-12] h-12">
        {pieData.map((entry: any, index: any) => (
          <View key={index} className="flex-row items-center w-30 mb-2.5 mx-5">
            {renderDot(entry.color)}
            <Text
              className={`${textColor ? `text-[${textColor}]` : 'text-white'}`}>
              {entry.label}: {entry.value}
            </Text>
          </View>
        ))}
      </View>
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
      <View className="mt-[1] flex-row justify-between">
        <TouchableOpacity onPress={aggregateDeliveriesByStatus}>
          <Text
            className={`text-sm
                          bg-[${styles.darkPrimaryColor}] text-white px-2 py-1 rounded-full
                          `}>
            by Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={aggregateSubscriptionsByActiveStatus}>
          <Text
            className={`text-sm
              bg-[${styles.darkPrimaryColor}] text-white px-2 py-1 rounded-full
              `}>
            by Status
          </Text>
        </TouchableOpacity>
      </View>
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
                {filteredData[0]?.value}
              </Text>
              <Text className="text-lg text-white">
                {filteredData[0]?.label}
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
