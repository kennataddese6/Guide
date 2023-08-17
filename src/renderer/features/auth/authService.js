import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users/';
// Register Users
const register = async (userData) => {
  try {
    console.log('here is the messsage in CusomerService', userData);
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log('this is the error', error);
    throw error;
  }
};
const authService = {
  register,
};
export default authService;
