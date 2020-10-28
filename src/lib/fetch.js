import { notification } from "ant-design-vue";
import { encode } from "querystring";
import config from "../config";

export const POST = function(url, data = {}) {
  // Default options are marked with *
  return fetch(config.suffix + url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      "content-type": "application/json",
      // "content-type": "application/x-www-form-urlencoded"
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  })
    .then(function(response) {
      if (!response.ok) {
        notification.error({
          message: `请求接口 ${url} 失败`,
          description: `${response.status}: ${response.statusText}`,
          duration: 2,
        });
      }

      return response.json();
    })
    .then((res) => {
      if (res.success === false) {
        console.log(res);
        window.dispatchEvent(new Event("toHome"));
      }
      return res;
    });
};

export const GET = function(url, data = {}) {
  // Default options are marked with *
  return fetch(config.suffix + url + "?" + encode(data), {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  })
    .then(function(response) {
      if (!response.ok) {
        notification.error({
          message: `请求接口 ${url} 失败`,
          description: `${response.status}: ${response.statusText}`,
          duration: 2,
        });
      }
      return response.json();
    })
    .then((res) => {
      if (res.success === false) {
        notification.error({
          message: `请求接口 ${url} 失败`,
          duration: 2,
        });
      }

      return res;
    });
};

export const DOWNLOAD = function(fileName, data = "") {
  var elementA = document.createElement("a");

  //文件的名称为时间戳加文件名后缀
  elementA.download = fileName;
  elementA.style.display = "none";

  //生成一个blob二进制数据，内容为json数据
  var blob = new Blob([data]);

  //生成一个指向blob的URL地址，并赋值给a标签的href属性
  elementA.href = URL.createObjectURL(blob);
  document.body.appendChild(elementA);
  elementA.click();
  document.body.removeChild(elementA);
};
