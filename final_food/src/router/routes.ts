import type { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
    { 
        path: '/', 
        name: 'home',
        component: () => import('../pages/recipes.vue') 
    },
    { 
        path: '/recipeDetails/:id', 
        name: 'recipeDetails',
        component: () => import('../pages/recipeDetails.vue'), 
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../pages/errorPage.vue')
    }
]

export default routes