const person = function (name: any) {
  this.name = name;
  this.say = () => {
    return `I'm ${this.name}`
  }
}

try {
  // 一些不好的事情发生了，抛出错误
  throw {
    name: "MyErrorType", // 自定义错误类型
    message: "oops",
    extra: "This was rather embarrassing",
    remedy: () => {
      console.log("handler error")
    } // 应该由谁处理
  };
} catch (e) {
  // 通知用户
  alert(e.message); // "oops"

  // 优雅地处理错误
  e.remedy(); // 调用genericErrorHandler()
}