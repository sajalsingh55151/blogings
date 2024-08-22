import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  getUserProfile,
  updateProfilePhoto,
  updateUserProfile,
} from '../../API/endpoints';
import {API_BASE_URL, IMAGE_URL} from '../../utils/extras';
import {IMAGES} from '../../utils/images';
import {showMessage} from 'react-native-flash-message';
import * as ImagePicker from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';

const UserProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    country: '',
    state: '',
    pincode: '',
    email: '',
  });
  const [edit, setEdit] = useState(false);

  const getUserData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const res = await getUserProfile(userId);
      setFormData({
        ...formData,
        userName: res.data.user.userName,
        country: res.data.user.country,
        state: res.data.user.state,
        pincode: res.data.user.pincode,
        email: res.data.user.email,
      });
      setProfilePhoto(res.data.user.profilePhoto);
    } catch (err) {
      console.log(err, 'err during the get profile data');
    }
  };
  const handleImagePick = async () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response?.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
        setNewProfilePhoto(response.assets[0]);
        setCancel(true);
      }
    });
  };
  const updateProfilePic = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const formData = new FormData();
    formData.append('profilePhoto', {
      uri: newProfilePhoto.uri,
      type: newProfilePhoto.type,
      name: newProfilePhoto.fileName,
    });
    try {
      const res = await updateProfilePhoto(userId, formData);
      getUserData();
      setCancel(false);
      setImageUri(null);
      showMessage({
        message: 'Profile Photo updated Successfully',
        style: {
          backgroundColor: 'green',
        },
      });
    } catch (err) {
      console.log('error during changes the profile photo', err);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getUserData();
    }
  }, [isFocused]);
  const updateUserData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const res = await updateUserProfile(formData, userId);
    if (res.data.message && res.status == 200) {
      showMessage({
        message: res.data.message,
        backgroundColor: 'green',
      });
    }
    console.log(res.data, 'res is coming');
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.container}>
        <View style={styles.profileContainer}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.profileImage} />
          ) : (
            <Image
              source={{
                uri: `${API_BASE_URL}/${profilePhoto.replace(/\\/g, '/')}`,
              }}
              style={styles.profileImage}
            />
          )}
          {imageUri ? (
            <TouchableOpacity
              onPress={() => updateProfilePic()}
              style={{backgroundColor: 'green', borderRadius: 10, padding: 10}}>
              <Text
                style={[
                  styles.changeImageText,
                  {color: 'white', fontSize: 16},
                ]}>
                Upload Image
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleImagePick}>
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          )}
          {cancel && (
            <TouchableOpacity
              onPress={() => {
                getUserData();
                setCancel(false);
                setImageUri(null);
              }}>
              <Text style={styles.changeImageText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <View style={{width: '100%'}}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              value={formData.userName}
              onChangeText={text => setFormData({...formData, userName: text})}
              placeholder="Username"
              placeholderTextColor="#888"
              editable={edit}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              editable={edit}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={formData.pincode}
              onChangeText={text => setFormData({...formData, pincode: text})}
              placeholder="Pincode"
              placeholderTextColor="#888"
              keyboardType="numeric"
              editable={edit}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={text => setFormData({...formData, state: text})}
              placeholder="State"
              placeholderTextColor="#888"
              editable={edit}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              value={formData.country}
              onChangeText={text => setFormData({...formData, country: text})}
              placeholder="Country"
              placeholderTextColor="#888"
              editable={edit}
            />
          </View>
          {edit ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateUserData();
                  setEdit(false);
                }}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  getUserData();
                  setEdit(false);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEdit(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
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
  profileContainer: {
    width: '80%',
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2980B9',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  changeImageText: {
    textAlign: 'center',
    color: '#6200EE',
    marginTop: 10,
    fontSize: 16,
  },
});

export default UserProfileScreen;
