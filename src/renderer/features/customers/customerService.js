import axios from 'axios';
const API_URL = 'http://localhost:5000/api/customers/';
// Register Users
const RegisterCustomer = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getFloorCustomers = async (FloorNumber) => {
  try {
    const response = await axios.get(API_URL + 'floorCustomers', {
      params: { floorNumber: FloorNumber },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// Get Sent Customers
const getSentCustomers = async () => {
  try {
    const response = await axios.get(API_URL + 'sentCustomers', {
      params: { Sent: true },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// Get Waiting Customers
const getWaitingCustomers = async () => {
  try {
    const response = await axios.get(API_URL + 'waitingCustomers', {
      params: { Sent: false },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// Get Scheduled Customers
const getScheduledCustomers = async () => {
  try {
    const response = await axios.get(API_URL + 'ScheduledCustomers');
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// Update Customer
const updateCustomer = async (userData) => {
  try {
    const response = await axios.put(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const CustomerService = {
  RegisterCustomer,
  getCustomers,
  getFloorCustomers,
  updateCustomer,
  getSentCustomers,
  getWaitingCustomers,
  getScheduledCustomers,
};
export default CustomerService;
