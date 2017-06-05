import { combineReducers, routerReducer } from 'redux-seamless-immutable'

const rootReducer = combineReducers({
  routing: routerReducer
})

export default rootReducer
