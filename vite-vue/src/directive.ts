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
              console.log();
              let lang = event.clientX - el.parentNode.offsetLeft;

              const parentWidth = el.parentNode.offsetWidth;
              if (minWidth >= lang) {
                el.style.width = `${minWidth}px`;
                el.nextSibling.style.left = `${minWidth}px`;
              } else if (parentWidth <= lang && maxWidth >= parentWidth) {
                el.style.width = parentWidth;
                el.nextSibling.style.left = `${parentWidth}px`;
              } else if (maxWidth <= lang) {
                el.style.width = maxWidth;
                el.nextSibling.style.left = `${maxWidth}px`;
              } else {
                el.style.width = `${lang}px`;
                el.nextSibling.style.left = `${lang}px`;
              }
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
              let lang = event.clientY - el.parentNode.offsetTop;
              // 范围约束：不能大约最大值或者父级的宽度，不能小于最小值
              const parentHeight = el.parentNode.offsetHeight;
              if (minHeight >= lang) {
                el.style.height = `${minHeight}px`;
                el.nextSibling.style.top = `${minHeight}px`;
              } else if (parentHeight <= lang && maxHeight >= parentHeight) {
                el.style.height = parentHeight;
                el.nextSibling.style.top = `${parentHeight}px`;
              } else if (maxHeight <= lang) {
                el.style.height = maxHeight;
                el.nextSibling.style.top = `${maxHeight}px`;
              } else {
                el.style.height = `${lang}px`;
                el.nextSibling.style.top = `${lang}px`;
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
      },
    });
  },
};
