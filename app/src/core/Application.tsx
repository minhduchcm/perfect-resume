import * as React from 'react';
import * as ReactDom from 'react-dom';
import { combineReducers, Store, Reducer } from 'redux';
import { EventEmitter } from 'events';
import { History } from 'history';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { ConnectedRouter } from 'react-router-redux';

import RootState from './RootState';
import ConfiguredStore from './ConfiguredStore';
import Module from './Module';
import { RouteConfig, renderRoutes } from 'react-router-config';

interface ConstructorParams {
  name: string;
  dom: string;
}
type InitCallback = (app: Application) => void;
type ReadyCallback = (app: Application) => void;

class Application extends EventEmitter {
  public name: string;
  public rootEl: HTMLElement;
  public store: Store<RootState>;
  public history: History;

  private initCallback: InitCallback;
  private readyCallback: ReadyCallback;
  private modules: Module[] = [];

  public constructor(params: ConstructorParams) {
    super();
    this.name = params.name;

    const rootEl = document.getElementById(params.dom);
    if (rootEl === null) {
      throw new Error(`Node #${params.dom} does not exist!`);
    }
    this.rootEl = rootEl;
  }

  public init(initCallback: InitCallback) {
    this.initCallback = initCallback;
    return this;
  }

  public ready(readyCallback: InitCallback) {
    this.readyCallback = readyCallback;
    return this;
  }

  public async start() {
    if (this.initCallback !== undefined) {
      await this.initCallback(this);
    }
    this.history = createBrowserHistory();
    const configuredStore = new ConfiguredStore({
      reducers: this.getReducers(),
      history: this.history,
    });
    this.store = configuredStore.getReduxStore();

    if (this.readyCallback !== undefined) {
      await this.readyCallback(this);
    }
    this.render();
  }
  public async render() {
    const dom = (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <React.Fragment>{renderRoutes(this.getRoutes())}</React.Fragment>
        </ConnectedRouter>
      </Provider>
    );
    ReactDom.render(dom, this.rootEl);
  }

  public registerModules<T extends Module>(modules: T[]) {
    this.modules = modules;
  }

  public replaceReducers(newReducer: Reducer<RootState>) {
    this.store.replaceReducer(newReducer);
    this.render();
  }

  private getRoutes(): RouteConfig[] {
    const routes: RouteConfig[] = [];
    return routes.concat(
      ...this.modules.map(module => module.getRoutes(this)),
    ) as RouteConfig[];
  }
  private getReducers() {
    return combineReducers<RootState>({
      router: routerReducer,
      form: formReducer,
    });
  }
}

export default Application;
