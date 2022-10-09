import { createRouter, createWebHistory } from "vue-router"
import Index from "../components/index.vue"
import Slot from "../components/slot.vue"
import SetUp from "../components/setup.vue"
import Directive from "../components/directive.vue"
import AntDesign from "../components/AntDesign.vue"
import DefineProperty from "../components/defineProperty.vue"
import RouterView from "../components/routerview.vue"
import IndexFooter from "../components/IndexFooter.vue"
import VirtualRoll from "../components/VirtualRoll.vue"
import DragBlock from "../components/DragBlock.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: "/index" },
    {
      path: '/index',
      components: {
        default: Index,
        a: IndexFooter,
        b: IndexFooter
      },
      meta: { title: "首页" }
    },
    { path: '/slot', component: Slot, meta: { title: "插槽" } },
    { path: '/setup', component: SetUp, meta: { title: "组合API" } },
    { path: '/directive', component: Directive, meta: { title: "指令" } },
    { path: '/ant-design', component: AntDesign, meta: { title: "AntUI" }, },
    { path: '/defineProperty', component: DefineProperty, meta: { title: "代理" } },
    {
      path: '/routerView',
      component: RouterView,
      meta: { title: "路由出口" },
      children: [
        { path: '/router-view', component: AntDesign }
      ]
    },
    {
      path: '/virtualRulling',
      component: VirtualRoll,
      meta: { title: "虚拟滚动" },
    },
    {
      path: '/dragBlock',
      component: DragBlock,
      meta: { title: "拖拽块" },
    },
  ]
})

export default router
