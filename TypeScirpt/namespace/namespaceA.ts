// 随着更多验证器的加入，我们需要一种手段来组织代码，
// 以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。 
// 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。
namespace Validation2 {
  //接口和类在命名空间之外也是可访问
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }
  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s)
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
  }
}

let stringArr = ["Hello", "9805", "101"]
let validators2: { [s: string]: Validation2.StringValidator; } = {};
validators2["ZIP code"] = new Validation2.ZipCodeValidator();
validators2["Letters only"] = new Validation2.LettersOnlyValidator();

for (const s of stringArr) {
  for (let name in validators2) {
    let isMatch = validators2[name].isAcceptable(s)
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}`)
  }
}
namespace Validation2 {
  export function doAnimalsHaveMuscles() {
    // return lettersRegexp
    return LettersOnlyValidator
  }
}