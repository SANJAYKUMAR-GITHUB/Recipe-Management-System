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