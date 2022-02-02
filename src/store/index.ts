import { combineReducers, createStore } from "redux";
import authReducer from "./auth/reducer";
import feedReducer from "./feed/reducer";
import formReducer from "./postform/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  postform: formReducer,
  feed: feedReducer
})

// making global reducer for state reset
type RootState = ReturnType<typeof rootReducer>
type ReducerAction<T> = 
  T extends (state: any, action: infer U) => any
    ? U : never
type RootAction = ReducerAction<typeof rootReducer>

const appReducer = (
  state: RootState | undefined,
  action: RootAction | { type: 'RESET' }
) => {
  if(action.type === 'RESET') {
    return rootReducer(
      undefined,
      action as unknown as RootAction
    )
  }
  return rootReducer(state, action)
}

export function reset() {
  return { type: 'RESET' } as const
}

// mounting reducer
const store = createStore(appReducer)
export default store

export type AppState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch