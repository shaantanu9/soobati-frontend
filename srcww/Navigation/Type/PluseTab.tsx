import React from 'react';
import {Animated} from 'react-native';

import {PlusIcon} from 'react-native-heroicons/outline';
import styles from '../../styles';

const PulseTabIcon = ({focused}: any) => {
  const scale = new Animated.Value(1);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.25,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <PlusIcon color={focused ? styles.darkPrimaryColor : 'white'} size={24} />
    </Animated.View>
  );
};

export default PulseTabIcon;
