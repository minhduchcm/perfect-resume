import { fromJS } from 'immutable';
import {
  createStore,
  applyMiddleware,
  compose,
  Reducer,
  GenericStoreEnhancer,
  StoreEnhancerStoreCreator,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { Store } from 'react-redux';
import { History } from 'history';

import RootState from './RootState';

export namespace ConfiguredStoreInterface {
  export interface CreateStoreParams {
    reducers: Reducer<RootState>;
    initialState?: RootState;
    history: History;
    extra?: any;
  }
}

class ConfiguredStore {
  private store: Store<RootState>;

  public constructor(params: ConfiguredStoreInterface.CreateStoreParams) {
    this.store = this._createConfiguredStore(params);
  }

  public getReduxStore() {
    return this.store;
  }

  private _createConfiguredStore({
    reducers,
    initialState,
    history,
    extra,
  }: ConfiguredStoreInterface.CreateStoreParams) {
    const middleware = [
      routerMiddleware(history),
      thunkMiddleware.withExtraArgument(extra || {}),
    ];

    let devTool = (next: StoreEnhancerStoreCreator<RootState>) => next;

    if (process.env.NODE_ENV !== 'production') {
      const windowIfDefined =
        typeof window === 'undefined' ? null : (window as any);
      const devToolsExtension =
        windowIfDefined &&
        (windowIfDefined.devToolsExtension as () => GenericStoreEnhancer);
      if (devToolsExtension !== undefined) {
        devTool = devToolsExtension();
      }
    }

    return createStore(
      reducers,
      fromJS(initialState),
      compose(applyMiddleware(...middleware), devTool),
    );
  }
}

export default ConfiguredStore;
