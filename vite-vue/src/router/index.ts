import { h } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import Index from "../components/index.vue"
import Slot from "../components/slot.vue"
import SetUp from "../components/setup.vue"
import Directive from "../components/directive.vue"
import AntDesign from "../components/AntDesign.vue"
const routes = [
  { path: '/', redirect: "/index" },
  { path: '/index', component: Index, meta: { title: "首页" } },
  { path: '/slot', component: Slot, meta: { title: "插槽" } },
  { path: '/setup', component: SetUp, meta: { title: "组合API" } },
  { path: '/directive', component: Directive, meta: { title: "指令" } },
  { path: '/ant-design', component: AntDesign, meta: { title: "ant-ui" } },
  {
    path: '/routerView',
    component: { template: "<router-view></router-view>" },
    meta: { title: "路由出口" },
    children: [
      { path: '/ant-design', component: AntDesign }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;