import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const AuthForm = ({ onSubmit, isRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [file, setFile] = useState(null);
    const [useCamera, setUseCamera] = useState(false);
    const webcamRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = {
            email,
            password,
            repeatPassword,
            firstName,
            lastName
        };
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(userDetails)], { type: 'application/json' }));
        formData.append('photo', file);
        onSubmit(formData);
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
                setFile(file);
            });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isRegister && (
                    <>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
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
                    </>
                )}
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
