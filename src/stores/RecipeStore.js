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
        async fetchRecipes() {
            this.recipesLoading = true;
            try {
                console.log("Fetching recipes...");
                const response = await axios.get('/recipes/user');
                console.log("Fetched recipes:", response.data);
                this.recipes = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching recipes:', error);
                this.error = error.response?.data || 'Unknown error occurred';
            } finally {
                this.recipesLoading = false;
            }
        },
        async fetchRecipesByCategory(category) {
            this.recipesLoading = true;
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
                this.recipesLoading = false;
            }
        },
        async addRecipe(formData) {
            try {
                const response = await axios.post('/recipes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.recipes.push(response.data);
            } catch (error) {
                console.error('Failed to add recipe:', error);
                this.error = error.response?.data || 'Unknown error occurred';
                throw error;
            }
        },

        async updateRecipe(recipe) {
            try {
                const response = await axios.put(`/recipes/${recipe.RecipeId}`, recipe);
                const index = this.recipes.findIndex(r => r.id === recipe.RecipeId);
                if (index !== -1) {
                    this.recipes[index] = response.data;
                }
            } catch (error) {
                console.error('Failed to update recipe:', error);
                this.error = error.response?.data || 'Unknown error occurred';
            }
        },
        async deleteRecipe(id) {
            try {
                await axios.delete(`/recipes/${id}`);
                this.recipes = this.recipes.filter(recipe => recipe.id !== id);
            } catch (error) {
                console.error('Failed to delete recipe:', error);
                this.error = error.response?.data || 'Unknown error occurred';
            }
        },
    },
});
