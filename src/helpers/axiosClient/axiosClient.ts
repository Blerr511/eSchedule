import {API_URL} from '@env';
import {firebase} from '@react-native-firebase/auth';
import axios from 'axios';

const axiosClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosClient.interceptors.request.use(
	async config => {
		const user = firebase.auth().currentUser;
		if (!user) return config;
		const token = await user.getIdToken();
		config.headers.authorization = `Bearer ${token}`;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosClient;
