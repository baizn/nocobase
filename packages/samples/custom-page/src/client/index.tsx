import { RouteSwitchContext, AdminLayout } from '@nocobase/client';
import React, { useContext } from 'react';

const HelloWorld = () => {
  return <div>Hello ui router</div>;
};

export default React.memo((props) => {

  const { routes, ...others } = useContext(RouteSwitchContext);
  
  routes[1].routes.unshift(
    {
      type: 'route',
      path: '/admin/yh2l1okydow/detail',
      component: HelloWorld,
      uiSchemaUid: routes[1].uiSchemaUid,
    },
  );
  
  return <RouteSwitchContext.Provider value={{ ...others, routes }}>{props.children}</RouteSwitchContext.Provider>;
});