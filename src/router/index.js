import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import { useUserStore } from '@/stores/UserStore';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import("@/views/Schedule.vue")
  },
  {
    path: "/activities",
    name: "Activities",
    component: () => import("@/views/Activities.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/squad",
    name: "Squad",
    component: () => import("@/views/Squad.vue")
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: () => import("@/views/Rankings.vue")
  },
  {
    path: "/rewards",
    name: "Rewards",
    component: () => import("@/views/Prizes.vue")
  },
  {
    path: "/rules",
    name: "Rules",
    component: () => import("@/views/Rules.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(process.env.STUDENT_APP_URL),
  // linkActiveClass: "active",
  //   stringifyQuery: query => {
  //     let result = qs.stringify(query, { format: "RFC1738" });
  //     return result ? "?" + result : "";
  //   },
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  userStore.isLoggedIn();

  if (!userStore.loggedIn) {
    router.push("/")
  }
})

export default router
