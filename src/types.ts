import { Timestamp } from "firebase/firestore";

export interface Topic {
  name: string
  id: string
}

export interface Post {
  title: string
  topicId: string
  postContent: string
  authorUid: string
  createdAt: Timestamp

  id?: string
}

export interface UserData {
  displayName: string
  email: string
  photoURL: string | null
}