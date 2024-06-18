import axios from 'axios';
import config from '../config/config';

const AUTH_SERVICE = config.getMovieService();

export const AuthService = {
    async register(formData) {
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    async login(requestLoginDto) {
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/login`, requestLoginDto);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    async loginByFace(formData) {
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/login/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Login by face failed:', error);
            throw error;
        }
    },

    async getUserDetails() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${AUTH_SERVICE}/auth/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            throw error;
        }
    }
};
