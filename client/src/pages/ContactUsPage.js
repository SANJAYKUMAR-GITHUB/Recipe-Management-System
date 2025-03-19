import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './ContactUsPage.css';

const ContactUsPage = () => {
    return (
        <div className="contact-container">
            <div className="contact-card">
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-description">
                    We'd love to hear from you! Reach out to us with any questions, feedback, or recipe ideas.
                </p>

                <div className="contact-details">
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <a href="mailto:support@recipemgmt.com">support@recipemgmt.com</a>
                    </div>

                    <div className="contact-item">
                        <FaPhoneAlt className="contact-icon" />
                        <span>+1 (234) 567-8900</span>
                    </div>
                </div>

                <div className="social-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="social-icon facebook" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon instagram" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="social-icon twitter" />
                        </a>
                    </div>
                </div>

                <div className="contact-footer">
                    <p>Our support team is available 24/7. We're here to help!</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
