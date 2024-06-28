<template>
  <div class="login-page">
    <div class="left-section">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </div>
    <div class="right-section">
      <div class="login-form-container">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" placeholder="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" placeholder="Password" required />
          </div>
          <button type="submit">LOGIN</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginSessionStore } from '../stores/LoginSession.js';

export default {
  name: 'LoginPage',
  setup() {
    const loginSessionStore = useLoginSessionStore();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await loginSessionStore.login(username.value, password.value);
        await router.push('/');
      } catch (error) {
        errorMessage.value = error;
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  background-color: #1a1a1a;
}

.left-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
}

.logo img {
  max-width: 80%;
}

.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
}

.login-form-container {
  width: 80%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  background-color: #1f1f1f;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #fff;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #343a40;
  color: #fff;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0DCAF0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0aabcc;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}

.footer-links {
  margin-top: 1rem;
  text-align: center;
}

.footer-links a {
  color: #0DCAF0;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
