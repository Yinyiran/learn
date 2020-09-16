// Parent构造函数
function Parent(name) {
  this.name = name || "Admin"
}
// 增加原型方法
Parent.prototype.say = function () {
  console.log(this.name)
  return this.name;
}
function Child() {
  Parent.apply(this, arguments)
}
// 继承
inherit(Child, Parent)

function inherit(c, p) {
  c.prototype = new p("HEhe")
}
// 原型（prototype属性）应该指向一个对象,指向由被继承的构造函数创建的实例（对象）
// 子类继承了父类的this.name say()方法
let kid = new Child();
kid.say();
console.log(kid)

function Article() {
  this.tags = ['js', 'css']
}
let article = new Article()
function BlogPost() { }
BlogPost.prototype = article;
var blog = new BlogPost();

function StaticPage() {
  Article.call(this); // 复制属性
}
let page = new StaticPage();

console.log(article.hasOwnProperty("tags"))
console.log(blog.hasOwnProperty("tags"))
console.log(page.hasOwnProperty("tags"))

// 利用借用构造函数模式实现多继承（无法继承原型，无法复用方法）
function Cat() {
  this.legs = 4;
  this.say = function () {
    return "meaowww"
  }
}

function Bired() {
  this.wings = 2;
  this.fly = true;
}

function CatWings() {
  Cat.apply(this);
  Bired.apply(this);
}
let jane = new CatWings();
console.dir(jane)

function inherit(C, P) {
  var F = function () { };
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
}