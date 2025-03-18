// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './RecipeDetailsModal.css'; // Add this for styling

// const AllRecipesPage = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [selectedRecipe, setSelectedRecipe] = useState(null); // State for selected recipe details

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const response = await axios.get('http://localhost:5116/api/recipes/all');
//             setRecipes(response.data);
//         };
//         fetchRecipes();
//     }, []);

//     const handleRecipeClick = (recipe) => {
//         setSelectedRecipe(recipe);
//     };

//     const closeDetails = () => {
//         setSelectedRecipe(null);
//     };

//     return (
//         <div className="container mt-4">
//             <h2>All Recipes</h2>
//             <p>
//                 If you need to add a new recipe,{' '}
//                 <Link to="/add-recipe" className="btn btn-success mb-3">Add New Recipe</Link>
//             </p>

//             <div className="row">
//                 {recipes.map(recipe => (
//                     <div
//                         key={recipe.id}
//                         className="col-md-4 mb-4"
//                         onClick={() => handleRecipeClick(recipe)}
//                     >
//                         <div className="card">
//                             {recipe.image && (
//                                 <img
//                                     src={`data:image/png;base64,${recipe.image}`}
//                                     className="card-img-top"
//                                     alt={recipe.title}
//                                 />
//                             )}
//                             <div className="card-body">
//                                 <h5 className="card-title">{recipe.title}</h5>
//                                 <p className="card-text">{recipe.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Recipe Details Popup */}
//             {selectedRecipe && (
//                 <div className="recipe-details-modal">
//                     <div className="modal-content">
//                         <h3>{selectedRecipe.title}</h3>
//                         {selectedRecipe.image && (
//                             <img
//                                 src={`data:image/png;base64,${selectedRecipe.image}`}
//                                 alt={selectedRecipe.title}
//                                 className="modal-image"
//                             />
//                         )}
//                         <p><strong>Description:</strong> {selectedRecipe.description}</p>
//                         <p><strong>Category:</strong> {selectedRecipe.category}</p>
//                         <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
//                         <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
//                         <p><strong>Created by:</strong> {selectedRecipe.username}</p>
//                         <button className="btn btn-secondary" onClick={closeDetails}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllRecipesPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetailsModal.css'; // Correctly styled modal

const AllRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios.get('http://localhost:5116/api/recipes/all');
            setRecipes(response.data);
        };
        fetchRecipes();
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeDetails = () => {
        setSelectedRecipe(null);
        document.body.style.overflow = 'auto'; // Re-enable scrolling after closing
    };

    return (
        <div className="container mt-4">
            <h2>All Recipes</h2>
            <p>
                If you need to add a new recipe,{' '}
                <Link to="/add-recipe" className="btn btn-success mb-3">Add New Recipe</Link>
            </p>

            <div className="row">
                {recipes.map(recipe => (
                    <div
                        key={recipe.id}
                        className="col-md-4 mb-4"
                        onClick={() => handleRecipeClick(recipe)}
                    >
                        <div className="card">
                            <img
                                src={`data:image/png;base64,${recipe.image || ''}`}
                                className="card-img-top"
                                alt={recipe.title}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <p className="card-text">{recipe.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
                        <p className="recipe-text"><strong>Description:</strong> {selectedRecipe.description}</p>
                        <p className="recipe-text"><strong>Category:</strong> {selectedRecipe.category}</p>
                        <p className="recipe-text"><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                        <p className="recipe-text"><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
                        <button className="close-button" onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRecipesPage;
