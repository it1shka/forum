import type { User } from 'firebase/auth'

export interface AuthState {
  user: User | null
}

export enum AuthActionType {
  SET_USER = 'SET_USER'
}

export interface AuthSetUserAction {
  type: AuthActionType.SET_USER
  payload: User | null
}

export type AuthAction = 
  | AuthSetUserAction