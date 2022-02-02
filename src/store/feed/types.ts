import { Topic, Post } from "../../types";

export type SortType = 
  | 'newest'
  | 'oldest'

export interface FeedState {
  topics: Topic[]
  selectedTopicId: string,
  sortType: SortType
  posts: Post[]
}

export enum FeedActionType {
  SET_TOPICS = 'SET_TOPICS',
  SET_SELECTED_TOPIC_ID = 'SET_SELECTED_TOPIC_ID',
  SET_SORT_TYPE = 'SET_SORT_TYPE',
  SET_POSTS = 'SET_POSTS'
}

export interface FeedSetTopicsAction {
  type: FeedActionType.SET_TOPICS,
  payload: Topic[]
}

export interface FeedSetSelectedTopicIdAction {
  type: FeedActionType.SET_SELECTED_TOPIC_ID,
  payload: string
}

export interface FeedSetPostsAction {
  type: FeedActionType.SET_POSTS,
  payload: Post[]
}

export interface FeedSetSortTypeAction {
  type: FeedActionType.SET_SORT_TYPE,
  payload: SortType
}

export type FeedAction = 
  | FeedSetTopicsAction
  | FeedSetSelectedTopicIdAction
  | FeedSetSortTypeAction
  | FeedSetPostsAction