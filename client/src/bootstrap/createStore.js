import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

export default (reducers, initialState, history, extra = {}) => {
  const middleware = [
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument(extra),
  ];

  let devTool = f => f;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof window.devToolsExtension !== 'undefined')
      devTool = window.devToolsExtension();
  }

  return createStore(
    combineReducers(reducers),
    fromJS(initialState),
    compose(applyMiddleware(...middleware), devTool),
  );
};
