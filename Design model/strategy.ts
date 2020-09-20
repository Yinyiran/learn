// 定义：定义一系列的算法，把他们一个个封装起来，并使它们可以相互替换、

// 就算年终奖
const calculateBonus = function (performanceLevel: string, salary: number) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}
// 缺点
// 1. 所有的if判断逻辑都要走一遍
// 2. 缺乏弹性，增加或修改参数都需要更改内部逻辑，违反开放-封闭原则
// 3. 算法复用性差，类似的逻辑只能复制粘贴一遍

// 将算法的使用和算法的实现分割开来，