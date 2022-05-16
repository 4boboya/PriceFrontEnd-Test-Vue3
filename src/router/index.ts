import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import vuex from "@/store"
import { home } from "./views/Home"
import { user } from "./views/User"
import { stored } from "./views/Stored"
import { analysis } from './views/Analysis'

const routes: Array<RouteRecordRaw> = []

routes.push(home, user, stored, analysis)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const status = vuex.getters["User/GetStatus"]
  if (to.path.includes("user")) {
    if (!status) next("/")
    else if (!to.name) next("/user/profile")
    else next()
  } else next()
});

export default router
