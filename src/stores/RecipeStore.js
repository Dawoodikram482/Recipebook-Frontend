import { defineStore } from 'pinia';
import axios from '../axios-auth';

export const useRecipeStore = defineStore({
    id: 'recipe',
    state: () => ({
        recipes: [],
        recipesLoading: false,
        error: null,
    }),
    actions: {
        async fetchRecipesByCategory(category) {
            this.recipesLoading = true; // Start loading
            try {
                const response = await axios.get('recipes/category', {
                    params: { category },
                });
                this.recipes = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching recipes:', error);
                this.error = error.response?.data || 'Unknown error occurred';
            } finally {
                this.recipesLoading = false; // End loading
            }
        },
    },
});
