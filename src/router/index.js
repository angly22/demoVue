import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line
/* eslint-disable */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "DemoCargo" */ '../views/DemoCargo.vue')
  },
   // {
  //   path: '/:catchAll(.*)', //RUTA POR DEFECTO SI NO CONSIGUE LO QUE BUSCAMOS
  //   name: 'notFound',
  //   //el lazy-load hace que la aplicacion tenga mejor performance
  //   component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
