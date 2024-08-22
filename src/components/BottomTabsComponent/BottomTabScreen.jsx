import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreenComponents/HomeScreen';
import SettingScreen from '../SettingScreenComponents/SettingScreen';
import UserProfileScreen from '../UserProfileComponents/UserProfileScreen';
import MoreScreen from '../MoreScreenComponents/MoreScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TodoList from '../BlogPostComponents/BlogPosts';
import HomeStack from '../Stacks/HomeStack';
import SettingStack from '../Stacks/SettingStack';
import BlogPosts from '../BlogPostComponents/BlogPosts';
import PostStacks from '../../Stacks/PostStacks/PostStacks';
const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AntDesign color={color} name={'home'} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="PostStack"
        component={PostStacks}
        options={{
          headerShown: false,
          title: 'Posts',
          tabBarIcon: ({color}) => (
            <MaterialIcons color={color} name={'dynamic-feed'} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AntDesign color={color} name={'user'} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
