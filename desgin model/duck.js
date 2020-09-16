
let duckSinging = () => {
  console.log("嘎嘎嘎")
}
let duck = {
  duckSinging
}
let chicken = {
  duckSinging
}

let choir = [];
let joinchoir = (animal) => {
  if (animal && typeof animal.duckSinging == "function") {
    choir.push(animal)
    console.log(`Welcome to join choir, The choir has ${choir.length} numbers`)
  }
}
joinchoir(duck)
joinchoir(chicken)