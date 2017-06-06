/// ********************************************************************///
///                      DO NOT EDIT MANUALLY!                          ///
/// The file will be overwritten when using 'npm run generate reducer'  ///
/// Please edit the template file (/scripts/templates/rootReducer.mst)  ///
/// if you need to make any changes.                                    ///
/// ********************************************************************///

import {combineReducers, routerReducer} from 'redux-seamless-immutable'


const rootReducer = combineReducers({
  routing: routerReducer
})

export default rootReducer
