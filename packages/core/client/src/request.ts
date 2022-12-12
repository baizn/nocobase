import { extend } from 'umi-request';
const ACCESS_ID = '';
const ACCESS_KEY = '';

export const HTTP_SERVICE_URL = 'http://geaflowconsole-31.gz00b.dev.alipay.net';

export const request = extend({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    accessId: ACCESS_ID,
    accessPwd: ACCESS_KEY,
  },
  credentials: 'include',
  responseType: 'json',
  errorHandler: error => {
    console.log(error);
  },
});
