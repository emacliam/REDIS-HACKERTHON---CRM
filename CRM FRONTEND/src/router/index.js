import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/pages/Home.vue'
import CustomerHome from '/src/pages/User-Home.vue'
import UserClosed from '/src/pages/User-Closed.vue'
import UserPending from '/src/pages/User-Pending.vue'

import Chat from '/src/pages/Chat.vue'
import Resolved from '/src/pages/Resolved.vue'
import Archived from '/src/pages/Archived.vue'
import Unresolved from '/src/pages/Unresolved.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Login from '/src/pages/Login.vue'
import Register from '/src/pages/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false },
    },
    {
        path: '/Dashboard',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true, agent: true },
    },
    {
        path: '/CustomerDashboard',
        name: 'CustomerHome',
        component: CustomerHome,
        meta: { requiresAuth: true, agent: true },
    },
    {
        path: '/closed',
        name: 'UserClosed',
        component: UserClosed,
        meta: { requiresAuth: true },
    },
    {
        path: '/archived',
        name: 'UserPending',
        component: UserPending,
        meta: { requiresAuth: true },
    },
    {
        path: '/Chat/:id',
        name: 'Chat',
        component: Chat,
        meta: { requiresAuth: true, agent: true },
    },
    {
        path: '/Resolved',
        name: 'Resolved',
        component: Resolved,
        meta: { requiresAuth: true, agent: true },
    },
    {
        path: '/open',
        name: 'Unresolved',
        component: Unresolved,
        meta: { requiresAuth: true, agent: true },
    },
    {
        path: '/ArchivedIssues',
        name: 'Archived',
        component: Archived,
        meta: {
            requiresAuth: true,
            agent: true,
        },
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const isAuthenticated = localStorage.getItem('user') == null ? false : true
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        to.meta.requiresAuth &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        return { name: 'Login' }
    }
})
/* //fix infinite redirect
router.beforeEach((to, from, next) => {
    const isAdmin = JSON.parse(localStorage.getItem('user')).role
    console.log(isAdmin)

    if (
        isAdmin != 'AGENT' &&
        !to.meta.agent
    ) {
        next()
    } else {
        next('/Dashboard')
    }
}) */
export default router
