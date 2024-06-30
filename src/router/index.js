import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/HomeView.vue'
import LoginView from '../components/Login.vue'
import CategoryPage from '../components/Recipe/CategoryPage.vue'
import Register from "@/components/Register.vue";
import ManageRecipe from "@/components/ManageRecipe/ManageRecipe.vue";
import ManageUsers from "@/components/ManageUsers/ManageUsers.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/categories/:category',
            name: 'CategoryPage',
            component: CategoryPage
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path:'/recipes',
            name: 'ManageRecipe',
            component: ManageRecipe
        },
        {
            path:'/users',
            name: 'ManageUsers',
            component: ManageUsers
        }
    ]
})

export default router
