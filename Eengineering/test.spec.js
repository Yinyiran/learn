// 单元测试应该怎么写
// 1. 根据正确性写测试，即正确的输入应该有正确的结果。
// 2. 根据错误性写测试，即错误的输入应该是错误的结果。

function sum(a, b) {
  return a + b;
}

function abs(a) {
  if (typeof a != "number") {
    throw new TypeError("参数 必须为数值类型");
  }
  if (a < 0) return -a;
  return a;
}
test("adds 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("abs", () => {
  expect(abs(1)).toBe(1);
  expect(abs(-1)).toBe(1);
  expect(abs(0)).toBe(1);
  expect(() => abs("abc")).toThrow(TypeError);
});

document.querySelector("input").onchange = function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (res) => {
    const fileResult = res.target.result;
    console.log(fileResult);
  };
  reader.readAsDataURL(file);
};

document.querySelector("input").onchange = function (e) {
  const file = e.target.files[0];
  tobase64(file);
};
function tobase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (res) => {
      const fileResult = res.target.result;
      resolve(fileResult);
    };
  });
}
