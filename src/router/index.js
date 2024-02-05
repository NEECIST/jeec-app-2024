import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      header: false,
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/qrcode",
    name: "QRCode",
    component: () => import("@/views/QRCode.vue"),
  },
  {
    path: "/activities",
    name: "Activities",
    component: () => import("@/views/Activities.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/squad",
    name: "Squad",
    component: () => import("@/views/Squad.vue"),
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: () => import("@/views/Rankings.vue"),
  },
  {
    path: "/rules",
    name: "Rules",
    component: () => import("@/views/Rules.vue"),
  },
  // { path: "*", component: Login },
]

const router = createRouter({
  history: createWebHistory(process.env.STUDENT_APP_URL),
  linkExactActiveClass: 'active-link',
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if(userStore.loggedInState != true) {
    userStore.isLoggedIn();
    userStore.loggedInState = true;
    
    if (userStore.loggedIn != true) {
      router.push("/")
    }
  }
  
  if (to.name == "login" && userStore.loggedIn == true) {
    router.push("/home")
  }
})


export default router
