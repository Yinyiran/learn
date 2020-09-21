// 定义：定义一系列的算法，把他们一个个封装起来，并使它们可以相互替换、
// 就算年终奖
var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4;
    }
    if (performanceLevel === 'A') {
        return salary * 3;
    }
    if (performanceLevel === 'B') {
        return salary * 2;
    }
};
// 缺点
// 1. 所有的if判断逻辑都要走一遍
// 2. 缺乏弹性，增加或修改参数都需要更改内部逻辑，违反开放-封闭原则
// 3. 算法复用性差，类似的逻辑只能复制粘贴一遍
// 定义一些列的算法，把他们各自封装成策略类，算法被封装在策略类内部的方法里，客户对Contenxt发起请求的时候
// Context总是把请求委托给这些策略对象中间的某一个进行计算
// 重构
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
};
var calculateB = function (level, salary) {
    return strategies[level](salary);
};
console.log(calculateB("A", 2000));
// 总结
// 通过使用策略模式重构代码，我们消除了原程序中大片的条件分支语句。所有跟计算奖金有关的逻辑不再放在Context中
// 而是分布在各个策略对象中。 Context并没有计算奖金的能力，而是把这个职责委托给了某个策略对象。
// 每个策略对象负责的算法已被各自封装在对象内部。当我们对这些策略对象发出“计算奖金”的请求时，
// 它们会返回各自不同的计算结果，这正是对象多态性的体现，也是“它们可以相互替换”的目的。
// 案例1：小球运动
var tween = {
    // t:动画已消耗的时间；b:小球原始位置；c:小球目标位置；d:动画持续的总时间；返回的值：动画元素应该处在的当前位置
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineassOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};
var Animate = /** @class */ (function () {
    function Animate(dom) {
        this.dom = dom;
        this.startTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.propertyName = null; // dom 需要改变的css属性名
        this.easing = null; // 缓动算法
        this.duration = null; // 动画持续时间
    }
    Animate.prototype.start = function (propertyName, endPos, duration, easing) {
        var _this = this;
        this.startTime = +new Date;
        this.startPos = this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];
        var timeId = setInterval(function () {
            if (_this.step() === false) {
                clearInterval(timeId);
            }
        }, 19);
    };
    Animate.prototype.step = function () {
        var t = +new Date;
        if (t >= this.startTime + this.duration) {
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos);
    };
    Animate.prototype.update = function (pos) {
        this.dom.style[this.propertyName] = pos + "px";
    };
    return Animate;
}());
// const div = document.getElementById("div");
// const animate = new Animate(div)
// animate.start("left", 500, 1000, "strongEaseOut")
// animate.start("top", 1000, 500, "strongEaseIn")
// 例子2：表单验证
var validators = {
    isNonEmpty: function (value, errorMsg) {
        if (value === "") {
        }
    }
};
