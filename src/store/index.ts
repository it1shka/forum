import { combineReducers, createStore } from "redux";
import authReducer from "./auth/reducer";

const appReducer = combineReducers({
  auth: authReducer
})

const store = createStore(appReducer)
export default store

export type AppState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch