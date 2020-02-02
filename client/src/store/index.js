import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import * as reducers from './reducers';

const configureMiddleware = ({ ...thunkExtraArgument }) => {
  const middlewares = [
    thunkMiddleware.withExtraArgument(thunkExtraArgument),
  ];
  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};

export const configureStore = config => preloadedState => {
  const reducer = combineReducers(reducers);
  const middlewares = configureMiddleware(config);
  const composeEnhancers = composeWithDevTools;

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
};