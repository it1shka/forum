import { FormActionType, FormSetOpenedAction, FormSetPostContentAction, FormSetTitleAction, FormSetTopicIdAction } from "./types";

export function setOpened(
  opened: boolean
): FormSetOpenedAction {
  return {
    type: FormActionType.SET_OPENED,
    payload: opened
  }
}

export function setTitle(
  title: string
): FormSetTitleAction {
  return {
    type: FormActionType.SET_TITLE,
    payload: title
  }
}

export function setTopicId(
  topicId: string
): FormSetTopicIdAction {
  return {
    type: FormActionType.SET_TOPIC_ID,
    payload: topicId
  }
}

export function setPostContent(
  content: string
): FormSetPostContentAction {
  return {
    type: FormActionType.SET_POST_CONTENT,
    payload: content
  }
}