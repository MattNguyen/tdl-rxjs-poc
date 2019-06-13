import { configureStore  } from 'redux-starter-kit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { Store, AnyAction, combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import loggerMiddleware from './middleware/logger'

import options, { listenForOptionsUpdatesEpic }  from './options'
import authorization, { listenForAuthorizationUpdatesEpic }  from './authorization'

import { Client } from 'tdl';
import { TDLib } from 'tdl-tdlib-wasm';
import { makeTDLibClient } from 'tdl-shared';

declare global {
  interface Window { Module: any; }
}
window.Module = window.Module || {};

// Setup TDLib Client
function createClient (options: any): Promise<Client> {
  return new Promise(resolve => {
    window.Module().then((module: any) => {
      const tdlib = new TDLib(module)
      resolve(new Client(tdlib, options))
    })
  })
}
localStorage.debug = 'tdl:client'

export const history = createBrowserHistory()
export default function configureAppStore(preloadedState?: any): Promise<Store<any, AnyAction>> {
  return new Promise(async (resolve) => {
    // Setup Middleware
    const tdclient = await createClient({
      apiId: process.env.TELEGRAM_API_ID , // Your api_id
      apiHash: process.env.TELEGRAM_API_HASH, // Your api_hash
      useDefaultVerbosityLevel: true
    })
    await tdclient.connect()
    const epicMiddleware = createEpicMiddleware({
      dependencies: {
        tdclient
      }
    })
    const store = configureStore({
      reducer: combineReducers({
        router: connectRouter(history),
        options,
        authorization,
      }),
      preloadedState,
      middleware: [loggerMiddleware, routerMiddleware(history), epicMiddleware]
    })

    epicMiddleware.run(combineEpics(
      listenForOptionsUpdatesEpic,
      listenForAuthorizationUpdatesEpic,
    ))
    resolve(store)
  })
}
