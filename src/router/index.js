import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";
import EditMessage from "../components/EditMessage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
  {
    path: "/editMessage/:id",
    name: "EditMessage",
    component: EditMessage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;