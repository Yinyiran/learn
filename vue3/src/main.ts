import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "./assets/common.less"
import Directive from "./directive";

import AntD from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(createPinia())
app.use(Directive)
app.use(AntD);
app.use(router)

app.mount('#app')
