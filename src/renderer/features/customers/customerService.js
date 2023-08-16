import axios from 'axios';
const API_URL = 'http://localhost:5000/api/customers/';
// Register Users
const RegisterCustomer = async (userData) => {
  try {
    console.log('here is the messsage in authService', userData);
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
const CustomerService = {
  RegisterCustomer,
};
export default CustomerService;
