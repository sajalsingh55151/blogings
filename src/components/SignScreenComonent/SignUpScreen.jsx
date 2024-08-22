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
import Entypo from 'react-native-vector-icons/Entypo';
import {signUp} from '../../API/endpoints';
import {showMessage} from 'react-native-flash-message';

const SignUpScreen = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    try {
      const res = await signUp(formData);
      console.log(res.data, 'res is coming');
      const {message} = res.data;
      const {status} = res;
      if (message && status == 201) {
        showMessage({
          message: message,
          style: {
            backgroundColor: 'green',
          },
        });
      }
      if (message && status == 200) {
        showMessage({
          titleStyle: {
            color: 'red',
          },
          message: message,
          style: {
            backgroundColor: 'yellow',
          },
        });
      }
      console.log(`Message: ${message}, Status: ${status}`);
    } catch (err) {
      showMessage({
        message: 'something went wrong',
        style: {
          backgroundColor: 'black',
        },
      });
      console.log(JSON.stringify(err, null, 2), 'ekskjfb');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#8ec5fc', '#e0c3fc']} style={styles.container}>
        <View style={styles.signUpContainer}>
          <Text style={styles.headerText}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            onChangeText={text => setFormData({...formData, userName: text})}
            value={formData.userName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={text => setFormData({...formData, email: text})}
            value={formData.email}
          />
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={hidePassword}
              onChangeText={text => setFormData({...formData, password: text})}
              value={formData.password}
            />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={{position: 'absolute', top: 10, right: 10}}>
              {hidePassword ? (
                <Entypo name="eye-with-line" color="black" size={25} />
              ) : (
                <Entypo name="eye" color="black" size={25} />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={text =>
              setFormData({...formData, confirmPassword: text})
            }
            value={formData.confirmPassword}
          />
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => handleSignUp()}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.linkText}>
                Already have an account? Login
              </Text>
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
  signUpContainer: {
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
  signUpButton: {
    backgroundColor: '#4a00e0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#4a00e0',
    fontSize: 16,
  },
});

export default SignUpScreen;
