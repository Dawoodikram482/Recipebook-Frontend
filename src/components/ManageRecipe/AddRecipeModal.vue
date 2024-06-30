<template>
  <div class="modal show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Recipe</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveRecipe">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" v-model="recipe.RecipeTitle" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" id="category" v-model="recipe.Category" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="ingredients" class="form-label">Ingredients</label>
              <textarea id="ingredients" v-model="recipe.Ingredients" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
              <label for="instructions" class="form-label">Instructions</label>
              <textarea id="instructions" v-model="recipe.Instructions" class="form-control" required></textarea>
            </div>
            <div>
              <label for="image" class="form-label">Image</label>
              <input type="file" id="image" class="form-control" accept="image/png, image/jpeg,image/jpg" @change="handleImageChange" required />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRecipeStore } from '@/stores/RecipeStore.js';

export default {
  name: 'AddRecipeModal',
  props: {
    recipe: Object
  },
  setup(props, { emit }) {
    const store = useRecipeStore();
    const recipe = ref({ ...props.recipe });

    watch(() => props.recipe, (newRecipe) => {
      recipe.value = { ...newRecipe };
    });

    const saveRecipe = async () => {
      const formData = new FormData();
      formData.append('RecipeTitle', recipe.value.RecipeTitle);
      formData.append('Category', recipe.value.Category);
      formData.append('Ingredients', recipe.value.Ingredients);
      formData.append('Instructions', recipe.value.Instructions);
      formData.append('Image', recipe.value.Image); // Ensure 'Image' matches backend file field name

      try {
        await store.addRecipe(formData); // Pass formData directly to the addRecipe action
        emit('close');
        emit('saved');
      } catch (error) {
        console.error('Failed to add recipe:', error);
        // Handle error as needed
      }
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      recipe.value.Image = file;
    };

    return {
      recipe,
      saveRecipe,
      handleImageChange,
    };
  },
};
</script>


<style scoped>
.modal-backdrop {
  display: none !important;
}
</style>
