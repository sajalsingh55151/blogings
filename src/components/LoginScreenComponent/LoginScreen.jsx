import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {signIn} from '../../API/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
const LoginScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleLogin = async () => {
    await signIn(formData)
      .then(async res => {
        const {message, token, userId} = res.data;
        const {status} = res;
        if (message && token && userId && status == 201) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userId', userId);
          showMessage({
            message: message,
            style: {
              backgroundColor: 'green',
            },
          });
          navigation.navigate("BottomTab")
        } else if (status == 200 && message && !token) {
          showMessage({
            message: message,
            style: {
              backgroundColor: 'red',
            },
          });
        }else{
          showMessage({
            message: "something went wrong",
            style: {
              backgroundColor: 'green',
            },
          });
        }
      })
      .catch(err => {
        console.log('Error during the login', err);
      });
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#8ec5fc', '#e0c3fc']} style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.headerText}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#aaa"
            onChangeText={text => setFormData({...formData, email: text})}
            value={formData.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={text => setFormData({...formData, password: text})}
            value={formData.password}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotScreen')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.linkText}>Create an Account</Text>
            </TouchableOpacity>
          </View>
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
  loginContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4a00e0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#4a00e0',
    fontSize: 16,
  },
});

export default LoginScreen;
