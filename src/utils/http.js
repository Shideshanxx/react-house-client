import { Toast } from 'antd-mobile';

export default function http({
  url,
  method = 'post',
  headers = {},
  body = {},
  setLoading,
  setResult,
}) {
  setLoading && setLoading(true);

  const token = localStorage.getItem('token');
  let defaultHeader = {
    'Content-type': 'application/json'
  };
  defaultHeader = token ? {
    ...defaultHeader,
    token
  } : defaultHeader;

  let params;
  if(method.toUpperCase() === 'GET'){
    params = undefined;
  }else {
    params = {
      headers: {
        ...defaultHeader,
        headers
      },
      method,
      body: JSON.stringify(body)
    }
  }

  return new Promise((resolve, reject)=>{
    fetch('/api' + url, params)
      .then(res => res.json())
      .then(res => {
        if(res.status === 200){
          resolve(res.data);
          setResult && setResult(res.data);
        }else {
          // 1001是后端中间件拦截时未登录返回的状态码
          if (res.status === 1001) {
            // location.href = '/login?from=' + location.pathname;
            // 改成hash
            location.hash = '#/login?from=' + location.pathname;
            localStorage.clear();
          }
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch(err => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      })
  });
}