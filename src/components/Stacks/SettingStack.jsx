import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SettingScreen from '../SettingScreenComponents/SettingScreen';
import DetailsScreen from '../HomeScreenComponents/DetailsScreen';

const SettingStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
