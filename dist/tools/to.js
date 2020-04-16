// 封装promise对象，避免报错，返回[err, data]
export default function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}
