<template>
  <div class="container mt-5">
    <h2>Manage Users</h2>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.userType }}</td>
        <td>
          <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../axios-auth';
export default {
  name: 'ManageUsers',
  data() {
    return {
      users: []
    };
  },
  methods: {
    fetchUsers() {
      axios.get('/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the users:", error);
          });
    },
    deleteUser(userId) {
      axios.delete(`/users/${userId}`)
          .then(() => {
            this.users = this.users.filter(user => user.id !== userId);
          })
          .catch(error => {
            console.error("There was an error deleting the user:", error);
          });
    },
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
