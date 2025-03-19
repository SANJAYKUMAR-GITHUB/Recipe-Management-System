// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// const Footer = () => {
//     return (
//         <footer className="bg-dark text-white py-4 mt-5">
//             <Container>
//                 <Row>
//                     {/* About Section */}
//                     <Col md={4} className="mb-3 mb-md-0">
//                         <h5>About Recipe Management System</h5>
//                         <p>
//                             This platform allows you to create, manage, and explore amazing recipes shared by other users. 
//                             Stay organized and inspired with your favorite dishes!
//                         </p>
//                     </Col>

//                     {/* Quick Links Section */}
//                     <Col md={4} className="mb-3 mb-md-0">
//                         <h5>Quick Links</h5>
//                         <ul className="list-unstyled">
//                             <li><a href="/" className="text-white text-decoration-none">Home</a></li>
//                             <li><a href="/about-us" className="text-white text-decoration-none">About Us</a></li>
//                             <li><a href="/contact-us" className="text-white text-decoration-none">Contact Us</a></li>
//                             <li><a href="/register" className="text-white text-decoration-none">Register</a></li>
//                             <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
//                         </ul>
//                     </Col>

//                     {/* Contact Section */}
//                     <Col md={4}>
//                         <h5>Contact Us</h5>
//                         <p>Email: support@recipesystem.com</p>
//                         <p>Phone: +123 456 7890</p>
//                         <p>Address: 123 Recipe St, Food City, USA</p>
//                     </Col>
//                 </Row>

//                 {/* Copyright */}
//                 <Row className="mt-4 text-center">
//                     <Col>
//                         <p className="mb-0">&copy; {new Date().getFullYear()} Recipe Management System. All Rights Reserved.</p>
//                     </Col>
//                 </Row>
//             </Container>
//         </footer>
//     );
// };

// export default Footer;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    {/* About Section */}
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>About Recipe Management System</h5>
                        <p>
                            This platform allows you to create, manage, and explore amazing recipes shared by other users. 
                            Stay organized and inspired with your favorite dishes!
                        </p>
                    </Col>

                    {/* Quick Links Section */}
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            
                            <li><Link to="/about-us" className="text-white text-decoration-none">About Us</Link></li>
                            <li><Link to="/contact-us" className="text-white text-decoration-none">Contact Us</Link></li>
                            
                            {/* Conditional Rendering for Register & Login */}
                             {/* Conditional Rendering for Quick Links */}
                             {isLoggedIn ? (
                                <>
                                    <li><Link to="/all-recipes" className="text-white text-decoration-none">All Recipes</Link></li>
                                    <li><Link to="/your-recipes" className="text-white text-decoration-none">Your Recipes</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                                    <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
                                    <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                                </>
                            )}
                        </ul>
                    </Col>

                    {/* Contact Section */}
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: <a href="mailto:support@recipesystem.com" className="text-white">support@recipesystem.com</a></p>
                        <p>Phone: +123 456 7890</p>
                        <p>Address: 123 Recipe St, Food City, USA</p>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="mt-4 text-center">
                    <Col>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Recipe Management System. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
