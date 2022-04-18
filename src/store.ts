import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { NavigatorReducer } from './features/navigator'
import userChoicesReducer from './features/userChoices/userChoicesReducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  navigator: NavigatorReducer,
  userChoices: userChoicesReducer
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
