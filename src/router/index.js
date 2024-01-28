import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore';
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import Profile from "../views/Profile.vue";
import Squad from "../views/Squad.vue";
import Login from "../views/Login.vue";
import Rankings from "../views/Rankings.vue";
import Rewards from "../views/Prizes.vue";
// import Company from "../views/Company.vue";
import Rules from "../views/Rules.vue";
import QRCode from "../views/QRCode.vue";
// import qs from "qs";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/qrcode",
    name: "QRCode",
    component: QRCode
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  // {
  //   path: "/quests",
  //   name: "Quests",
  //   component: Quests
  // },
  {
    path: "/squad",
    name: "Squad",
    component: Squad
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: Rankings
  },
  {
    path: "/rewards",
    name: "Prizes",
    component: Rewards
  },
  // {
  //   path: "/chat",
  //   name: "Chat",
  //   component: Chat
  // },
  // {
  //   path: "/company/:name",
  //   name: "Company",
  //   component: Company
  // },
  // {
  //   path: "/companies",
  //   name: "Companies",
  //   component: Companies
  // },
  {
    path: "/rules",
    name: "Rules",
    component: Rules
  },
  // { path: "*", component: Login },
]

const router = createRouter({
  history: createWebHistory(process.env.STUDENT_APP_URL),
  linkActiveClass: "active",
    stringifyQuery: query => {
      let result = qs.stringify(query, { format: "RFC1738" });
      return result ? "?" + result : "";
    },
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
