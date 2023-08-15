import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users/';
// Register Users
const register = async (userData) => {
  console.log('here is the messsage in authService',userData);
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  register,
};
export default authService;
