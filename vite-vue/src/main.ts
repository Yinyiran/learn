import { createApp } from 'vue';
import rotuer from "./router"
import App from './App.vue';
import Directive from "./directive"
const app = createApp(App);

app.use(rotuer);
// app.use(Directive)

app.directive("drag", {
  mounted(el, binding) {
    console.log(el.offsetWidth)
    console.log(el.offsetHeight)
    // el.style.width = ""
    console.log(binding)
  }
})

app.mount('#app');