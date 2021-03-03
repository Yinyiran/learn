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
export { sum, abs };
