import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/products',
      name: 'product',
      component: ProductView,
      props: route => ({page: route.query.page})
    }
  ]
})

export default router
