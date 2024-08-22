import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getBlogDetails} from '../../API/endpoints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {API_BASE_URL} from '../../utils/extras';

const BlogDetails = ({route, navigation}) => {
  const [postDetails, setPostDetails] = useState(null);

  const getDetails = async () => {
    try {
      const res = await getBlogDetails(route?.params?.postId);
      setPostDetails(res.data);
    } catch (error) {
      console.error('Failed to fetch post details:', error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!postDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={{paddingLeft:10,padding:10}} onPress={() => navigation.pop()}>
        <AntDesign name={'back'} color={'black'} size={30}></AntDesign>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Image
          source={{uri: `${API_BASE_URL}/${postDetails.image}`}}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{postDetails.title}</Text>
          <Text style={styles.description}>{postDetails.description}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.dateLabel}>Created:</Text>
            <Text style={styles.dateValue}>
              {new Date(postDetails.createdAt).toLocaleString()}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.dateLabel}>Last Updated:</Text>
            <Text style={styles.dateValue}>
              {new Date(postDetails.updatedAt).toLocaleString()}
            </Text>
          </View>
          <Text style={styles.commentsTitle}>Comments</Text>
          {postDetails.comments.length > 0 ? (
            postDetails.comments.map(comment => (
              <View key={comment._id} style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentsText}>No comments yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
    paddingTop: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#6200EE',
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    lineHeight: 26,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    color: '#888',
  },
  dateValue: {
    fontSize: 16,
    color: '#333',
  },
  commentsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  commentContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  noCommentsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default BlogDetails;
