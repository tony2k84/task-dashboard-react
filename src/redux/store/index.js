import { createBrowserHistory as createHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router']
}
const history = createHistory()
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = routerMiddleware(history);

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    middleware,
    thunk,
    promiseMiddleware()));

let store = createStore(
  connectRouter(history)(persistedReducer),
  enhancer
)

let persistor = persistStore(store)


export {
  store,
  persistor,
  history
}