import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {MapPinIcon} from 'react-native-heroicons/outline';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import * as Progress from 'react-native-progress';
import styles from '../../styles';
import {reverseGeocode} from '../../utils/functions';
const GetUserLocation = ({setAddress}: any) => {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const getLocation = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
            if (result === RESULTS.GRANTED) {
              getCoordinates();
            }
          });
          break;
        case RESULTS.GRANTED:
          getCoordinates();
          break;
      }
    });
  };

  const getCoordinates = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        // Here you could also call the function to reverse geocode the coordinates.
        reverseGeocode(latitude, longitude)
          .then(address => {
            console.log('Address:', address);
            setAddress(address);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error reverse geocoding:', error);
            setLoading(false);
          });
      },
      error => {
        console.log(error.code, error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <TouchableOpacity
      onPress={getLocation}
      className={`flex-row bg-[${styles.darkPrimaryColor}] p-2 rounded-md items-center justify-center w-90 mx-auto mt-4`}>
      <MapPinIcon size={20} color="white" />
      {loading && (
        <Progress.Circle
          size={20}
          indeterminate={true}
          color="white"
          style={{marginLeft: 10}}
        />
      )}

      <Text className="text-white ml-2">Get Current Location</Text>
    </TouchableOpacity>
  );
};

export default GetUserLocation;
