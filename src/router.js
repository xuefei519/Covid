import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";

Vue.use(Router);


export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "landing",
      meta:{
        title:'Quebec COVID-19 Dashboard'
      },
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
