// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import * as signalR from '@microsoft/signalr';

// const YourRecipesPage = () => {
//     const [recipes, setRecipes] = useState([]);
//     const userId = localStorage.getItem('userId');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserRecipes = async () => {
//             try {
//                 const response = await axios.get(http://localhost:5116/api/recipes/user/${userId});
//                 setRecipes(response.data);
//             } catch (error) {
//                 console.error('Error fetching your recipes:', error);
//             }
//         };

//         fetchUserRecipes();

//         // SignalR Connection Setup
//         const connection = new signalR.HubConnectionBuilder()
//             .withUrl('http://localhost:5116/recipeHub')
//             .withAutomaticReconnect()
//             .build();

//         connection.start().catch(err => console.error('SignalR Connection Error:', err));

//         // Listen for Recipe Updates
//         connection.on('ReceiveRecipeUpdate', () => {
//             fetchUserRecipes(); // Refresh data when an update occurs
//         });

//         return () => connection.stop(); // Cleanup connection on component unmount
//     }, []);

//     // Handle Recipe Deletion
//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this recipe?')) {
//             try {
//                 await axios.delete(http://localhost:5116/api/recipes/${id});

//                 // Update recipes state after successful deletion
//                 setRecipes(recipes.filter(recipe => recipe.id !== id));

//                 alert('Recipe deleted successfully!');
//             } catch (error) {
//                 console.error('Error deleting recipe:', error);
//                 alert('Failed to delete recipe.');
//             }
//         }
//     };

//     // Handle Recipe Edit
//     // const handleEdit = async (id) => {
//     //     const updatedTitle = prompt('Enter new recipe title:');
//     //     if (!updatedTitle) return;

//     //     try {
//     //         const updatedRecipe = {
//     //             ...recipes.find(recipe => recipe.id === id),
//     //             title: updatedTitle
//     //         };

//     //         await axios.put(http://localhost:5116/api/recipes/${id}, updatedRecipe);

//     //         // Update recipes state after successful edit
//     //         setRecipes(recipes.map(recipe =>
//     //             recipe.id === id ? { ...recipe, title: updatedTitle } : recipe
//     //         ));

//     //         alert('Recipe updated successfully!');
//     //     } catch (error) {
//     //         console.error('Error updating recipe:', error);
//     //         alert('Failed to update recipe.');
//     //     }
//     // };
//     const handleEditRedirect = (recipe) => {
//         navigate('/edit-recipe', { state: { recipe } });
//     };


//     return (
//         <div className="container mt-4">
//             <h2>Your Recipes</h2>
//             {recipes.length === 0 ? (
//                 <p>No recipes found. Start by adding a new recipe!</p>
//             ) : (
//                 <div className="row">
//                     {recipes.map(recipe => (
//                         <div key={recipe.id} className="col-md-4 mb-4">
//                             <div className="card">
//                                 {recipe.image && (
//                                     <img
//                                         src={data:image/png;base64,${recipe.image}}
//                                         className="card-img-top"
//                                         alt={recipe.title}
//                                     />
//                                 )}
//                                 <div className="card-body">
//                                     <h5 className="card-title">{recipe.title}</h5>
//                                     <p className="card-text">{recipe.description}</p>
//                                     <p className="text-muted">Category: {recipe.category}</p>

//                                     {/* Edit and Delete Buttons */}
                                    
//                                      <button
//                                         className="btn btn-warning me-2"
//                                         onClick={() => handleEditRedirect(recipe)}
//                                     >
//                                         Edit
//                                     </button>

//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() => handleDelete(recipe.id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };


// export default YourRecipesPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import './RecipeDetailsModal.css'; // Updated modal styling

const YourRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5116/api/recipes/user/${userId}`);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching your recipes:', error);
            }
        };

        fetchUserRecipes();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5116/recipeHub')
            .withAutomaticReconnect()
            .build();

        connection.start().catch(err => console.error('SignalR Connection Error:', err));

        connection.on('ReceiveRecipeUpdate', () => {
            fetchUserRecipes();
        });

        return () => connection.stop();
    }, []);
        const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5116/api/recipes/${id}`);
                setRecipes(recipes.filter(recipe => recipe.id !== id));
                alert('Recipe deleted successfully!');
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert('Failed to delete recipe.');
            }
        }
    };

    const handleEditRedirect = (recipe) => {
        navigate('/edit-recipe', { state: { recipe } });
    };

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
            <h2>Your Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes found. Start by adding a new recipe!</p>
            ) : (
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
                                    
                                    <button
                                         className="btn btn-warning me-2"
                                         onClick={() => handleEditRedirect(recipe)}>
                                         Edit
                                     </button>

                                     <button
                                        className="btn btn-danger"
                                         onClick={() => handleDelete(recipe.id)}>
                                         Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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

export default YourRecipesPage;
