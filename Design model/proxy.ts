// 当客户不方便直接访问一个对象，提供一个替身对象来控制对这个对象的访问。
// 客户实际访问的是替身对象，替身对象对请求做一些处理后再交给原对象。

// 虚拟代理 （把开销很大的对象，延迟到真正需要的时候才去创建
// 案例：图片预加载

class MyImage {
  imgNode: any
  constructor() {
    this.imgNode = document.createElement("img")
    document.body.appendChild(this.imgNode)
  }
  setSrc(src: string) {
    this.imgNode.src = src;
  }
}
let myImg = new MyImage();
class ProxyImage {
  img: any
  constructor() {
    this.img = new Image;
    this.img.onload = () => {
      myImg.setSrc(this.img.src)
    }
  }
  setSrc(src) {
    myImg.setSrc(`loading.gif`)
    this.img.src = src;
  }
}
let proxyImg = new ProxyImage()
proxyImg.setSrc(`http://img.jpg`)