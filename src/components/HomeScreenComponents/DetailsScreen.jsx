import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetailsScreen = ({route}) => {
  const dummyData = {
    title: 'A Day in the Life of a Developer',
    author: 'Jane Doe',
    date: 'July 25, 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl: 'https://via.placeholder.com/300',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{dummyData.title}</Text>
      <Text style={styles.author}>{`by ${dummyData.author}`}</Text>
      <Text style={styles.date}>{dummyData.date}</Text>
      <Text style={{color:'red'}}>{route.params.data ? route.params.data :"no data found" }</Text>
      <Image source={{ uri: dummyData.imageUrl }} style={styles.image} />
      <Text style={styles.content}>{dummyData.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#555',
  },
  date: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default DetailsScreen;
