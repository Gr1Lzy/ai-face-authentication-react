import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { AuthService } from '../services/AuthService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleLogin = async (credentials) => {
        try {
            const response = await AuthService.login(credentials);
            console.log('Login successful:', response.data);

            // Save the token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLoginByFace = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);
        try {
            const response = await AuthService.loginByFace(formData);
            console.log('Login by face successful:', response.data);

            // Save the token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login by face failed:', error);
        }
    };

    return (
        <div className="container">
            <div className="face-login-box">
                <h3>Login by Face</h3>
                <form onSubmit={handleLoginByFace}>
                    <input
                        type="file"
                        name="photo"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <button type="submit">Login by Face</button>
                </form>
            </div>
            <AuthForm onSubmit={handleLogin} isRegister={false} />
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginPage;
