// 引入request
import request from "../libs/request";

export function login(data) {
  return request({
    url: "/example/uesr",
    method: "get",
    data,
  });
}
/**
 * @name getFile 告知书
 * */
export function queryNotice(params = {}) {
  return request({
    url: "/noticeSheet/queryNotice",
    method: "get",
    params,
  });
}
