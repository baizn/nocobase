import { APIClient as APIClientSDK } from '@nocobase/sdk';
import { Result } from 'ahooks/lib/useRequest/src/types';
import { notification } from 'antd';
import React from 'react';

export class APIClient extends APIClientSDK {
  services: Record<string, Result<any, any>> = {};

  service(uid: string) {
    return this.services[uid];
  }

  interceptors() {
    super.interceptors();
    this.notification();
  }

  notification() {
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const redirectTo = error?.response?.data?.redirectTo;
        if (redirectTo) {
          return (window.location.href = redirectTo);
        }
        if (error?.response?.data?.errors) {
          notification.error({
            message: error?.response?.data?.errors?.map?.((error: any) => {
              return React.createElement('div', { children: error.message || '账号或密码错误' });
            }),
          });
          throw error;
        } else {
          notification.error({
            message: '登录失败',
            description: error?.response?.data,
          });
        }
      },
    );
  }
}
