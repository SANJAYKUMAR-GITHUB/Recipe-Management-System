import React, { useState, useEffect } from 'react';
import {Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AllRecipesPage from './pages/AllRecipesPage';
import YourRecipesPage from './pages/YourRecipesPage';
import RecipeForm from './components/RecipeForm';
import preventBackNavigation from './utils/preventBackNavigation';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const loggedInUserEmail = localStorage.getItem('userEmail');

    const location = useLocation();
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');

        if (storedLoginStatus === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);

            if (location.pathname === '/') {
                navigate('/all-recipes');
        }
    }
        preventBackNavigation();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
       <>
            <ScrollTop />
            <Navbar
                isLoggedIn={isLoggedIn}
                username={username}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/all-recipes"/>: <Homepage />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/all-recipes" element={isLoggedIn ? <AllRecipesPage /> : <Navigate to="/" />} />
                <Route path="/add-recipe" element={<RecipeForm userEmail={loggedInUserEmail} />} />
                <Route path="/your-recipes" element={isLoggedIn ? <YourRecipesPage /> : <Navigate to="/" />} />
                <Route path="/edit-recipe/" element={<RecipeForm/>}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
            </Routes>
            <Footer isLoggedIn={isLoggedIn} />
        </>
    );
}

export default App;
