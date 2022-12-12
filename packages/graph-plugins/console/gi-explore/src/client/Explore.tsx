import React from 'react';
// import GISDK, { utils } from '@antv/gi-sdk';

import { GI_PROJECT_CONFIG, SERVER_ENGINE_CONTEXT, GI_ASSETS_PACKAGE } from './Constant';

//@ts-ignore
const { getCombineServices, loaderCombinedAssets } = window.GISDK.utils;
window.localStorage.setItem('SERVER_ENGINE_CONTEXT', JSON.stringify(SERVER_ENGINE_CONTEXT));

const GraphExploreApp = props => {
  const [state, setState] = React.useState({
    isReady: false,
    assets: null,
    config: {},
    services: [],
  });

  React.useEffect(() => {
    loaderCombinedAssets(GI_ASSETS_PACKAGE).then(res => {
      /** 生成服务 */
      const services = getCombineServices(res.services);
      setState(preState => {
        return {
          ...preState,
          isReady: true,
          assets: res,
          services,
          config: GI_PROJECT_CONFIG,
        };
      });
    });
  }, []);
  const { assets, isReady, config, services } = state;
  if (!isReady) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
        {/** @ts-ignore */}
        <window.GISDK.default config={config} assets={assets} services={services} />
      </div>
    </div>
  );
};

export default GraphExploreApp;
