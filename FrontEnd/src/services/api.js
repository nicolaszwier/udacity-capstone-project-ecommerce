import axios from 'axios';

let token = localStorage.getItem('token');

const api = axios.create({
    // baseURL: 'http://127.0.0.1:5000',
    baseURL: 'https://capstone-project-ecommerce.herokuapp.com',
    headers: { 'Authorization': `Bearer ${token}` }
})

export default api