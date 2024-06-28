import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/HomeView.vue'
import LoginView from '../components/Login.vue'
import CategoryPage from '../components/Recipe/CategoryPage.vue'

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
    ]
})

export default router
