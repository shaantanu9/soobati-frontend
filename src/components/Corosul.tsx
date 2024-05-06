import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const data = [
  {id: '1', content: 'Item 1'},
  {id: '2', content: 'Item 2'},
  {id: '3', content: 'Item 3'},
  // Add more items as needed
];

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

  //   get user screen width and height
  const {width, height} = Dimensions.get('window');

  const renderItem = ({item}) => (
    <View
      style={[styles.item, {backgroundColor: `rgba(0, 0, 0, 0.${item.id})`}]}>
      {/* <Text>{item.content}</Text> */}
      <Image
        style={styles.image}
        source={{uri: 'https://picsum.photos/800/800'}}
      />
    </View>
  );

  const handlePageChange = event => {
    const {viewableItems} = event;
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index || 0);
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={handlePageChange}
      />
      <Text className="text-black">Current Page: {currentPage + 1}</Text>
      <Text className="text-black">Total Pages: {data.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 10,
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 50,
  },
});

export default Carousel;
