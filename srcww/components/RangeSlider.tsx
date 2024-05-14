// // import Slider from '@react-native-community/slider';
// // import React from 'react';

// // const RangeSlider = () => {
// //   return (
// //     <Slider
// //       style={{width: 200, height: 40}}
// //       minimumValue={0}
// //       maximumValue={1}
// //       minimumTrackTintColor="#FFFFFF"
// //       maximumTrackTintColor="#000000"
// //       value={0.5}
// //     />
// //   );
// // };

// // export default RangeSlider;

// import Slider from '@react-native-community/slider';
// import React, {useState} from 'react';
// import {Text, View} from 'react-native';

// const RangeSlider = () => {
//   const [minValue, setMinValue] = useState(0);
//   const [maxValue, setMaxValue] = useState(100);

//   return (
//     <View>
//       <Text>Select Range</Text>

//       <Text>{`Min: ${minValue.toFixed(2)} - Max: ${maxValue.toFixed(2)}`}</Text>

//       <Slider
//         minimumValue={0}
//         maximumValue={100}
//         step={1}
//         value={minValue}
//         onValueChange={value => setMinValue(value)}
//       />

//       <Slider
//         minimumValue={0}
//         maximumValue={100}
//         step={1}
//         value={maxValue}
//         onValueChange={value => setMaxValue(value)}
//       />
//     </View>
//   );
// };

// export default RangeSlider;

import Slider from '@react-native-community/slider';
import React from 'react';
import {Text, View} from 'react-native';

export interface RangeProps {
  value: number;
  setValue: any;
  step?: number;
  max?: number;
  min?: number;
  name?: string;
}

const RangeSlider = ({
  value,
  setValue,
  max = 100,
  min = 0,
  step = 1,
  name = '',
}: RangeProps) => {
  const [range, setRange] = React.useState(min);

  const handleValueChange = (values: any) => {
    console.log(values, 'values');
    setValue(values);
    setRange(values);
  };

  function isFloat(value: number) {
    return Number.isFinite(value) && !Number.isInteger(value);
  }

  

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'start',
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        // backgroundColor: 'red',
      }}>
      <Text
      className="text-black text-md font-bold"
      >
        {name}
        {' : '}
        {isFloat(range) ? range.toFixed(1) : range}
      </Text>
      <Slider
        style={{width: '80%', alignSelf: 'center'}}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#FF4238"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FF4238"
      />
    </View>
  );
};

export default RangeSlider;
