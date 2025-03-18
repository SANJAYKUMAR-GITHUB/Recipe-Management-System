// import axios from 'axios';

// const API_URL = 'http://localhost:5116/api/recipes';

// // ✅ Fetch All Recipes
// export const getAllRecipes = async () => {
//     const response = await axios.get(`${API_URL}/all`);
//     return response.data;
// };

// // ✅ Fetch Recipes by User
// export const getUserRecipes = async (userId) => {
//     const response = await axios.get(`${API_URL}/user/${userId}`);
//     return response.data;
// };

// // ✅ Add Recipe
// export const addRecipe = async (formData) => {
//     try {
//         const response = await axios.post(`${API_URL}/add`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error adding recipe:', error.response?.data || error.message);
//         throw error;
//     }
// }

// // ✅ Edit Recipe
// export const editRecipe = async (id, formData) => {
//     try {
//         const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error editing recipe:', error.response?.data || error.message);
//         throw error;
//     }
// };

// // ✅ Delete Recipe
// export const deleteRecipe = async (id, userId) => {
//     const response = await axios.delete(`${API_URL}/delete/${id}?userId=${userId}`);
//     return response.data;
// };



import axios from 'axios';

const API_URL = 'http://localhost:5116/api/recipes';

const RecipeService = {
    getAllRecipes:async()=>{
        const response = await axios.get(`${API_URL}/all`);
        return response.data;

    },
    getUserRecipes:async(userId)=>{
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;

    },

    addRecipe: async (recipeData) => {
        const token = localStorage.getItem('token'); // Assuming you store token after login
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post(`${API_URL}/add`, recipeData, config);
            return response.data;
        } catch (error) {
            console.error('Error adding recipe:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default RecipeService;