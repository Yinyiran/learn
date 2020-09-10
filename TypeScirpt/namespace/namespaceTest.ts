/// <reference Path="Validation.ts" />
/// <reference Path="LettersOnlyValidator.ts" />
/// <reference Path="ZipCodeValidator.ts" />
let strArr = ["Hellog"]
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

for (let s of strArr) {
  for (let name in validators) {
    console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
  }
}