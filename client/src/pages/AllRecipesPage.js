import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetailsModal.css';
import './AllRecipesPage.css';
import { FaPlusCircle } from 'react-icons/fa';

const AllRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Filter & Search State
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchRecipes();
        fetchCategories();
    }, [category, search]); // Automatically updates recipes as you type or select a category

    // Fetch Recipes
    const fetchRecipes = async () => {
        try {
            const params = {};
            if (category) params.category = category;
            if (search) params.title = search;

            const response = await axios.get('http://localhost:5116/api/recipes/all', { params });
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5116/api/recipes/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="container mt-4">


            <div className="add-recipe-section">
                <div className="add-recipe-card">
                    <FaPlusCircle className="add-recipe-icon" />
                    <h4 className="add-recipe-title">Share Your Delicious Recipe!</h4>
                    <p className="add-recipe-text">Got a fantastic recipe to share? Click below to add it now!</p>
                    <Link to="/add-recipe" className="btn btn-primary add-recipe-btn">
                        Add New Recipe
                    </Link>
                </div>
            </div>

            <h2>All Recipes</h2>
            {/* Filter Section */}
            <div className="filters mb-4">
    
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="🔎 Search for delicious recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category Dropdown */}
            <div className="category-select">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
            
                  <option value="">🍽️ All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
        </div>

            {/* Recipes Grid */}
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div
                        key={recipe.id}
                        className="recipe-card"
                        onClick={() => setSelectedRecipe(recipe)}
                    >
                        <img
                            src={`data:image/png;base64,${recipe.image || ''}`}
                            className="recipe-image"
                            alt={recipe.title}
                        />
                        <div className="recipe-info">
                            <h5>{recipe.title}</h5>
                            <p>{recipe.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Recipes Found */}
            {recipes.length === 0 && (
                <div className="alert alert-warning text-center">
                    No recipes found matching your criteria.
                </div>
            )}

            {/* Recipe Details Modal */}
            {selectedRecipe && (
                <div className="recipe-details-modal">
                    <div className="modal-content">
                        <h3 className="recipe-title">{selectedRecipe.title}</h3>
                        {selectedRecipe.image && (
                            <img
                                src={`data:image/png;base64,${selectedRecipe.image}`}
                                alt={selectedRecipe.title}
                                className="modal-image"
                            />
                        )}
                        <p className="recipe-text">
                            <strong>Description:</strong> {selectedRecipe.description}
                        </p>
                        <p className="recipe-text">
                            <strong>Category:</strong> {selectedRecipe.category}
                        </p>
                        <p className="recipe-text">
                            <strong>Ingredients:</strong> {selectedRecipe.ingredients}
                        </p>
                        <p className="recipe-text">
                            <strong>Instructions:</strong> {selectedRecipe.instructions}
                        </p>

                        <button
                            className="close-button"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRecipesPage;
