import React from 'react';

const HomePage = () => {
    return (
        <div className="container mt-5 text-center">
            <h1>Welcome to the Recipe Management System</h1>
            <p className="lead mt-3">
                Easily create, manage, and share your favorite recipes with others.
            </p>
            {/* <img 
                src="https://via.placeholder.com/600x300"
                alt="Delicious Recipes"
                className="img-fluid mt-4"
                style={{ borderRadius: '12px' }}
            /> */}
        </div>
    );
};

export default HomePage;
