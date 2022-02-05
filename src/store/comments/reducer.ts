import { CommentsState, CommentsAction, CommentsActionType } from "./types";

const commentsDefaultState: CommentsState = {
  opened: false,
  comments: [],
  postId: '',
  enteredText: ''
}

const commentsReducer = (
  state = commentsDefaultState,
  action: CommentsAction
): CommentsState => {
  switch(action.type) {
    case CommentsActionType.SET_COMMENTS_OPENED:
      return {...state, opened: action.payload}
    case CommentsActionType.SET_COMMENTS:
      return {...state, comments: action.payload}
    case CommentsActionType.SET_POST_ID:
      return {...state, postId: action.payload}
    case CommentsActionType.SET_ENTERED_TEXT:
      return {...state, enteredText: action.payload}
    default:
      return state
  }
}

export default commentsReducer