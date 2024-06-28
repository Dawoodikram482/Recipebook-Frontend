<template>
  <div class="category-page">
    <h1 v-if="category">{{ category }} Recipes</h1>
    <div v-else>Loading category...</div>
    <div v-if="recipesLoading">Loading...</div>
    <div class="recipes" v-else>
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import {useRecipeStore} from '@/stores/RecipeStore.js';
import {onMounted, computed, watch, ref} from 'vue';
import {useRoute} from 'vue-router';
import RecipeCard from '@/components/Recipe/RecipeCard.vue';

export default {
  name: 'CategoryPage',
  components: {
    RecipeCard,
  },
  setup() {
    const route = useRoute();
    const recipeStore = useRecipeStore();
    const category = computed(() => route.params.category || '');
    const recipes = computed(() => recipeStore.recipes);
    const recipesLoading = computed(() => recipeStore.recipesLoading);
    const error = computed(() => recipeStore.error);

    const fetchRecipes = () => {
      if (category.value) {
        recipeStore.fetchRecipesByCategory(category.value);
      }
    };

    onMounted(fetchRecipes);
    watch(() => route.params.category, fetchRecipes); // Watch for changes in route.params.category

    return {
      category,
      recipes,
      recipesLoading,
      error,
    };
  },
};
</script>

<style scoped>
.category-page {
  padding: 20px;
}

.recipes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
