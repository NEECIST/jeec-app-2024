import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const routes = [
  /*{
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      header: false,
      userPopup: false,
    }
  },*/
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
    path: "/schedule",
    name: "Schedule",
    component: () => import("@/views/Schedule.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      userPopup: false,
    }
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: () => import("@/views/Rankings.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/Rules.vue"),
  },  
  {
    path: "/",
    name: "Draw",
    component: () => import("@/views/Draw.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/Shop.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
]

const router = createRouter({
  history: createWebHistory(process.env.STUDENT_APP_URL),
  linkExactActiveClass: 'active-link',
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (userStore.loggedInState != true) {
    userStore.isLoggedIn();
    userStore.loggedInState = true;

    if (userStore.loggedIn !== true) {
      router.push("/")
    }
  } else {
    if (userStore.loggedIn == true) {
      userStore.getPoints();
    }
  }
  
  if (to.name == "login" && userStore.loggedIn == true) {
    router.push("/")
  }
})


export default router
