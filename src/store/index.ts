import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authorization from './authorization'
import options from './options'

const rootReducer = combineReducers({
  authorization,
  options
})

export type AppState = ReturnType<typeof rootReducer>
