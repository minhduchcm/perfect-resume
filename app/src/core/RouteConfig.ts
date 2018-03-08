import { RouteConfig as ReactRouterRouteConfig } from 'react-router-config';

interface ApplicationRouteConfigParams extends ReactRouterRouteConfig {}

class RouteConfig implements ReactRouterRouteConfig {
  constructor(params: ApplicationRouteConfigParams) {
    const config: ReactRouterRouteConfig = {
      path: params.path,
      exact: params.exact,
      strict: params.strict,
      routes: params.routes,
      component: params.component,
    };
    return config;
  }
}

export default RouteConfig;
