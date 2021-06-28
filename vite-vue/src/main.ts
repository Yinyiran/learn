import { createApp } from 'vue';
import rotuer from "./router";
import App from './App.vue';
import "./assets/common.less"
import Directive from "./directive";
import AntD from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(rotuer);
app.use(Directive)
app.use(AntD);

app.mount('#app');