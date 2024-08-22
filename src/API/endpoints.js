import axios from 'axios';
import {API_BASE_URL} from '../utils/extras';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(async req => {
  const token = await AsyncStorage.getItem('token');
  req.headers.Authorization = `Bearer ${token}`;
  console.log(req, 'dasjdbja');
  if (req.data instanceof FormData) {
    req.headers['Content-Type'] = 'multipart/form-data';
  } else {
    req.headers['Content-Type'] = 'application/json';
  }
  req.headers.Accept = 'application/json';

  const printable = `${new Date()} | Request: ${req.method.toUpperCase()} | ${
    req.url
  } | ${JSON.stringify(req.data)} | ${JSON.stringify(req.headers)}`;
  console.log(printable);

  return req;
});

API.interceptors.response.use(
  async res => res,
  error => {
    if (error.response?.status === 401) {
      AsyncStorage.clear();
    }
    return Promise.reject(error);
  },
);

export const signUp = formData => API.post('/auth/signup', formData);

export const signIn = formData => API.post('/auth/login', formData);

export const getUserProfile = id => API.get(`/auth/profile/${id}`);

export const updateUserProfile = (formData, id) =>
  API.put(`/auth/profile/${id}`, formData);

export const createPost = formData => API.post('/posts', formData);

export const getPosts = () => API.get('/posts');

export const deletePosts = id => API.delete(`/posts/${id}`);
export const updateLike = (formData, id) => API.patch(`/posts/${id}`, formData);

export const addComments = (formData, id) =>
  API.post(`/posts/${id}/comments`, formData);

export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comments/${commentId}`);

export const getBlogDetails = id => API.get(`/posts/${id}`);

export const updateBlog = (id, formData) => API.put(`posts/${id}`, formData);

export const updateProfilePhoto = (id, formData) =>
  API.patch(`auth/profile/${id}`, formData);
