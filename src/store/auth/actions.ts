import { User } from "firebase/auth";
import { AuthActionType, AuthSetUserAction } from "./types";

export function setUser(
  user: User | null
): AuthSetUserAction {
  return ({
    type: AuthActionType.SET_USER,
    payload: user
  })
}