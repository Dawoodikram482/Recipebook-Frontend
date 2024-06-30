<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'CategoryPage', params: { category: 'Breakfast' } }"
                >Breakfast</router-link>
              </li>
              <li>
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'CategoryPage', params: { category: 'Lunch' } }"
                >Lunch</router-link>
              </li>
              <li>
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'CategoryPage', params: { category: 'Dinner' } }"
                >Dinner</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownUser"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              {{ loginSessionStore.getFirstName }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownUser">
              <li>
                <router-link class="dropdown-item" to="/recipes"
                >Manage Recipes</router-link>
              </li>
              <li v-if="loginSessionStore.getRole === 'Admin'">
                <router-link class="dropdown-item" to="/users"
                >Manage Users</router-link>
              </li>
            </ul>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button class="nav-link" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useLoginSessionStore } from '../stores/LoginSession.js';
import { onMounted } from 'vue';

export default {
  name: 'Navbar',
  setup() {
    const loginSessionStore = useLoginSessionStore();

    onMounted(() => {
      loginSessionStore.localLogin();
    });

    return {
      loginSessionStore,
    };
  },
  computed: {
    isLoggedIn() {
      return this.loginSessionStore.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.loginSessionStore.logout();
    },
  },
};
</script>

<style scoped>
.navbar-brand .logo-img {
  max-height: 100px;
}

.navbar-nav .nav-link {
  color: #fff;
}

.navbar-nav .nav-link:hover {
  color: #0dcaf0;
}

.dropdown-menu .dropdown-item {
  color: #343a40;
}

.dropdown-menu .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #343a40;
}
</style>
