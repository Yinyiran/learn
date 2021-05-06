
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal2 {
  numLegs: number;
}

class Bee extends Animal2 {
  keeper: BeeKeeper;
}

class Lion extends Animal2 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal2>(c: new () => A): A {
  return new c();
}

//#endregion

//#region 类   
// 类 
class Greeter {
  greeting: string; // 属性
  // 构造函数  
  constructor(message: string) {
    this.greeting = message;
  }
  // 方法
  greet() {
    return "Hello" + this.greeting;
  }
}
// 构造类实例
let greeter = new Greeter("world")
console.log(greeter)

// 继承
// 1.pulic在当前类里面、子类、类外面都可以访问
// 2.protected 在当前类和子类内部都可以访问，类外部无法访问
// 3.private在当前类内部可以访问，子类、类外部都无法访问
class Animal {
  name: string; // 默认public
  #maxLen: number; // 私有属性 只能类内部使用 派生类、实例不能访问 同private age
  private _fullName = "";
  protected location: string; // 基类和派生类当中能访问  实例当中不能访问
  readonly height: number; // 只读属性
  static origin = { x: 0, y: 0 } // 静态属性，存在于类本身而不是类的实例上(其他属性都是实例化之后才会被初始化) 访问时需要加基类名：Animal.orrigin
  // 构造函数    readonly width: number 同height 但是简写
  constructor(theName: string, len = 0, readonly width?: number) {
    this.name = theName;
    this.#maxLen = len;
    this.height = 20;// 初始化时可以赋值；
    this.location = ""
    console.log(Animal.origin);
  }
  // 存取器
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > this.#maxLen) {
      throw new Error(`fullName has a max length of ${this.#maxLen}`)
    }
    this._fullName = newName;
  }
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}`)
  }
}
// D  og(派生类) 从基类Animal(超类)继承了 属性和方法；
class Dog extends Animal {
  constructor(name: string) {
    super(name, 10) // 在使用this之前调用super() 
  }
  // 此处重写了基类的move方法
  move(distanceInMeters = 5) {
    console.log("dog run");
    console.log(this.location); // 可以访问protected属性
    super.move(distanceInMeters) // 调用基类的方法
  }
}
class Horse extends Animal {
  constructor(name: string) {
    super(name, 10) // 执行基类的构造函数
  }
  // 重写父类方法
  move(distanceInMeters = 5) {
    console.log(`Galloping...`)
    super.move(distanceInMeters)
  }
}
const dog = new Dog("Sammy the Python")
const tom: Animal = new Horse("Tommy the Palomino")
dog.move();
tom.move(20);

dog.fullName = "fawejfo" //
console.log(dog.fullName);

// 抽象类  作为基类使用，不会呗实例化，抽象方法必须在派生类中实现
// 通过抽象方法 / 方法重载--实现多态--多态的作用是用来定义标准
// 1.抽象类无法 实例化
// 2.非抽象类继承抽象父类时，不会自动实现来自父类的抽象成员必须手动定义父类中的抽象成员
// 3.抽象成员包括属性和方法
abstract class Human {
  country: string;
  abstract makeSound(): void; // 必须在派生类当中实现
  constructor(country: string) {
    this.country = country
  }
  sayHi(): void {
    console.log(`Hello I'm ${this.country}`);
  }
  sayHou(): string {
    return "lalal"
  }
}
class America extends Human {
  constructor() {
    super("America")
  }
  makeSound(): void {
    console.log("I speack English")
  }
  notInAbstract(): void {
    console.log("south ")
  }
}
let man = new America();
man.notInAbstract();


// 把类作为接口使用
class PointA {
  x?: number;
  y?: number;
}
interface Point3d extends PointA {
  z: number;
}
let point3d: Point3d = { x: 1, y: 2, z: 3 }

//#endregion

export { Animal };