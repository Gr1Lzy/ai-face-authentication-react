import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import AuthForm from './AuthForm';
import { AuthService } from '../services/AuthService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [useCamera, setUseCamera] = useState(false);
    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleLogin = async (credentials) => {
        try {
            const response = await AuthService.login(credentials);
            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials and try again.');
        }
    };

    const handleLoginByFace = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);
        try {
            const response = await AuthService.loginByFace(formData);
            console.log('Login by face successful:', response.data);

            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
        } catch (error) {
            console.error('Login by face failed:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('User not found or you are not registered.');
            } else {
                setErrorMessage('An error occurred during face login.');
            }
        }
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
                setFile(file);

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            });
    };

    return (
        <div className="container">
            {errorMessage && <div className="message">{errorMessage}</div>}
            <div className="face-login-box">
                <h3>Login by Face</h3>
                <form onSubmit={handleLoginByFace}>
                    <input
                        type="file"
                        name="photo"
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <button
                        type="button"
                        className="camera-button"
                        onClick={() => setUseCamera(!useCamera)}
                    >
                        {useCamera ? "Close Camera" : "Open Camera"}
                    </button>
                    {useCamera && (
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width="100%"
                            />
                            <button
                                type="button"
                                className="camera-button"
                                onClick={handleCapture}
                            >
                                Capture Photo
                            </button>
                        </>
                    )}
                    <button type="submit">Login by Face</button>
                </form>
            </div>
            <AuthForm onSubmit={handleLogin} isRegister={false} />
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginPage;
