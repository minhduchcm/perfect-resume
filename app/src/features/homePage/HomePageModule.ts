import Module, { ConstructorParams } from 'core/Module';
import RouterConfig from 'core/RouterConfig';

class HomePageModule extends Module {
  constructor(params: ConstructorParams) {
    super(params);
  }
  public getRoutes() {
    return [
      new RouterConfig({
        path: '/',
        exact: true,
        async: true,
        getComponent: async () =>
          (await import(/* webpackChunkName: "homepage" */ './components/HomePage'))
            .default,
      }),
    ];
  }
}

export default HomePageModule;
