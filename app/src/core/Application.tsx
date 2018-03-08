import * as React from 'react';
import * as ReactDom from 'react-dom';
import { combineReducers, Store, Reducer } from 'redux';
import { EventEmitter } from 'events';
import { History } from 'history';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';

import RootState from './RootState';
import Module from './Module';

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

  private mainModule: Module;

  public constructor(params: ConstructorParams) {
    super();
    this.name = params.name;

    const rootEl = document.getElementById(params.dom);
    if (rootEl === null) {
      throw new Error(`Node #${params.dom} does not exist!`);
    }
    this.rootEl = rootEl;
    this.mainModule = new Module({
      name: 'main',
    });
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
    await this.mainModule.init(this);

    if (this.initCallback !== undefined) {
      await this.initCallback(this);
    }

    if (this.readyCallback !== undefined) {
      await this.readyCallback(this);
    }
    this.render();
  }

  public async render() {
    const routes = await this.mainModule.getRoutes();
    const dom = (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Switch>{renderRoutes(routes)}</Switch>
        </ConnectedRouter>
      </Provider>
    );
    ReactDom.render(dom, this.rootEl);
  }

  public replaceReducers(newReducer: Reducer<RootState>) {
    this.store.replaceReducer(newReducer);
    this.render();
  }

  public registerModules(appModules: Module[]) {
    this.mainModule.registerSubModules(appModules);
  }

  public async getReducers() {
    const moduleReducers = await this.mainModule.getReducers();
    if (moduleReducers !== null) {
      return combineReducers<RootState>({
        router: routerReducer,
        form: formReducer,
        features: moduleReducers,
      });
    }
    return combineReducers<RootState>({
      router: routerReducer,
      form: formReducer,
    });
  }
}

export default Application;
