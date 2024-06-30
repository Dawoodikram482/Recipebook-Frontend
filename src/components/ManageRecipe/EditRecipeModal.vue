<template>
  <div class="modal show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Recipe</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveRecipe">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" v-model="recipe.RecipeTitle" class="form-control" required />
            </div>
            <label for="category" class="form-label">Category</label>
            <select id="category" v-model="recipe.Category" class="form-control" required>
              <option value="" disabled>Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <div class="mb-3">
              <label for="ingredients" class="form-label">Ingredients</label>
              <textarea id="ingredients" v-model="recipe.Ingredients" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
              <label for="instructions" class="form-label">Instructions</label>
              <textarea id="instructions" v-model="recipe.Instructions" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue';
import {useRecipeStore} from '@/stores/RecipeStore.js';

export default {
  name: 'EditRecipeModal',
  props: {
    recipe: Object
  },
  setup(props, {emit}) {
    const store = useRecipeStore();
    const recipe = ref({...props.recipe});

    watch(() => props.recipe, (newRecipe) => {
      recipe.value = {...newRecipe};
    });

    const saveRecipe = () => {
      store.updateRecipe(recipe.value).then(() => {
        emit('close');
        emit('saved');
      });
    };

    return {
      recipe,
      saveRecipe,
    };
  },
};
</script>

<style scoped>
.modal-backdrop {
  display: none !important;
}
</style>
