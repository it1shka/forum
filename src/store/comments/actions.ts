import { Comment } from "../../types";
import { CommentsActionType, CommentsSetCommentsAction, CommentsSetEnteredTextAction, CommentsSetOpenedAction, CommentsSetPostIdAction } from "./types";

export function setOpenedComments(
  opened: boolean
): CommentsSetOpenedAction {
  return {
    type: CommentsActionType.SET_COMMENTS_OPENED,
    payload: opened
  }
}

export function setComments(
  comments: Comment[]
): CommentsSetCommentsAction {
  return {
    type: CommentsActionType.SET_COMMENTS,
    payload: comments
  }
}

export function setPostId(
  postId: string
): CommentsSetPostIdAction {
  return {
    type: CommentsActionType.SET_POST_ID,
    payload: postId
  }
}

export function setEnteredText(
  text: string
): CommentsSetEnteredTextAction {
  return {
    type: CommentsActionType.SET_ENTERED_TEXT,
    payload: text
  }
}