import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { home } from "./views/Home"
import { user } from "./views/User"

const routes: Array<RouteRecordRaw> = []

routes.push(home, user)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
