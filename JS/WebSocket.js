// https://www.ruanyifeng.com/blog/2017/05/websocket.html
const div = document.getElementById("message")
const ws = new WebSocket("wss://echo.websocket.org");
ws.onopen = (evt) => {
  console.log("Connect open ....", evt)
  ws.send("Hello WebSocket");
  console.log("readyState", ws.readyState);
  setTimeout(() => {
    ws.close();
  }, 10000);
}
// 可以给open事件添加多个监听回调
ws.addEventListener("open", (event) => {
  ws.send("addEventListener Hello WebSocket")
})
// 
ws.onmessage = (message) => {
  if (typeof message.data === "string") {
    console.log("Received string:", message.data)
  } else if (message.data instanceof ArrayBuffer) {
    const buffer = message.data
    console.log(`Received ArrayBuffer`)
  }
  div.innerText = message.data
  console.log("readyState", ws.readyState)
}
ws.onclose = (evt) => {
  console.log("onclose：", evt)
}
ws.onerror = (err) => {
  console.log(err)
}

// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);


const file = document.querySelector("input[type='file'").files[0]
ws.send()
switch (ws.readyState) {
  // 值为0，表示正在连接
  case WebSocket.CONNECTING:
    break;
  // 值为1，表示连接成功，可以通信了
  case WebSocket.OPEN:
    break;
  // 值为2，表示连接正在关闭
  case WebSocket.CLOSING:
    break;
  // 值为3，表示连接已经关闭，或者打开连接失败
  case WebSocket.CLOSED:
    break;
  default:
    console.log("readyState is not exist")
    break;
}
