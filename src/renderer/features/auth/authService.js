import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users/';
// Register Users
const register = async (userData) => {
  try {
    console.log('here is the messsage in CusomerService', userData);
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      //localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log('this is the error', error);
    throw error;
  }
};
// To login users
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// To get FLoor Receptionists
const getFloorReceptionists = async () => {
  try {
    const response = await axios.get(API_URL + 'floorReceptionists', {
      params: { roles: 4800 },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// To get all Users
const getUsers = async () => {
  try {
    const response = await axios.get(API_URL + 'getUsers');
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// To update the latest message of of receptionists
const updateLatestMessage = async (latestMessage) => {
  try {
    const response = await axios.put(API_URL + 'latestMessage', latestMessage);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// To Change Password
const ChangePassword = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'ChangePassword', userData);

    if (response.data) {
      //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// To Reset Password
const ResetPassword = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'ResetPassword', userData);

    if (response.data) {
      //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// To logout users
const logout = async () => {
  try {
    sessionStorage.removeItem('user');
  } catch (error) {
    throw error;
  }
};
const authService = {
  register,
  getFloorReceptionists,
  updateLatestMessage,
  login,
  logout,
  ChangePassword,
  getUsers,
  ResetPassword,
};
export default authService;
