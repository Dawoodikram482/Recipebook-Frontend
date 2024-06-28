<template>
  <div class="signup-page">
    <div class="left-section">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo"/>
      </div>
    </div>
    <div class="right-section">
      <div class="signup-form-container">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" placeholder="Username" required/>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" placeholder="Email" required/>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" placeholder="Password" required/>
          </div>
          <button type="submit">SIGN UP</button>
          <div class="footer-links">
            <router-link to="/login">Already have an account? Login here.</router-link>
          </div>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios-auth.js'; // Assuming axios instance is configured and exported as 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('/users/register', {
          username: this.username,
          password: this.password,
          email: this.email
        });

        console.log('User registered:', response.data);
        this.$router.push('/login');

      } catch (error) {
        console.error('Error registering user:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Failed to register user. Please try again later.';
        }
      }
    }
  }
};
</script>

<style scoped>
.signup-page {
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

.signup-form-container {
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
