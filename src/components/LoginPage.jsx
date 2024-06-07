import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import AuthForm from './AuthForm';
import { AuthService } from '../services/AuthService';

const LoginPage = () => {
    const navigate = useNavigate();

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

    const handleLoginByFace = async (formData) => {
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
        <div>
            <AuthForm onSubmit={handleLogin} isRegister={false} />
            <div className="container">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <h3>Login by Face</h3>
                <form onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('file', e.target.file.files[0]);
                    handleLoginByFace(formData);
                }}>
                    <input type="file" name="file" required />
                    <button type="submit">Login by Face</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
