import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutPageCss.css'

const AboutUsPage = () => {
    return (
        <Container className="about-us-container mt-5 text-center">
            <h1 className="mb-4">About Us</h1>

            {/* Introduction Section */}
            <Row className="mb-5">
                <Col md={12}>
                    <Card className="intro-card shadow-lg p-4">
                        <h3 className="text-primary">Welcome to the Recipe Management System</h3>
                        <p>
                            Our platform empowers cooking enthusiasts to easily create, manage, and share 
                            their favorite recipes with the world. Whether you're a professional chef or a home cook, 
                            this system will simplify your recipe management process.
                        </p>
                    </Card>
                </Col>
            </Row>

            {/* How It Works Section */}
            <Row className="mb-5">
                <Col md={6}>
                    <Card className="feature-card shadow p-4">
                        <h4 className="text-success">🔍 Discover Recipes</h4>
                        <p>
                            Browse a wide variety of delicious recipes shared by others. Filter by category, 
                            ingredients, or user to find exactly what you need.
                        </p>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="feature-card shadow p-4">
                        <h4 className="text-warning">📝 Create & Manage</h4>
                        <p>
                            Easily add new recipes with images, ingredients, and step-by-step instructions. 
                            Manage your creations by editing or deleting them as needed.
                        </p>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <Card className="feature-card shadow p-4">
                        <h4 className="text-info">📂 Your Recipes Section</h4>
                        <p>
                            Stay organized by accessing your personal recipe collection.  
                            Keep track of your creations with ease.
                        </p>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="feature-card shadow p-4">
                        <h4 className="text-danger">⚙️ Real-Time Updates</h4>
                        <p>
                            Thanks to SignalR integration, recipe changes are updated instantly — 
                            ensuring you always stay in sync with the latest updates.
                        </p>
                    </Card>
                </Col>
            </Row>

            {/* Who It's For Section */}
            <Row className="mb-5">
                <Col md={12}>
                    <Card className="target-audience-card shadow-lg p-4">
                        <h3 className="text-dark">Who Can Benefit from This System?</h3>
                        <ul className="text-start mt-3">
                            <li><strong>Home Cooks:</strong> Organize your personal collection of family recipes.</li>
                            <li><strong>Food Bloggers:</strong> Showcase your recipes with step-by-step instructions and images.</li>
                            <li><strong>Professional Chefs:</strong> Manage a growing library of dishes for personal or professional use.</li>
                            <li><strong>Cooking Enthusiasts:</strong> Explore new recipes and share your cooking ideas with the community.</li>
                        </ul>
                    </Card>
                </Col>
            </Row>

            {/* Closing Message */}
            <Row className="text-center">
                <Col>
                    <h4 className="text-primary">🥘 Start Cooking with Confidence Today! 🍳</h4>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUsPage;
