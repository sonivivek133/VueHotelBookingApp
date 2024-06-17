import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home,
  },
  {
    path: "/hotels",
    name: "HotelResults",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Hotels" */ "../views/HotelResults.vue"),
  },
  
  
  {
    path: "/favorites",
    name: "Favorites",
    props: true,
    component: Favorites,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
