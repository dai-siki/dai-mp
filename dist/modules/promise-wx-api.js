const promiseWxApi = (api, params) => {
  return new Promise((reslove, reject) => {
    if (typeof wx[api] === "function") {
      wx[api]({
        ...params,
        success(res) {
          reslove({
            msg: "success",
            data: res
          });
        },
        fail(err) {
          reslove({
            msg: err.errMsg,
            data: ""
          });
        }
      });
    } else {
      reject({
        msg: "非有效api接口",
        data: ""
      });
    }
  });
};

// 其实就是一层柯里化，但第二参数可以不写
const createPromiseWxApi = (api) => {
  return (params = {}) => promiseWxApi(api, params);
};

export default createPromiseWxApi;
