import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home')
    },
    {
        path: '/nested-route',
        name: 'SomeNestedRouteComponent',
        component: () => import('@/components/onlyForTests/SomeNestedRouteComponent')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });
  
  export default router
  