import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlogPosts from '../../components/BlogPostComponents/BlogPosts';
import BlogDetails from '../../components/BlogDetails/BlogDetails';
import EditBlogDetails from '../../components/EditBlogDetails/EditBlogDetails';

const PostStacks = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Posts'}>
      <Stack.Screen
        name="Posts"
        component={BlogPosts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBlogs"
        component={EditBlogDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PostStacks;
