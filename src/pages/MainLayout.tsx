import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import AppBar from "../components/AppBar"
import Filters from "../components/Filters"
import Posts from "../components/Posts"
import { AppDispatch, AppState } from "../store"
import { setTopics } from "../store/feed/actions"
import { setOpened } from "../store/postform/actions"
import { Topic } from "../types"
import CommentsLayout from "./CommentsLayout"
import PostForm from "./PostForm"

const MainLayout = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const db = getFirestore()
    const topicCollection = collection(db, 'topics')
    getDocs(topicCollection).then(snapshot => {
      const topics = snapshot.docs.map(doc => {
        const topicId = doc.id
        const topicName = doc.data().name
        const topic: Topic = {
          name: topicName,
          id: topicId
        }
        return topic
      })
      dispatch(setTopics(topics))
    }).catch(() => alert('Failed to load topics!'))
  }, [])

  const openForm = () => {
    dispatch(setOpened(true))
  }

  const areCommentsOpened = useSelector((state: AppState) => {
    return state.comments.opened
  })

  return (
    <div>
      <PostForm />
      {areCommentsOpened && <CommentsLayout />}
      <AppBar />
      <ContentContainer>
        <PostButton onClick={openForm}>
          Write your post!
        </PostButton>
        <Filters />
        <Posts />
      </ContentContainer>
    </div>
  )
}

const PostButton = styled.button`
  border: none;
  background-color: var(--primary);
  color: white;
  font-size: 2em;
  padding: 0.5em;
  font-weight: bold;
  transition: 0.2s background-color 0s;

  &:hover {
    background-color: var(--darkprimary);
  }
`

const ContentContainer = styled.div`
  max-width: 1080px;
  margin: 1em auto 0em auto;

  background-color: white;
  box-shadow: var(--grey) 0px 0px 4px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  // min-height: 200vh;
`

export default MainLayout