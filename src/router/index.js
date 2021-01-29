import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";
import EditMessage from "../components/EditMessage.vue";
import Register from '../components/views/Register.vue';
import Login from '../components/views/Login.vue';
import Posts from '../components/views/Posts.vue';
import store from '../store';


const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/EditMessage/:id",
    name: "EditMessage",
    component: EditMessage,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/posts",
    name: Posts,
    component: Posts,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// vérif avant chaque route : présence de meta : requiresAuth
//si oui, vérif si le user est bien connecté

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

// vérif avant chaque route : présence de meta : guest
//si oui, blocage de ces routes pour le user connecté

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
