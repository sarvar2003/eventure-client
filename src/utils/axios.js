import axios from "axios";
import Cookies from "js-cookie";

const baseURL = 'http://localhost:8000/';

const token = Cookies.get('token');

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: token ? `Token ${token}` : '',
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			alert('Network/server error. Check CORS or server connection.');
			return Promise.reject(error);
		}

		if (error.response.status === 401) {
			console.warn('Unauthorized — redirecting to login.');
			window.location.href = '/login';
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
