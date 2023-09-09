import axios from 'axios';
const API_URL = 'http://localhost:5000/api/floors/';

const RegisterFloor = async (floor) => {
  try {
    const response = await axios.post(API_URL, floor);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const FloorService = {
  RegisterFloor,
};
export default FloorService;
