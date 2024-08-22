import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import {createPost} from '../../API/endpoints';
import {showMessage} from 'react-native-flash-message';

const HomeScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        setImage(pickedImage.uri);
        setFormData({...formData, image: pickedImage});
      }
    });
  };
  const createPostBlog = async () => {
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
      const res = await createPost(formDataToSend);
      if (res && res.status === 201) {
        showMessage({
          message: 'Post created successfully',
          backgroundColor: 'green',
        });
        setFormData({...formData, title: '', description: '', image: null});
        setImage('');
      } else {
        showMessage({
          message: 'Something went wrong',
          backgroundColor: 'red',
        });
      }
    } catch (err) {
      console.log('error during create post');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Add New Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={'black'}
            value={formData.title}
            onChangeText={text => setFormData({...formData, title: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor={'black'}
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an image</Text>
          </TouchableOpacity>
          {image && <Image source={{uri: image}} style={styles.image} />}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => createPostBlog()}>
            <Text style={styles.submitButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  inputContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4a00e0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  imagePickerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
