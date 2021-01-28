import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";
import EditMessage from "../components/EditMessage.vue"
import Login from "../views/Login.vue"
import { useAuth } from "../modules/auth.ts";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/EditMessage/:id",
    name: "EditMessage",
    component: EditMessage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { user } = useAuth()

  // Not logged into a guarded route?
  if ( to.meta.requiresAuth && !user?.value ) next({ name: 'login' })

  // Logged in for an auth route
  else if ( (to.name == 'login' || to.name == 'register') && user.value !== null) next({ name: 'home' })

  // Carry On...
  else next()
})

export default router;