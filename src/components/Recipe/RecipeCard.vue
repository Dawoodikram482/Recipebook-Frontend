<template>
  <div class="recipe-card">
    <img :src="imageSrc" alt="Recipe Image" class="recipe-image" v-if="imageSrc"/>
    <div class="recipe-details">
      <h2>{{ recipe.RecipeTitle.trim() }}</h2>
      <p>Category: {{ recipe.Category }}</p>
      <div class="recipe-content">
        <div class="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            <li v-for="(ingredient, index) in splitLines(recipe.Ingredients)" :key="index">{{ ingredient }}</li>
          </ul>
        </div>
        <div class="steps">
          <h3>Steps:</h3>
          <ol>
            <li v-for="(step, index) in splitLines(recipe.Instructions)" :key="index">{{ step }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

// Define the image glob import
const images = import.meta.glob('@/assets/images/*');

export default {
  name: 'RecipeCard',
  props: {
    recipe: Object,
  },
  setup(props) {
    const imageSrc = ref('');

    const loadImage = async (imagePath) => {
      // Use import.meta.glob to resolve images dynamically
      const path = `/src/assets/images/${imagePath}`;
      const importer = images[path];

      if (importer) {
        const imageModule = await importer();
        imageSrc.value = imageModule.default;
      } else {
        console.error(`Image not found: ${path}`);
        // Load default image if specific image not found
        const defaultImporter = images['/src/assets/images/default.jpg'];
        if (defaultImporter) {
          const defaultImage = await defaultImporter();
          imageSrc.value = defaultImage.default;
        }
      }
    };

    watch(() => props.recipe.Image, (newImagePath) => {
      loadImage(newImagePath);
    }, { immediate: true });

    return {
      imageSrc,
      splitLines(text) {
        if (!text) return [];
        return text.trim().split('\n');
      },
    };
  },
};
</script>

<style scoped>
.recipe-card {
  display: flex;
  background-color: #1a1a1a;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  width: 50%;
  object-fit: cover;
}

.recipe-details {
  padding: 20px;
  width: 50%;
}

.recipe-content {
  display: flex;
}

.ingredients,
.steps {
  margin-right: 20px;
}

h2, h3 {
  margin-top: 0;
}
</style>
