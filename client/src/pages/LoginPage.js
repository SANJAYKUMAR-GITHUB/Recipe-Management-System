import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye,FaEyeSlash } from 'react-icons/fa';

const LoginPage = ({ setIsLoggedIn, setUsername }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

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
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userId', id);

                navigate('/all-recipes');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container 
        className="d-flex justify-content-center align-items-center" 
        style={{ height: '80vh', paddingTop: '0px' }} // Reduced top padding
        >

            <Card style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }} className="p-4">
                <h2 className="text-center mb-4" style={{ color: '#5e60ce' }}>Login</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label><FaEnvelope className="me-2" /> Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3 position-relative">
                        <Form.Label>
                            <FaLock className="me-2" /> Password
                        </Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                                
                                {showPassword ? (
                                <FaEye
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="position-absolute"
                                    style={{
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#5e60ce'
                                    }}
                                />
                                ) : (
                                <FaEyeSlash
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="position-absolute"
                                    style={{
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#5e60ce'
                                    }}
                                />
                            )}
                        </div>
                    </Form.Group>

                    <Button
                        type="submit"
                        style={{
                            backgroundColor: '#5e60ce',
                            border: 'none',
                            width: '100%',
                            padding: '10px 0'
                        }}
                        className="mt-3"
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginPage;
