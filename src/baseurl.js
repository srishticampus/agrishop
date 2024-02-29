import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://43.204.92.123:4009/agri_shop_api/', 
  baseURL: 'http://localhost:4009/agri_shop_api', 


  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
