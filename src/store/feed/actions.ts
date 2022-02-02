import { Post, Topic } from "../../types";
import { FeedActionType, FeedSetPostsAction, FeedSetSelectedTopicIdAction, FeedSetSortTypeAction, FeedSetTopicsAction, SortType } from "./types";

export function setTopics(
  topics: Topic[]
): FeedSetTopicsAction {
  return {
    type: FeedActionType.SET_TOPICS,
    payload: topics
  }
}

export function setSelectedTopicId(
  topicId: string
): FeedSetSelectedTopicIdAction {
  return {
    type: FeedActionType.SET_SELECTED_TOPIC_ID,
    payload: topicId
  }
}

export function setSortType(
  sortType: SortType
): FeedSetSortTypeAction {
  return {
    type: FeedActionType.SET_SORT_TYPE,
    payload: sortType
  }
}

export function setPosts(
  posts: Post[]
): FeedSetPostsAction {
  return {
    type: FeedActionType.SET_POSTS,
    payload: posts
  }
}