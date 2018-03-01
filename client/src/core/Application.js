import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import EventEmitter from 'events';
import { reducer as formReducer } from 'redux-form';
import { ConnectedRouter as Router, routerReducer } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import values from 'lodash/values';

import createStore from 'bootstrap/createStore';

class Application extends EventEmitter {
  constructor(name, cookie) {
    super();

    const _name = name;
    Object.defineProperty(this, 'name', {
      enumerable: true,
      get: () => _name,
    });

    const _reducers = {
      router: routerReducer,
      form: formReducer,
    };
    Object.defineProperty(this, 'reducers', {
      enumerable: false,
      get: () => _reducers,
    });

    const _modules = {};
    Object.defineProperty(this, 'modules', {
      enumerable: true,
      get: () => _modules,
    });

    const _cookie = cookie;
    Object.defineProperty(this, 'cookie', {
      enumerable: false,
      get: () => _cookie,
    });

    Object.defineProperty(this, 'didStart', {
      enumerable: true,
      value: false,
      writable: true,
    });
  }

  register(newModule) {
    if (newModule.reducer) {
      this.registerReducer(newModule.name, newModule.reducer);
    }
    this.modules[newModule.name] = newModule;

    this.emit('moduleDidRegister', this, newModule);

    if (newModule.subModules) this.registerSubModules(newModule);
  }

  registerReducer(name, reducer) {
    this.reducers[name] = reducer;
  }

  registerSubModules(parent) {
    return parent.subModules.map(m => this.register(m));
  }

  resolveRoutes() {
    return values(this.modules)
      .filter(m => !m.parent)
      .filter(m => !!m.routes)
      .map(m => this.resolveRoutesForModule(m));
  }

  resolveRoutesForModule(m) {
    const children = this.getSubmodulesOf(m).filter(m => !!m.routes);
    const childrenRoute = children.map(c => this.resolveRoutesForModule(c));
    return React.cloneElement(m.routes(this.store, m, childrenRoute), {
      key: m.name,
    });
  }
  getSubmodulesOf(module) {
    return values(this.modules).filter(m => m.parent === module.name);
  }

  init(callback) {
    this._init = () =>
      new Promise((resolve, reject) => {
        callback(this, resolve, reject);
      });
    return this;
  }

  ready(callback) {
    this._ready = () =>
      new Promise((resolve, reject) => {
        const modules = values(this.modules).filter(m => !!m.onReady);
        modules.forEach(async m => await m.onReady(this));
        callback(this, resolve, reject);
      });

    return this;
  }
  async reStart(id) {
    await this._init();
    this.store.replaceReducer(combineReducers(this.reducers));
    this.emit('applicationDidRestart', this);
    await this.render(id);
  }

  async start(id) {
    await this._init();

    const _history = createHistory();
    const _store = createStore(this.reducers, {}, _history, {
      cookie: this.cookie,
    });

    Object.defineProperty(this, 'store', {
      enumerable: true,
      get: () => _store,
    });

    Object.defineProperty(this, 'history', {
      enumerable: false,
      get: () => _history,
    });

    await this._ready();

    this.didStart = true;
    await this.render(id);

    this.emit('applicationDidStart', this);
  }

  replaceModule(newModule) {
    const currentModule = this.modules[newModule.name];
    if (currentModule !== undefined && currentModule.id === newModule.id)
      return;
    if (newModule.reducer) {
      this.registerReducer(newModule.name, newModule.reducer);
    }
    this.modules[newModule.name] = newModule;

    if (newModule.subModules) this.replaceSubModules(newModule);
  }

  replaceSubModules(parent) {
    return parent.subModules.map(m => this.replaceModule(m));
  }

  async render(id) {
    const root = document.getElementById(id);
    if (!root) {
      throw new Error(`Node #${id} does not exist!`);
    }
    ReactDOM.render(
      <Provider store={this.store}>
        <Router history={this.history}>
          <Fragment>
            <Switch>{this.resolveRoutes()}</Switch>
          </Fragment>
        </Router>
      </Provider>,
      root,
    );
    return this;
  }
}

export default Application;
