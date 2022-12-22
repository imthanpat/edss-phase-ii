import { createRouter, createWebHistory } from "vue-router";
import defaultLayout from "../layouts/default.vue";
import SelectProjectLayout from "../layouts/selectproject.vue";

import HomeView from "../views/HomeView.vue";
import Login from "../components/Login";

const routes = [
  {
    path: "/useradd",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/user-mgmt/add.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/logs",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/user-mgmt/logs.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/userlist",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/user-mgmt/userlist.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/alarmtheshold",
    component: SelectProjectLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/Fm-Conf/AlarmTheshold.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/rework",
    component: SelectProjectLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/device/reworkdashboard.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/conf",
    component: SelectProjectLayout,
    children: [
      {
        path: ':types',
        component: () =>
          import("../views/Fm-Conf/alarmRule.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/project",
    component: defaultLayout,
    children: [
      {
        path: 'add',
        component: () =>
          import("../views/project/add.vue"),
        meta: {
          //middleware: auth,
        },
      },
      {
        path: 'list',
        component: () =>
          import("../views/project/list.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/alarmlog",
    component: defaultLayout,
    children: [
      {
        path: 'device',
        component: () =>
          import("../views/alarm-log/device-log.vue"),
        meta: {
          //middleware: auth,
        },
      },
      {
        path: 'fm',
        component: () =>
          import("../views/alarm-log/fm-log.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/reuse",
    component: defaultLayout,
    children: [
      {
        path: ':types',
        component: () =>
          import("../views/reuse/list.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/finddevice",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/device/find.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/adddevice",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/device/add.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/deviceoverview",
    component: defaultLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/device/overview.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/devicestatus",
    component: SelectProjectLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/device/status.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/device",
    component: SelectProjectLayout,
    children: [
      {
        path: ':types',
        component: () =>
          import("../views/device/list.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/mapinfo",
    component: SelectProjectLayout,
    children: [
      {
        path: '',
        component: () =>
          import("../views/map-layout/view.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/inventory",
    component: defaultLayout,
    children: [
      {
        path: ':types',
        component: () =>
          import("../views/inventory/list.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/unlist",
    component: defaultLayout,
    children: [
      {
        path: ':types',
        component: () =>
          import("../views/unlist/list.vue"),
        meta: {
          //middleware: auth,
        },
      },
    ]
  },
  {
    path: "/",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
