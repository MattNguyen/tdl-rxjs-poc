import { createSlice } from 'redux-starter-kit'
import { Epic, ofType } from 'redux-observable'
import { fromEvent } from 'rxjs'
import { switchMap, map, filter } from 'rxjs/operators'

export type AuthorizationStateType =
  'authorizationStateClosed' |
  'authorizationStateClosing' |
  'authorizationStateLoggingOut' |
  'authorizationStateReady' |
  'authorizationStateWaitCode' |
  'authorizationStateWaitEncryptionKey' |
  'authorizationStateWaitPassword' |
  'authorizationStateWaitPhoneNumber' |
  'authorizationStateWaitTdlibParameters'

export const authorizationStateClosed: AuthorizationStateType = 'authorizationStateClosed'
export const authorizationStateClosing: AuthorizationStateType = 'authorizationStateClosing'
export const authorizationStateLoggingOut: AuthorizationStateType = 'authorizationStateLoggingOut'
export const authorizationStateReady: AuthorizationStateType = 'authorizationStateReady'
export const authorizationStateWaitCode: AuthorizationStateType = 'authorizationStateWaitCode'
export const authorizationStateWaitEncryptionKey: AuthorizationStateType = 'authorizationStateWaitEncryptionKey'
export const authorizationStateWaitPassword: AuthorizationStateType = 'authorizationStateWaitPassword'
export const authorizationStateWaitPhoneNumber: AuthorizationStateType = 'authorizationStateWaitPhoneNumber'
export const authorizationStateWaitTdlibParameters: AuthorizationStateType = 'authorizationStateWaitTdlibParameters'

export interface AuthorizationState {
  authorizationState: AuthorizationStateType
}

const initialState: AuthorizationState = {
  authorizationState: 'authorizationStateClosed'
}

const authorizationSlice = createSlice({
  slice: 'authorization',
  initialState,
  reducers: {
    // Initialize state
    listenForAuthorizationUpdates(state) {
      return state
    },

    // Action: update authorization state
    newAuthorizationUpdate(state: AuthorizationState, action) {
      state['authorizationState'] = action.payload.authorization_state._
    }
  }
})

const { actions, reducer } = authorizationSlice
export  const { listenForAuthorizationUpdates, newAuthorizationUpdate } = actions

// Observe Stream
const listenForAuthorizationUpdatesEpic: Epic = (
  action$,
  _,
  { tdclient }
) => {
  return action$.pipe(
    ofType(listenForAuthorizationUpdates),
    switchMap((): any => {
      return fromEvent(tdclient, 'update').
        pipe(
          filter((payload: any) => payload._ === 'updateAuthorizationState'),
          map(payload => newAuthorizationUpdate(payload))
        )
    })
  )
}

export { listenForAuthorizationUpdatesEpic }

export default reducer
