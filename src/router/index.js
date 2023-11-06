import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Stockentry from "../views/Stockentry.vue";
import dashboard from "../views/Dashboard.vue";
import BillEntry from "../views/BillEntry.vue";
import adduser from "../views/Adduser.vue";
import Stockview from "../views/StockViewcard.vue";
import Loginhistory from "../views/Loginhistory.vue";
import salesreport from "../views/Salesreport.vue";
import convo from "../views/convo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/stockentry",
    name: "Stockentry",
    component: Stockentry,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: dashboard,
  },
  {
    path: "/billentry",
    name: "BillEntry",
    component: BillEntry,
  },
  {
    path: "/adduser",
    name: "Adduser",
    component: adduser,
  },
  {
    path: "/stockview",
    name: "Stockview",
    component: Stockview,
  },
  {
    path: "/loginhistory",
    name: "Loginhistory",
    component: Loginhistory,
  },
  {
    path: "/salesreport",
    name: "Salesreport",
    component: salesreport,
  },
  {
    path: "/convo",
    name: "convo",
    component: convo,
  },
];


const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
