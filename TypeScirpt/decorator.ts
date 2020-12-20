// 类装饰器在类神明之前被申明，类装饰器应用于类构造函数，可以用于监视，修改或者替换类的定义
function logClass(params: any) {
  console.log(params);
  params.prototype.apiUrl = "动态扩展属性"
  params.prototype.run = function () {
    console.log("动态扩展方法")
  }
  params.prototype.getDate = function () {
    console.log("动态扩展方法2")
  }
}
@logClass
class HttpClient {
  constructor() { }
  getDate() {
    console.log(1)
  }
}
let http: any = new HttpClient();
console.log(http.apiUrl)