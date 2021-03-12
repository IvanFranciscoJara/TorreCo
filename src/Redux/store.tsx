import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import customFilters, { restoreStorageCustomFilters } from './CustomFiltersDuck'
import globalState from './GlobalStateDuck'
let rootReducer = combineReducers({
  globalState,
  customFilters,
})
export type RootState = ReturnType<typeof rootReducer>

export default function generateStore() {
  let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  console.log('iniciando REDUX') // This occurs when Redux start
  restoreStorageCustomFilters()(store.dispatch)
  // restoreStorageActionTempValues()(store.dispatch)
  return store
}
