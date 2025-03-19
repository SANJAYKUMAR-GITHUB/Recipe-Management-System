import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock,FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5116/api/auth/register', formData);

            if (response.data.success) {
                alert('Registration Successful');
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || 'Network Error');
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <Container 
        className="d-flex justify-content-center align-items-center" 
        style={{ height: '90vh', paddingTop: '0px' }} // Reduced top padding
        >

            <Card style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }} className="p-4">
                <h2 className="text-center mb-4" style={{ color: '#5e60ce' }}>Register</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><FaUser className="me-2" /> Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><FaEnvelope className="me-2" /> Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
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
                        Register
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default RegisterPage;
