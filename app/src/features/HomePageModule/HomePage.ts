import Application from 'core/Application';
import Module, { ConstructorParams } from 'core/Module';
import RouteConfig from 'core/RouteConfig';
import createLazyComponent from 'components/LazyComponent';

import homePageReducer from './homePageReducer';
import { combineReducers } from 'redux-immutable';

class HomePage extends Module {
  constructor(params: ConstructorParams) {
    super(params);
  }

  public async init(app: Application) {
    super.init(app);
  }

  public async getRoutes(): Promise<RouteConfig[]> {
    return [
      new RouteConfig({
        path: '/',
        component: createLazyComponent({
          getComponent: async () =>
            (await import(/* webpackChunkName: "homepage" */ './components/HomePage'))
              .default,
          onBeforeLoadRoute: this.asyncRegisterReducer,
        }),
        routes: await super.getRoutes(),
      }),
    ];
  }

  public asyncRegisterReducer = async () => {
    // console.debug('a', this);
  };

  public async getReducers() {
    const childrenReducers = await this.getChildrenReducers();
    return combineReducers({
      reducer: homePageReducer,
      children: combineReducers(childrenReducers || {}),
    });
  }
}

export default HomePage;
