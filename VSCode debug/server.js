//#region 
const http = require("http")

const server = http.createServer((req, res) => {
  res.end("Hello world!")
})


server.listen(3000,()=>{
  console.log("server is listening 3000")
})
//#endregion 