<template>
  <div class="home">
    <div class="description">
      <h1>Welcome to our Recipe Book!</h1>
      <p>Discover a wide variety of recipes to suit every taste and occasion. Whether you're looking for a quick
        breakfast, a hearty lunch, or an elegant dinner, we have something for everyone. Start your culinary adventure
        by exploring our collection of delicious recipes. Simply enter a category below to find recipes that fit your
        needs.</p>
    </div>
    <div class="search-section">
      <div class="search-bar">
        <input type="text" v-model="category" placeholder="e.g. Breakfast"/>
        <button @click="searchRecipes">Search</button>
      </div>
    </div>
    <div v-if="feedbackMessage" class="alert alert-danger" role="alert">
      {{ feedbackMessage }}
    </div>
    <div class="recipes">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import axios from '../axios-auth'
import RecipeCard from '../components/Recipe/RecipeCard.vue';

export default {
  name: 'Home',
  components: {
    RecipeCard,
  },
  data() {
    return {
      category: '',
      recipes: [],
      feedbackMessage: '',
    };
  },
  methods: {
    async searchRecipes() {
      this.feedbackMessage = '';
      try {
        const response = await axios.get('recipes/category', {
          params: {
            category: this.category
          }
        });
        this.recipes = response.data;
        if (this.recipes.length === 0) {
          this.feedbackMessage = 'No recipes found for the selected category.';
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        this.feedbackMessage = 'Failed to fetch recipes. Please try again later.';
      }
    },
  },
  };
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 100vh;
  padding-top: 50px;
}

.description {
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
}

.search-section {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 25px;
  overflow: hidden;
  padding: 5px;
}

.search-bar input {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 25px 0 0 25px;
  background-color: #333;
  color: white;
  outline: none;
}

.search-bar button {
  padding: 10px 20px;
  border: none;
  background-color: #0DCAF0;
  color: white;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  outline: none;
}

.search-bar button:hover {
  background-color: #0aabcc;
}

.recipes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
