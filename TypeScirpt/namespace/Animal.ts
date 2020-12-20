export namespace A {
  interface Animal {
    name: String
    eat(): void
  }
  export class Dog implements Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() {
      console.log(`I'm ${this.name}`)
    }
  }
}
export namespace B {
  interface Animal {
    name: string;
    eat(): void
  }
  export class Dog implements Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    eat() { }
  }
}