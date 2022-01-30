import { combineReducers, createStore } from "redux";
import authReducer from "./auth/reducer";
import formReducer from "./postform/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  postform: formReducer
})

const store = createStore(appReducer)
export default store

export type AppState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch