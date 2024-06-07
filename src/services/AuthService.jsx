import config from '../config/config';
import axios from 'axios';

export const AuthService = {
    async register(requestRegisterDto) {
        const AUTH_SERVICE = config.getMovieService();
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/register`, requestRegisterDto, {
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
        const AUTH_SERVICE = config.getMovieService();
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/login`, requestLoginDto);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    async loginByFace(formData) {
        const AUTH_SERVICE = config.getMovieService();
        try {
            return await axios.post(`${AUTH_SERVICE}/auth/loginByFace`, formData, {
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
        const AUTH_SERVICE = config.getMovieService();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${AUTH_SERVICE}/auth/me`, {
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
