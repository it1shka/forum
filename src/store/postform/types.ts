export interface FormState {
  opened: boolean
  title: string
  topicId: number
  postContent: string
}

export enum FormActionType {
  SET_OPENED = 'SET_OPENED',
  SET_TITLE = 'SET_TITLE',
  SET_TOPIC_ID = 'SET_TOPIC_ID',
  SET_POST_CONTENT = 'SET_POST_CONTENT'
}

export interface FormSetOpenedAction {
  type: FormActionType.SET_OPENED
  payload: boolean
}

export interface FormSetTitleAction {
  type: FormActionType.SET_TITLE
  payload: string
}

export interface FormSetTopicIdAction {
  type: FormActionType.SET_TOPIC_ID
  payload: number
}

export interface FormSetPostContentAction {
  type: FormActionType.SET_POST_CONTENT
  payload: string
}

export type FormAction = 
  | FormSetOpenedAction
  | FormSetTitleAction
  | FormSetTopicIdAction
  | FormSetPostContentAction