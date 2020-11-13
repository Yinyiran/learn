// 享元（flyweight）模式是一种用于性能优化的模式，
// “fly”在这里是苍蝇的意思，意为蝇量级。
// 享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
// 如果系统中也因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用

class Model {
  constructor(sex) {
    this.sex = sex;
    this.underwear = ""
  }
  takePhoto() {
    console.log(`sex = ${this.sex} underwear = ${this.underwear}`)
  }
}
// 只new了两个对象
const maleModel = new Model("male")
const femaleModel = new Model("female")
// 男模特拍照
for (let i = 0; i < 50; i++) {
  maleModel.underwear = `underwear${i}`
  maleModel.takePhoto()
}
// 女模特拍照
for (let i = 0; i < 50; i++) {
  femaleModel.underwear = `underwear${i}`
  femaleModel.takePhoto()
}

let id = 0;
window.startUpload = function (uploadType, files) {
  for (let i = 0, file; file = files[i++];) {
    const uploadObj = new UploadE(uploadType, file.fileName, file.fileSize)
    uploadObj.init(id++);
  }
}

class UploadE {
  constructor(uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
  }
  init(id) {
    this.id = id;
    this.dom = document.createElement("div")
    this.dom.innterHTML = `<span> 文件名称 ${this.fileName}, 文件大小${this.fileSize}</span>
                          <button class="del-file">删除</button>`
    this.dom.querySelector("del-file").onclick = function () {
      this.delFile();
    }
    document.body.appendChild(this.dom)
  }
  delFile() {
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.comfirm(`确定要删除该文件吗？${this.fileName}`)) {
      return this.dom.parentNode.removeChild(this.dom)
    }
  }
}
startUpload("plugin", [{ fileName: "1.txt", fileSize: 1000 }, { fileName: "1.html", fileSize: 3000 }])
startUpload("flash", [{ fileName: "2.txt", fileSize: 1000 }, { fileName: "2.html", fileSize: 4000 }])
// 有多少文件就会创建多少upload对象

// 享元模式重构
// 1.内部状态储存于对象内部
// 2.内部状态可以被一些对象共享
// 3.内部状态对独立与具体的场景，经常不会改变
// 4.外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

// 享元模式重构
// 1.剥离外部状态
class Upload {
  constructor(uploadType) {
    this.uploadType = uploadType;
  }
  defFile(id) {
    uploadManager.setExternalState(id, this)
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom)
    }
    if (window.confirm(`确定要删除该文件吗？${this.fileName}`)) {
      return this.dom.parentNode.removeChild(this.dom)
    }
  }
}
// 2.工厂进行对象实例化
const uploadFactory = (function () {
  const createFlyWeightObjs = {}
  return {
    create(uploadType) {
      if (createFlyWeightObjs[uploadType]) {
        return createFlyWeightObjs[uploadType]
      }
      return createFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
  }
})()
// 3.管理器封装外部状态
const uploadManager = (function () {
  let uploadDataBase = {};
  return {
    add(id, uploadType, fileName, fileSize) {
      const flyWeightObj = uploadFactory.create(uploadType)
      const dom = document.createElement("div")
      dom.innerHTML =
        `<span>文件名称${fileName}，文件大小${fileSize}</span>
        <button class="del-file">删除</button>`
      dom.querySelector("del-file").onclick = function () {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadDataBase[id] = { fileName, fileSize, dom };
      return flyWeightObj;
    },
    setExternalState(id, flyWeightObj) {
      const UploadData = uploadDataBase[id]
      for (let key in UploadData) {
        flyWeightObj[key] = uploadData[key]
      }
    }
  }
})();

let id = 0;
window.startUpload = function (uploadType, files) {
  for (let i = 0, file; file = files[i++];) {
    let uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
}

// 享元模式是一种很好的性能优化方案，但它也会带来一些复杂的问题，从起那面两组代码的比较可以看到，使用了享元模式后，
// 我们需要分别多维护factory和manager对象，在大部分不必要使用享元模式的环境下，这些开销是可以避免的。

// 什么情况下使用享元模式
// 1.一个程序中使用了大量的相似对象，由于使用了大量对象，造成很大的内存开销
// 2.对象的大多数状态都可以变为外部状态
// 3.剥离出对象的外部状态之后，可以用相对较少的共享对象阙殆大量的对象



// 对象池       // 已经创建过的，缓存起来
// 地图搜索的tootip
class toolTipFactory {
  #toolTipPool = [] // toolTip对象池
  create() {
    // 如果对象池为空，创建一个dom
    if (this.#toolTipPool.length === 0) {
      const div = document.createElement("div")
      document.body.appendChild(div)
      return div
    } else {
      return this.#toolTipPool.shift();// 如果对象池不为空，则从对象池中取出一个dom
    }
  }
  // 对象池回收dom
  recover(tooltipDom) {
    return this.#toolTipPool.push(tooltipDom)
  }
}
// 显示连个地图气泡
let ary = []
for (let i = 0, str; str = ["A", "B"][i++];) {
  let toolTip = toolTipFactory.create()
  toolTip.innterHTML = str
  ary.push(toolTip)
}
// 地图开始重新位置，需要把之前显示的两个节点收回
for (let i = 0, toolTip; toolTip = ary[i++];) {
  toolTipFactory.recover(toolTip)
}
// 重新渲染节点（服用以前创建的节点）
for (let i = 0, toolTip; toolTip = ary[i++];) {
  let toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
}

// 通用对象池

class ObjectPoolFactory {
  #objectpooll = [];
  #createObjFn = null;
  constructor(createObjFn) {
    this.#createObjFn = createObjFn;
  }
  create() {
    const obj = this.#objectpooll.length === 0 ? this.#createObjFn.apply(this, arguments) : this.#objectpooll.shift()
    return obj;
  }
  recover(obj) {
    this.#objectpooll.push(obj)
  }
}
const iframeFactory = new ObjectPoolFactory(function () {
  const iframe = document.createElement("iframe")
  document.body.appendChild(iframe)
  iframen.onload = function () {
    iframe.onload = null; // 防止iframe 重复加载的bug；
    iframeFactory.recover(iframe) // iframe 加载完成之后回收节点；
  }
  return iframe;
})
const iframe1 = iframeFactory.create()
iframe1.src = "http://so.com"

const iframe2 = iframeFactory.create();
iframe2.scr = "http://QQ.com"
setTimeout(function () {
  const iframe3 = iframeFactory.create();
  iframe3.src = "http://time.com"
}, 3000);