// Import necessary components and hooks
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';

// const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_MAPS_API_KEY';
const  GOOGLE_MAPS_APIKEY = 'AIzaSyDO2K52Xb4RItlWKN9OALhJKXSzR3rKEfE';

const TravelForm = () => {
  const [coordinates, setCoordinates] = useState({
    start: null,
    destination: null,
    stop: null,
  });

  // Function to handle the location selection
  const handleLocationSelect = (data, details, location) => {
    const newCoordinates = {
      ...coordinates,
      [location]: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
    };
    setCoordinates(newCoordinates);
  };

  // Render the Google Places Autocomplete inputs
  const renderPlacesInput = (placeholder, location) => (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => handleLocationSelect(data, details, location)}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      styles={{
        container: styles.placesAutocompleteContainer,
        textInput: styles.placesInput,
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* {renderPlacesInput('Enter start location', 'start')}
      {renderPlacesInput('Enter destination', 'destination')}
      {renderPlacesInput('Enter a stop (optional)', 'stop')} */}
<MapView
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {Object.keys(coordinates).map(key => coordinates[key] && (
          <Marker key={key} coordinate={coordinates[key]} />
        ))} */}

        {/* {coordinates.start && coordinates.destination && (
          <MapViewDirections
            origin={coordinates.start}
            destination={coordinates.destination}
            waypoints={coordinates.stop ? [coordinates.stop] : []}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )} */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  placesAutocompleteContainer: {
    width: '90%',
    height: 60,
  },
  placesInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
});

export default TravelForm;
