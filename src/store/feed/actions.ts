import { Topic } from "../../types";
import { FeedActionType, FeedSetTopicsAction } from "./types";

export function setTopics(
  topics: Topic[]
): FeedSetTopicsAction {
  return {
    type: FeedActionType.SET_TOPICS,
    payload: topics
  }
}