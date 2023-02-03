import { Spin } from 'antd';
import React, { createContext, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAPIClient } from '@nocobase/client'
import { useRequest } from '../api-client';

export const CurrentUserContext = createContext(null);

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
}

export const CurrentUserProvider = (props) => {
  const location = useLocation();
  let result = useRequest({
    url: 'users:check',
  });
  if (result.loading) {
    return <Spin />;
  }
  const { pathname, search } = location;
  // let redirect = `?redirect=${pathname}${search}`;
  if (!result?.data?.data?.id) {
    // 自动登录
    const autoLoggin = async () => {
      const user = {
        password: '123',
        email: 'test@antv.com'
      }
      const api = useAPIClient();

      await api.auth.signIn(user);
    }

    autoLoggin()

    result = useRequest({
      url: 'users:check',
    });

    // return <Redirect to={`/signin${redirect}`} />;
  }
  return <CurrentUserContext.Provider value={result}>{props.children}</CurrentUserContext.Provider>;
};
