import { createApp } from 'vue';
import rotuer from "./router";
import App from './App.vue';
import "./assets/common.less"
import Directive from "./directive";
const app = createApp(App);

app.use(rotuer);
app.use(Directive)

app.mount('#app');