import { FormState, FormAction, FormActionType } from "./types";

const formDefaultState: FormState = {
  opened: false,
  title: '',
  topicId: null,
  postContent: ''
}

const formReducer = (
  state = formDefaultState,
  action: FormAction
): FormState => {
  switch(action.type) {
    case FormActionType.SET_OPENED:
      return {...state, opened: action.payload}
    case FormActionType.SET_TITLE:
      return {...state, title: action.payload}
    case FormActionType.SET_TOPIC_ID:
      return {...state, topicId: action.payload}
    case FormActionType.SET_POST_CONTENT:
      return {...state, postContent: action.payload}
    default:
      return state
  }
}

export default formReducer