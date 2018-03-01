import { v4 } from 'uuid';

class AppModule {
  constructor({ name, reducer, routes, onReady }) {
    const _id = v4();
    Object.defineProperty(this, 'id', {
      enumerable: true,
      get: () => _id,
    });

    const _name = name;
    Object.defineProperty(this, 'name', {
      enumerable: true,
      get: () => _name,
    });

    const _reducer = reducer;
    Object.defineProperty(this, 'reducer', {
      enumerable: true,
      get: () => _reducer,
    });

    const _routes = routes;
    Object.defineProperty(this, 'routes', {
      enumerable: true,
      get: () => _routes,
    });

    const _onReady = onReady;
    Object.defineProperty(this, 'onReady', {
      enumerable: true,
      get: () => _onReady,
    });
  }
}

export default AppModule;
