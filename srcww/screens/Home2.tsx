// import React, {useEffect, useState} from 'react';
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import RangeSlider from '../components/RangeSlider';
// import {searchUsers} from '../utils/searchUsers';

// const Home = () => {
//   const [userData, setUserData] = useState<any>([]);
//   const [showSearch, setShowSearch] = useState(true);
//   const [payload, setPayload] = useState({
//     search: '',
//     ageRange: [18, 50],
//     salaryRange: [0, 0],
//     heightRange: [4, 7],
//     // city: '',
//     // state: '',
//     // country: '',
//     // education: '',
//     // occupation: '',
//     // maritalStatus: '',
//     // hobbies: '',
//   });

//   const handleSearch = () => {
//     const newpayload = {
//       // ...payload,
//       ageRange: payload.ageRange,
//       // salaryRange: payload.salaryRange,
//       // heightRange: payload.heightRange,
//     };
//     // const fiteredData = searchUsers(newpayload);
//     // console.log({fiteredData});

//     setShowSearch(false);
//     // setUserData(fiteredData);
//   };

//   useEffect(() => {
//     const newpayload = {
//       ...payload,
//       ageRange: payload.ageRange,
//       salaryRange: payload.salaryRange,
//       heightRange: payload.heightRange,
//     };
//     const fiteredData = searchUsers(newpayload);
//     console.log({fiteredData}, 'fiteredData');

//     setShowSearch(false);
//     setUserData(fiteredData);
//   }, []);

//   return (
//     <View className="text-3xl w-90 flex justify-center">
//       <ScrollView style={{flex: 1}}>
//         {showSearch ? (
//           <View className="text-3xl w-90 flex justify-center p-1">
//             <TextInput
//               onChangeText={text => setPayload({...payload, search: text})}
//               placeholder="Search here"
//               value={payload.search}
//               placeholderTextColor={'#000'}
//               className="border border-gray-800  p-2 my-2 text-xl m-2 rounded-full pl-4"
//             />

//             {/* <Text className="text-[#FF4238] font-bold px-1"> */}
//             <Text className="text-[#ef7171] font-bold px-1">
//               Age {payload.ageRange[1]}
//             </Text>
//             <RangeSlider
//               value={payload.ageRange[1]}
//               setValue={(value: number) =>
//                 setPayload({...payload, ageRange: [18, value]})
//               }
//               min={18}
//               max={50}
//             />

//             {/* <Text className="text-[#FF4238] font-bold px-1"> */}
//             <Text className="text-[#ef7171] font-bold px-1">
//               Salary {payload.salaryRange[1]} Thousand
//             </Text>
//             <RangeSlider
//               value={payload.salaryRange[1]}
//               setValue={(value: number) => {
//                 setPayload({...payload, salaryRange: [0, value]});
//               }}
//             />

//             <Text className="text-[#ef7171] font-bold px-1">
//               Height {payload.heightRange[1].toFixed(1)}
//             </Text>
//             <RangeSlider
//               value={payload.heightRange[1]}
//               setValue={(value: number) => {
//                 setPayload({
//                   ...payload,
//                   heightRange: [4, value],
//                 });
//               }}
//               min={4}
//               max={8}
//               step={0.1}
//             />

//             <TouchableOpacity
//               onPress={handleSearch}
//               className=" w-full p-1 my-2  font-bold  bg-[#FF4238] rounded-lg">
//               <Text className="text-center font-bold text-white text-xl bg-[#FF4238]">
//                 Search
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View className="text-3xl w-90 flex justify-center">
//             <TouchableOpacity
//               onPress={() => {
//                 setShowSearch(true);
//               }}
//               className="border border-gray-400 w-full my-2  font-bold text-white bg-[#FF4238]">
//               <Text className="text-center font-bold text-xl bg-[#FF4238] text-white">
//                 Search Again
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//       {/* <Listing userData={userData} /> */}
//     </View>
//   );
// };

// export default Home;

import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import RangeSlider from '../components/RangeSlider';
import {searchUsers} from '../utils/searchUsers';
import Listing from './Listing';
const Home = () => {
  const [userData, setUserData] = useState<any>([]);
  const [showSearch, setShowSearch] = useState(true);
  const [payload, setPayload] = useState({
    search: '',
    ageRange: [18, 50],
    salaryRange: [0, 0],
    heightRange: [4, 7],
  });

  const handleSearch = () => {
    const newpayload = {
      ageRange: payload.ageRange,
    };
    const filteredData = searchUsers(newpayload);
    console.log(filteredData);

    setShowSearch(false);
    setUserData(filteredData);
  };

  useEffect(() => {
    const newpayload = {
      ageRange: payload.ageRange,
      salaryRange: payload.salaryRange,
      heightRange: payload.heightRange,
    };
    const filteredData = searchUsers(newpayload);
    console.log({filteredData}, 'filteredData');

    setShowSearch(false);
    setUserData(filteredData);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        //  justifyContent: 'center',
        // alignItems: 'center'
      }}>
      {/* <ScrollView style={{flex: 1}}> */}
      {showSearch && (
        <View
          style={{
            flex: 1,
            height: 100,
            padding: 10,
          }}>
          <TextInput
            onChangeText={text => setPayload({...payload, search: text})}
            placeholder="Search here"
            value={payload.search}
            placeholderTextColor={'#000'}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              marginVertical: 5,
              fontSize: 18,
              borderRadius: 20,
            }}
          />

          <Text
            style={{
              color: '#ef7171',
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}>
            Age {payload.ageRange[1]}
          </Text>
          <RangeSlider
            value={payload.ageRange[1]}
            setValue={(value: number) =>
              setPayload({...payload, ageRange: [18, value]})
            }
            min={18}
            max={50}
          />

          <Text
            style={{
              color: '#ef7171',
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}>
            Salary {payload.salaryRange[1]} Thousand
          </Text>
          <RangeSlider
            value={payload.salaryRange[1]}
            setValue={(value: number) =>
              setPayload({...payload, salaryRange: [0, value]})
            }
          />

          <Text
            style={{
              color: '#ef7171',
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}>
            Height {payload.heightRange[1].toFixed(1)}
          </Text>
          <RangeSlider
            value={payload.heightRange[1]}
            setValue={(value: number) =>
              setPayload({...payload, heightRange: [4, value]})
            }
            min={4}
            max={8}
            step={0.1}
          />

          <TouchableOpacity
            onPress={handleSearch}
            style={{
              width: '100%',
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: '#FF4238',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: 18,
              }}>
              Search
            </Text>
          </TouchableOpacity>
          <View>
            <Listing
              userData={userData}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />
          </View>
        </View>
      )}
      {!showSearch && (
        <TouchableOpacity
          onPress={() => setShowSearch(true)}
          className="bg-[#FF4238] rounded-lg p-2 m-2 ">
          <Text className="text-white center font-bold text-lg text-center">
            Search
          </Text>
        </TouchableOpacity>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default Home;
