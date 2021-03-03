// 高内聚，低耦合
// 高内聚：就是一个函数尽量只做一件事；
// 低耦合：两个模块之间的关联程度低；

// 上面的代码是一个不太好的示例，因为母公司在计算利润时，直接操作了子公司的数据。更好的做法是，子公司直接将利润返回给母公司

class Parent {
  getProfit(...subs) {
    let profit = 0;
    subs.forEach((sub) => {
      // profit += sub.revenue - sub.cost;  //不要直接操作了子公司的数据
      profit += sub.getProfit(); 
    });
    return profit;
  }
}

class Sub {
  constructor(revenue, cost) {
    this.revenue = revenue;
    this.cost = cost;
  }
  // 自身提供数据，不要在外部计算，多处调用可以
  getProfit() {
    return this.revenue - this.cost;
  }
}
const p = new Parent1();
const s1 = new Sub1(100, 10);
const s2 = new Sub1(200, 150);
console.log(p.getProfit(s1, s2));

// 应用场景   
// 按照高内聚、低耦合的要求，一个函数应该尽量只做一件事。所以我们可以将函数中的另外两个功能：验证和转换单独提取出来，封装成一个函数。
// 例子 注册功能
function register(data){
  // 1. 验证用户数据是否合法
  vertification();
  // 2. 如果用户上传头像，将
  toBase64();
  // 3.调用注册
}

// 模块化w

// 组件化