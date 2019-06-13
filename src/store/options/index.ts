import { createSlice, createReducer } from 'redux-starter-kit'
import { Epic, ofType } from 'redux-observable'
import { Observable, from, fromEvent } from 'rxjs'
import { switchMap, map, filter } from 'rxjs/operators'
import { Client } from 'tdl'
import { camelCase } from 'lodash'

export interface OptionsState {
  // Options
  animationSearchBotUsername: string
  basicGroupSizeMax: number
  callConnectTimeoutMs: number
  callPacketTimeoutMs: number
  callsEnabled: boolean
  favoriteStickersLimit: number
  forwardedMessageCountMax: number
  messageCaptionLengthMax: number
  messageTextLengthMax: number
  photoSearchBotUsername: string
  pinnedChatCountMax: number
  state: string
  supergroupSizeMax: number
  tMeUrl: string
  testMode: boolean
  venueSearchBotUsername: string
  version: string
  [key: string]: string | number | boolean
}

const initialState: OptionsState = {
  animationSearchBotUsername: '',
  basicGroupSizeMax: 0,
  callConnectTimeoutMs: 0,
  callPacketTimeoutMs: 0,
  callsEnabled: false,
  favoriteStickersLimit: 0,
  forwardedMessageCountMax: 0,
  messageCaptionLengthMax: 0,
  messageTextLengthMax: 0,
  photoSearchBotUsername: "",
  pinnedChatCountMax: 0,
  state: "",
  supergroupSizeMax: 0,
  tMeUrl: "",
  testMode: false,
  venueSearchBotUsername: "",
  version: "",
}

const optionsSlice = createSlice({
  slice: 'options',
  initialState,
  reducers: {
    listenForOptionsUpdates(state, action) {
      return state
    },

    updateOptions(state: OptionsState, action) {
      state[camelCase(action.payload.name)] = action.payload.value.value
    }
  }
})

const { actions, reducer } = optionsSlice
export  const { listenForOptionsUpdates, updateOptions } = actions

const listenForOptionsUpdatesEpic: Epic = (
  action$,
  state$,
  { tdclient }
) => {
  return action$.pipe(
    ofType(listenForOptionsUpdates),
    switchMap((client: Client): any => {
      return fromEvent(tdclient, 'update').
        pipe(
          filter((payload: any) => payload._ === 'updateOption'),
          map(payload => updateOptions(payload))
        )
    })
  )
}

export { listenForOptionsUpdatesEpic }

export default reducer
