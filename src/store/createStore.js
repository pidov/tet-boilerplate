import { applyMiddleware, compose, createStore } from 'redux'
import {stateTransformer} from 'redux-seamless-immutable'

import rootReducer from '~reducers'
import initialState from './initialState'

export default function configureStore (history) {
  let middlewares = []
  let enhancers = []

   if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`)
    const logger = createLogger({ stateTransformer })
    middlewares.push(logger)
  }

  enhancers.push(applyMiddleware(...middlewares))

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const storeEnhancers = compose (...enhancers)

  const store = createStore(rootReducer, initialState, storeEnhancers)

  if (module.hot) {
    console.log('Hot reducer')
    module.hot.accept('~reducers', () => {
      const nextReducer = require('~reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}