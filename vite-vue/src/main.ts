import { createApp } from 'vue';
import rotuer from "./router";
import App from './App.vue';
import "./assets/common.less"
import Directive from "./directive";
const app = createApp(App);

app.use(rotuer);
// app.use(Directive)

app.directive("drag", {
  mounted(el, binding) {
    console.log(binding);
    let dragDom = document.createElement("div");**
    dragDom.classList.add(`drag-block`);
    const { length = 200, minLen = 100, maxLen = 1000 } = binding.value;

    el.parentNode.style.cssText = `position:relative`
    if (binding.arg === "around") {
      el.style.cssText = `position:absolute;top:0;left:0;width:${length}px;bottom:0`;
      el.nextSibling.style.cssText = `position:absolute;top:0;right:0;left:${length + 6}px;bottom:0`
      dragDom.addEventListener("mousedown", (e: any) => {
        document.onmousemove = (event: any) => {
          if (maxLen >= event.clientX && event.clientX >= minLen) {
            el.style.width = `${event.clientX}px`;
            el.nextSibling.style.left = `${event.clientX + 6}px`;
          }
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      });
    } else if (binding.arg === "updown") {
      // let top = event.clientY - el.parentNode.offsetTop  
      el.style.cssText = `position:absolute;top:0;left:0;right:0;height:${length}px;`;
      el.nextSibling.style.cssText = `position:absolute;top:${length + 6}px;left:0;right:0;bottom:0;`;

      dragDom.addEventListener("mousedown", (e: any) => {
        let beginY = e.clientY;
        document.onmousemove = (event: any) => {
          let lang = event.clientY - beginY + el.clientHeight;
          console.log(lang)
          if (maxLen >= lang && lang >= minLen) {
            el.style.height = `${lang}px`;
            el.nextSibling.style.top = `${lang + 6}px`;
          }
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      });
    }
    el.classList.add(`drag-${binding.arg}`);
    el.appendChild(dragDom);
  }
})

app.mount('#app');