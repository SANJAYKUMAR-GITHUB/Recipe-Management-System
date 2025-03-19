import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaImage, FaCheckCircle, FaEdit, FaPlusCircle } from 'react-icons/fa';

const RecipeForm = ({ userEmail }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        ingredients: '',
        instructions: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const existingRecipe = location.state?.recipe;
    const isEditing = !!existingRecipe;
    

    useEffect(() => {
        if (isEditing && existingRecipe) {
            setFormData({
                title: existingRecipe.title || '',
                description: existingRecipe.description || '',
                category: existingRecipe.category || '',
                ingredients: existingRecipe.ingredients || '',
                instructions: existingRecipe.instructions || '',
                image: null
            });

            // Load existing image preview if available
            if (existingRecipe.image) {
                setImagePreview(`data:image/jpeg;base64,${existingRecipe.image}`);
            }
        }
    }, [isEditing, existingRecipe]);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0); // Reset scroll position
            document.body.style.overflow = 'auto'; // Ensures scrolling is re-enabled
        }, 100); // Delay ensures the DOM finishes rendering
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Show image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('Title', formData.title);
        data.append('Description', formData.description);
        data.append('Category', formData.category);
        data.append('Ingredients', formData.ingredients);
        data.append('Instructions', formData.instructions);
        data.append('UserEmail', userEmail);

        if (formData.image) {
            data.append('Image', formData.image);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5116/api/recipes/${existingRecipe.id}`, data);
                alert('Recipe updated successfully!');
            } else {
                const response = await axios.post('http://localhost:5116/api/recipes/add', data);
                alert(response.data.message);
            }
            navigate('/your-recipes');
        } catch (error) {
            alert('Error adding recipe: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="text-center mb-4 text-primary">
                    {isEditing ? <FaEdit className="me-2" /> : <FaPlusCircle className="me-2" />}
                    {isEditing ? 'Edit Recipe' : 'Add Recipe'}
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter recipe title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Add a brief description"
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            className="form-control"
                            onChange={handleChange}
                            placeholder="e.g., Appetizer, Dessert, etc."
                            required
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Ingredients:</label>
                        <textarea
                            name="ingredients"
                            value={formData.ingredients}
                            className="form-control"
                            onChange={handleChange}
                            placeholder="List ingredients here"
                        ></textarea>
                    </div>

                    {/* Instructions */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Instructions:</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Step-by-step instructions"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">
                            <FaImage className="me-2" />
                            Upload Image (Optional):
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            onChange={handleImageChange}
                            accept="image/*"
                        />

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-3 text-center">
                                <img
                                    src={imagePreview}
                                    alt="Recipe Preview"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} w-100 mt-3`}
                    >
                        {isEditing ? (
                            <>
                                <FaEdit className="me-2" /> Update Recipe
                            </>
                        ) : (
                            <>
                                <FaCheckCircle className="me-2" /> Add Recipe
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
