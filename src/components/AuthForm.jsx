import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = new FormData();
        userDetails.append('email', email);
        userDetails.append('password', password);
        if (isRegister) {
            userDetails.append('repeatPassword', repeatPassword);
            userDetails.append('firstName', firstName);
            userDetails.append('lastName', lastName);
            userDetails.append('file', file);
        }
        onSubmit(userDetails);
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
                            required
                        />
                    </>
                )}
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default AuthForm;
