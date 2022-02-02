import { Topic } from "../../types";

export interface FeedState {
  topics: Topic[]
}

export enum FeedActionType {
  SET_TOPICS = 'SET_TOPICS'
}

export interface FeedSetTopicsAction {
  type: FeedActionType.SET_TOPICS,
  payload: Topic[]
}

export type FeedAction = 
  | FeedSetTopicsAction