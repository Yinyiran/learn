export default {
  install(app: any, options: any) {
    app.directive("drag", {
      mounted(el: any, binding: any) {
        let dragDom = document.createElement("div");
        dragDom.classList.add(`drag-block`);
        el.parentNode.style.cssText = `position:relative`;

        if (binding.arg === "x") {
          const { width = 200, minWidth = 100, maxWidth = 900 } = binding.value;
          el.style.cssText = `width:${width}px`;
          el.nextSibling.style.cssText = `position:absolute;top:0;right:0;left:${width}px;bottom:0`;
          dragDom.addEventListener("mousedown", (e: any) => {
            document.onmousemove = (event: any) => {
              let lang = event.clientX - el.getBoundingClientRect().left;;
              const parentWidth = el.parentNode.offsetWidth;
              let width = "";
              if (lang <= minWidth) {
                width = `${minWidth}px`;
              } else if (lang >= parentWidth && maxWidth >= parentWidth) {
                width = `${parentWidth}px`;
              } else if (lang >= maxWidth) {
                width = `${maxWidth}px`;
              } else {
                width = `${lang}px`;
              }
              console.log(width);

              el.style.width = width;
              el.nextSibling.style.left = width;
            };
            document.onmouseup = () => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          });
        } else if (binding.arg === "y") {
          const { height = 200, minHeight = 100, maxHeight = 400 } = binding.value;
          el.style.cssText = `height:${height}px;`;
          el.nextSibling.style.cssText = `position:absolute;top:${height}px;left:0;right:0;bottom:0;`;

          dragDom.addEventListener("mousedown", (e: any) => {
            document.onmousemove = (event: any) => {
              console.log(el.getBoundingClientRect());
              
              let lang = event.clientY - el.getBoundingClientRect().top;
              // 范围约束：不能大约最大值或者父级的宽度，不能小于最小值
              const parentHeight = el.parentNode.offsetHeight;
              let height = "";
              if (lang <= minHeight) {
                height = `${minHeight}px`;
              } else if (lang >= parentHeight && maxHeight >= parentHeight) {
                height = `${parentHeight}px`;
              } else if (lang >= maxHeight) {
                height = `${maxHeight}px`;
              } else {
                height = `${lang}px`;
              }
              el.style.height = height;
              el.nextSibling.style.top = height;
            };
            document.onmouseup = () => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          });
        }
        el.classList.add(`drag-${binding.arg}`);
        el.appendChild(dragDom);
      },
    });
  },
};
