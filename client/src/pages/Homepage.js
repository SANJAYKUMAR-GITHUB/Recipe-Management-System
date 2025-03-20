import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaUtensils, FaClipboardList, FaHeart } from 'react-icons/fa';

const HomePage = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center mb-5">
                <Col>
                    <h1 style={{ color: '#5e60ce', fontWeight: 'bold' }}>
                        Welcome to the Recipe Management System
                    </h1>
                    <p className="lead mt-3">
                        Discover, Create, and Share your favorite recipes share your favorite recipes with others!
                    </p>
                </Col>
            </Row>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <FaUtensils size={50} color="#5e60ce" className="mb-3" />
                            <h4>Create Recipes</h4>
                            <p>
                                Easily add new recipes with ingredients, instructions, and images.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <FaClipboardList size={50} color="#5e60ce" className="mb-3" />
                            <h4>Manage Recipes</h4>
                            <p>
                                Edit, update, or delete your recipes anytime with ease.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <FaHeart size={50} color="#5e60ce" className="mb-3" />
                            <h4>Discover Recipes</h4>
                            <p>
                                Explore recipes shared by other users to try something new.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="text-center mt-5">
                <Col>
                    <h3 style={{ color: '#5e60ce' }}>Get Started Today!</h3>
                    <p>Sign up now and start managing your favorite recipes with ease.</p>
                    <Button 
                        variant="primary" 
                        href="/register"
                        style={{ backgroundColor: '#5e60ce', border: 'none', padding: '10px 30px' }}
                    >
                        Register Now
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;

