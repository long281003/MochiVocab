import axios from 'axios';

// Tạo instance Axios
const api = axios.create({
  baseURL: '/api', // Sử dụng tiền tố proxy
});

export default api;