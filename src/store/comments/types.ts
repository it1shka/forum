import { Comment } from "../../types";

export interface CommentsState {
  opened: boolean
  comments: Comment[],
  postId: string,
  enteredText: string
}

export enum CommentsActionType {
  SET_COMMENTS_OPENED = 'SET_COMMENTS_OPENED',
  SET_POST_ID = 'SET_POST_ID',
  SET_COMMENTS = 'SET_COMMENTS',
  SET_ENTERED_TEXT = 'SET_ENTERED_TEXT'
}

export interface CommentsSetOpenedAction {
  type: CommentsActionType.SET_COMMENTS_OPENED
  payload: boolean
}

export interface CommentsSetCommentsAction {
  type: CommentsActionType.SET_COMMENTS
  payload: Comment[]
}

export interface CommentsSetPostIdAction {
  type: CommentsActionType.SET_POST_ID
  payload: string
}

export interface CommentsSetEnteredTextAction {
  type: CommentsActionType.SET_ENTERED_TEXT
  payload: string
}

export type CommentsAction = 
  | CommentsSetOpenedAction
  | CommentsSetCommentsAction
  | CommentsSetPostIdAction
  | CommentsSetEnteredTextAction