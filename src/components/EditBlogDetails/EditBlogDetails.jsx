import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {
  getBlogDetails,
  updateBlog,
  updateBlogDetails,
} from '../../API/endpoints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {API_BASE_URL} from '../../utils/extras';
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

const EditBlogDetails = ({route, navigation}) => {
  const [postDetails, setPostDetails] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const getDetails = async () => {
    try {
      const res = await getBlogDetails(route?.params?.postId);
      const data = res.data;
      setPostDetails(data);
      setFormData({
        ...formData,
        title: data.title,
        description: data.description,
      });
      setTitle(data.title);
      setDescription(data.description);
      setImageUri(`${API_BASE_URL}/${data.image}`);
    } catch (error) {
      console.error('Failed to fetch post details:', error);
    }
  };

  const handleImagePick = async () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response?.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
        setFormData({...formData, image: response.assets[0]});
      }
    });
  };
  const updatePostBlog = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', {
        uri: formData.image.uri,
        type: formData.image.type,
        name: formData.image.fileName,
      });
    }
    try {
      const id = route?.params?.postId;
      const res = await updateBlog(id, formDataToSend);
      console.log(res.data);
      if(res.data){
        showMessage({
            message: "Blog updated Successfully",
            style: {
              backgroundColor: 'green',
            },
          });
      }
      getDetails()
    } catch (err) {
      console.log('error during create post');
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  console.log(formData, 'formDataformData');
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
      <TouchableOpacity
        style={{paddingLeft: 10, padding: 10}}
        onPress={() => navigation.pop()}>
        <AntDesign name={'back'} color={'black'} size={30} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={{uri: imageUri}} style={styles.image} />
          <Text style={styles.changeImageText}>Change Image</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.titleInput}
            value={formData.title}
            onChangeText={text => setFormData({...formData, title: text})}
            placeholder="Edit title"
          />
          <TextInput
            style={styles.descriptionInput}
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
            placeholder="Edit description"
          />
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
          <View style={{gap: 20, marginTop: 20}}>
            <Button
              title="Save Changes"
              onPress={() => updatePostBlog()}
              color="#6200EE"
            />
            <Button
              title="Dicard Changes"
              onPress={() => navigation.pop()}
              color="gray"
            />
          </View>
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
  changeImageText: {
    textAlign: 'center',
    color: '#6200EE',
    marginTop: 10,
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  descriptionInput: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    lineHeight: 26,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
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
});

export default EditBlogDetails;
