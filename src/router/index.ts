import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import vuex from "@/store"
import { home } from "./views/Home"
import { user } from "./views/User"

const routes: Array<RouteRecordRaw> = []

routes.push(home, user)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const status = vuex.getters["User/GetStatus"]
  console.log(status, to)
  if (to.path.includes("user")) {
    if (!status) next("/")
    else next()
  }

  next()
});

export default router
