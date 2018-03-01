import * as React from 'react';
import { RouteConfig as ReactRouterConfig } from 'react-router-config';
import createLazyComponent from 'components/LazyComponent';

interface ApplicationRouteConfigParams extends ReactRouterConfig {
  async?: boolean;
  getComponent?: () => Promise<React.ComponentClass<any>>;
}

class RouterConfig implements ReactRouterConfig {
  constructor(params: ApplicationRouteConfigParams) {
    const component =
      params.async === true && params.getComponent
        ? createLazyComponent({
            getComponent: params.getComponent,
          })
        : params.component;
    const config: ReactRouterConfig = {
      path: params.path,
      exact: params.exact,
      strict: params.strict,
      component,
    };
    return config;
  }
}

export default RouterConfig;
