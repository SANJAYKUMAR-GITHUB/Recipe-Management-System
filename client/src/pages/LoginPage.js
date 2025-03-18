import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn, setUsername}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5116/api/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                const { username, email: userEmail, id } = response.data.user;

                setIsLoggedIn(true);
                setUsername(username);

                // Store user session data in local storage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userEmail', userEmail); // Fixed this as requested
                localStorage.setItem('userId', id);
                // setIsLoggedIn(true);
                // setUsername(response.data.user.username);
                // setUserEmail(response.data.user.email);

                // // Store user session data
                // localStorage.setItem('isLoggedIn', 'true');
                // localStorage.setItem('username', response.data.user.username);
                // localStorage.setItem('userEmail', response.data.user.email);

                navigate('/all-recipes');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
