import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await AuthService.getUserDetails();
                setUser(userDetails);
            } catch (error) {
                navigate('/login');
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h1>Welcome, {user.firstName} {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DashboardPage;
