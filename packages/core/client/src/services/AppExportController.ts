import request from 'umi-request';
import { HOST } from '../constant/host';

/* 获取源文件 */
export async function querySourceCode() {
  return request(`${HOST}/api/app/download`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    withCredentials: true,
  });
}

/* 删除源文件 */
export async function deleteSourceCode() {
  return request(`${HOST}/api/app/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    withCredentials: true,
  });
}
