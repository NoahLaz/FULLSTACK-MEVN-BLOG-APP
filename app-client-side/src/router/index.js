import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tags from "../views/Tags.vue";
import About from "../views/About.vue";
import NotFound from "../views/404.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Article from "../views/Article.vue";
import CreatePost from "../views/CreatePost.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      anyone: true,
    },
  },
  {
    path: "/Tags",
    name: "Tags",
    component: Tags,
    meta: {
      anyone: true,
    },
  },
  {
    path: "/About",
    name: "About",
    component: About,
    meta: {
      anyone: true,
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/article/:id",
    name: "Article",
    component: Article,
    meta: {
      anyone: true,
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Meta Handling
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({
        path: "/login",
      });
    } else next();
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("user")) {
      next({
        path: "/",
      });
    } else next();
  }

  if (to.matched.some((record) => record.meta.anyone)) {
    next();
  }
});

export default router;
