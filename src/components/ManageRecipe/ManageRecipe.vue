<template>
  <div class="container mt-4">
    <h1>Manage Recipes</h1>

    <div v-if="feedbackMessage" :class="['alert', feedbackClass]" role="alert">
      {{ feedbackMessage }}
    </div>

    <button @click="showAddRecipeModal" class="btn btn-primary mb-3">Add Recipe</button>
    <table class="table table-bordered" v-if="!recipesLoading && recipes.length">
      <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Ingredients</th>
        <th>Instructions</th>
        <th>Images</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="recipe in recipes" :key="recipe.RecipeId">
        <td>{{ recipe.RecipeTitle }}</td>
        <td>{{ recipe.Category }}</td>
        <td>{{ recipe.Ingredients }}</td>
        <td>{{ recipe.Instructions }}</td>
        <td>
          <img :src="getBackendImageUrl(recipe.Image)" alt="Recipe Image" class="recipe-image" v-if="recipe.Image" />
        </td>
        <td>
          <button @click="showEditRecipeModal(recipe)" class="btn btn-sm btn-warning">Edit</button>
          <button @click="confirmDeleteRecipe(recipe.RecipeId)" class="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else-if="recipesLoading">Loading...</div>
    <div v-else>No recipes found.</div>

    <AddRecipeModal v-if="showAddModal" @close="showAddModal = false" @saved="handleSaved"/>
    <EditRecipeModal v-if="showEditModal" :recipe="currentRecipe" @close="showEditModal = false" @saved="handleSaved"/>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRecipeStore } from '@/stores/RecipeStore.js';
import AddRecipeModal from './AddRecipeModal.vue';
import EditRecipeModal from './EditRecipeModal.vue';

export default {
  name: 'ManageRecipe',
  components: {
    AddRecipeModal,
    EditRecipeModal,
  },
  setup() {
    const store = useRecipeStore();
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const currentRecipe = ref(null);
    const feedbackMessage = ref('');
    const feedbackClass = ref('');

    const setFeedbackMessage = (message, isSuccess = true) => {
      feedbackMessage.value = message;
      feedbackClass.value = isSuccess ? 'alert-success' : 'alert-danger';
    };

    const fetchRecipes = () => {
      try {
        store.fetchRecipes();
        setFeedbackMessage('Recipes fetched successfully.', true)
      }catch (error) {
        setFeedbackMessage('There was an error fetching the recipes.', false);
      }
    };

    onMounted(() => {
      fetchRecipes();
    });

    const showAddRecipeModal = () => {
      showAddModal.value = true;
    };

    const showEditRecipeModal = (recipe) => {
      currentRecipe.value = { ...recipe };
      showEditModal.value = true;
    };

    const confirmDeleteRecipe = (id) => {
      if (confirm('Are you sure you want to delete this recipe?')) {
        try {
          store.deleteRecipe(id);
          fetchRecipes();
          setFeedbackMessage('Recipe deleted successfully.', true)
        }catch (error) {
          setFeedbackMessage('There was an error deleting the recipe.', false);
        }
      }
    };

    const handleSaved = async () => {
      showAddModal.value = false;
      showEditModal.value = false;
      fetchRecipes();
      setFeedbackMessage('Recipe saved successfully.', true);
    };
    const getBackendImageUrl = (imagePath) => {
      return `http://localhost/images/${imagePath}`;
    };

    const recipes = computed(() => store.recipes);
    const recipesLoading = computed(() => store.recipesLoading);

    return {
      recipes,
      recipesLoading,
      showAddModal,
      showEditModal,
      currentRecipe,
      showAddRecipeModal,
      showEditRecipeModal,
      confirmDeleteRecipe,
      fetchRecipes,
      getBackendImageUrl,
      feedbackMessage,
      feedbackClass,
      handleSaved,
    };
  },
};
</script>

<style scoped>
.recipe-image {
  max-width: 100px;
}

.modal-backdrop {
  display: none !important;
}
</style>
