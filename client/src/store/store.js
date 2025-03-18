import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recipeReducer from './recipeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipeReducer
    }
});

export default store;
