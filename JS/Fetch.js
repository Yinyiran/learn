let url = "https://api.github.com/users/ruanyf";
fetch("")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

async function Fetch() {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("Request Failed", error);
  }
}

// Response 对象：处理HTTP回应
const response = await fetch(url);
const response = {
  ok: true, // 表示是否成功 对应HTTP请求状态的200-299
  status: 200, // HTTP回应状态码
  statusText: "OK", // HTTP 回应的状态信息
  url: "", // 属性返回请求的URL，如果URL存在跳转，该属性返回的是最终URL，
  type: "basic", // basic:同源请求；cors：跨域请求；error：网络错误；opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值表示发出的是简单的跨域请求；opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值
  redirected: Boolean, // 表示是否发生过跳转；
};

// 判断是否请求成功  4xx 或 5xx 不会报错
// fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。
async function fetchText() {
  let response = await fetch("/readmen.text");
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
// 另一种方法是判断response.ok是否为true。
