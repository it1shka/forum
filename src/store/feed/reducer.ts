import { FeedState, FeedAction, FeedActionType } from "./types";

const feedDefaultState: FeedState = {
  topics: []
}

const feedReducer = (
  state = feedDefaultState,
  action: FeedAction
): FeedState => {
  switch(action.type) {
    case FeedActionType.SET_TOPICS:
      return {...state, topics: action.payload}
    default:
      return state
  }
}

export default feedReducer