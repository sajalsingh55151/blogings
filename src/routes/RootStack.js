import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../components/WelcomeComponents/WelcomeScreen';
import LoginScreen from '../components/LoginScreenComponent/LoginScreen';
import SignUpScreen from '../components/SignScreenComonent/SignUpScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordComponent/ForgotPasswordScreen';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import BottomTabScreen from '../components/BottomTabsComponent/BottomTabScreen';
import DetailsScreen from '../components/HomeScreenComponents/DetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState('');
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const getToken = async () => {
    try {
      const storeToken = await AsyncStorage.getItem('token');
      if (Boolean(storeToken)) {
        setToken(storeToken);
      } else {
        console.log('Token does not exists');
      }
    } catch (err) {
      console.log('error during the getting the token');
    } finally {
      setTokenLoaded(true);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
    if (!tokenLoaded) {
      return null;
    }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'BottomTab' : 'LoginScreen'}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
