import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { AuthService } from '../services/AuthService';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (userDetails) => {
        try {
            const response = await AuthService.register(userDetails);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return <AuthForm onSubmit={handleRegister} isRegister={true} />;
};

export default RegisterPage;
