import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

const AutoSuggestExample = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any>([]);

  const fetchSuggestions = async (input: any) => {
    const YOUR_API_KEY = '5e39472922640597f05ba48be3dc375d';
    const url = `https://atlas.mapmyindia.com/api/places/search/json?query=${encodeURIComponent(
      input,
    )}&region=IND&token=${YOUR_API_KEY}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json,'json')
      if (json.suggestedLocations) {
        setSuggestions(json.suggestedLocations);
        console.log(json.suggestedLocations)
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type location..."
        value={query}
        onChangeText={text => {
          setQuery(text);
          if (text.length > 2) {
            fetchSuggestions(text);
          } else {
            setSuggestions([]);
          }
        }}
      />
      {/* <FlatList
        data={suggestions}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <Text style={styles.item}>{item.placeAddress}</Text>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default AutoSuggestExample;
