import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {
  getPosts,
  deletePost,
  deletePosts,
  updateLike,
  addComments,
  deleteComment,
} from '../../API/endpoints';
import {API_BASE_URL} from '../../utils/extras';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';

const BlogPosts = ({navigation}) => {
  const isFocus = useIsFocused();
  const [blogData, setBlogData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostComments, setSelectedPostComments] = useState([]);

  const fetchBlogs = async () => {
    const res = await getPosts();
    setBlogData(res.data);
  };

  useEffect(() => {
    if (isFocus) {
      fetchBlogs();
    }
  }, [isFocus]);

  const removeBlogs = async id => {
    try {
      await deletePosts(id);
      const allBlog = blogData.filter(item => item._id !== id);
      setBlogData(allBlog);
    } catch (error) {
      console.log(error, 'Error during the delete item');
    }
  };

  const handleEdit = id => {
    navigation.navigate('EditBlogs', {
      postId: id,
    });
  };

  const handleComment = (id, comments) => {
    setSelectedPostId(id);
    setSelectedPostComments(comments);
    setModalVisible(true);
  };

  const submitComment = async (text, id) => {
    await addComments(text, id);
    fetchBlogs();
    setModalVisible(false);
    setText('');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('BlogDetails', {
          postId: item._id,
        })
      }>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.image ? (
          <Image
            source={{uri: `${API_BASE_URL}/${item.image.replace(/\\/g, '/')}`}}
            style={styles.image}
          />
        ) : null}
        <Text style={styles.createdAt}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => toggleLike(item)}>
            <Icon
              name={item.liked ? 'heart' : 'heart-o'}
              size={20}
              color={item.liked ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleComment(item._id, item.comments)}>
            <Icon
              name="comment"
              size={20}
              color="black"
              style={styles.commentIcon}
            />
          </TouchableOpacity>
          <Text>{item.comments.length}</Text>
          <TouchableOpacity
            onPress={() => handleEdit(item._id)}
            style={styles.editButton}>
            <Icon name="edit" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeBlogs(item._id)}
            style={styles.deleteButton}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const removeComments = async (postId, commentId) => {
    console.log(postId, commentId);
    await deleteComment(postId, commentId);
    fetchBlogs();
  };

  const toggleLike = async blog => {
    await updateLike({liked: !blog.liked}, blog._id);
    fetchBlogs();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blogData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.commentsContainer}>
              {selectedPostComments.map(comment => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text key={comment._id} style={styles.commentText}>
                    {comment.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeComments(selectedPostId, comment._id)}
                    style={styles.deleteButton}>
                    <Icon name="trash" size={15} color="blue" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Enter your comment"
              value={text}
              onChangeText={setText}
            />
            <View style={{flexDirection: 'row', gap: 10}}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button
                title="Send"
                onPress={() => submitComment({text}, selectedPostId)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatListContent: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    marginLeft: 20,
    marginRight: 5,
  },
  editButton: {
    marginLeft: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  commentsContainer: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default BlogPosts;
