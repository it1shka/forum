import { FeedState, FeedAction, FeedActionType } from "./types";

const feedDefaultState: FeedState = {
  topics: [],
  selectedTopicId: '',
  sortType: 'newest',
  posts: []
}

const feedReducer = (
  state = feedDefaultState,
  action: FeedAction
): FeedState => {
  switch(action.type) {
    case FeedActionType.SET_TOPICS:
      return {...state, topics: action.payload}
    case FeedActionType.SET_SELECTED_TOPIC_ID:
      return {...state, selectedTopicId: action.payload}
    case FeedActionType.SET_POSTS:
      return {...state, posts: action.payload}
    case FeedActionType.SET_SORT_TYPE:
      return {...state, sortType: action.payload}
    default:
      return state
  }
}

export default feedReducer