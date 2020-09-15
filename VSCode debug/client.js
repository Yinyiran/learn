//#region 
const http = require("http")

const server = http.createServer((req, res) => {
  res.end("Hello world! server 4000")
})


server.listen(4000, () => {
  console.log("server is listening 4000")
})
//#endregion