import axios from 'axios';

const axiosConfig = {
	baseURL: 'http://localhost:8000/api',
};

const http = axios.create(axiosConfig);
http.defaults.withCredentials = true;

export default http;