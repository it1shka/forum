import { AuthAction, AuthActionType, AuthState } from "./types";

const authDefaultState: AuthState = {
  user: null
}

const authReducer = (
  state = authDefaultState,
  action: AuthAction
): AuthState => {
  switch(action.type) {
    case AuthActionType.SET_USER:
      return ({
        ...state,
        user: action.payload
      })
    default:
      return state
  }
}

export default authReducer