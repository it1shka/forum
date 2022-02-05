import styled from "styled-components"
import { Comment } from "../types"
import { useDispatch, useSelector } from "react-redux"
import Container, { CloseButton } from "../components/PostContainer"
import { AppDispatch, AppState } from "../store"
import { setComments, setOpenedComments } from "../store/comments/actions"
import { useEffect } from "react"
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore"
import Comments from "../components/Comments"
import CommentForm from "../components/CommentForm"

const CommentsLayout = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {postId, comments} = useSelector((state: AppState) => {
    return state.comments
  })

  useEffect(() => {
    const db = getFirestore()
    const commentsCollection = collection(db, 'comments')
    const commentsQuery = query(
      commentsCollection,
      where('postId', '==', postId),
      orderBy('createdAt')
    )
    const unsubscribe = onSnapshot(commentsQuery, shot => {
      const comments = shot.docs.map(doc => {
        return doc.data() as Comment
      })
      dispatch(setComments(comments))
    })
    return () => unsubscribe()
  }, [postId])  

  const close = () => {
    dispatch(setComments([]))
    dispatch(setOpenedComments(false))
  }

  return (
    <Container>
      <CloseButton onClick={close}>
        Close
      </CloseButton>
      <InnerFlex>
        <Comments />
        <CommentForm />
      </InnerFlex>
    </Container>
  )
}

const InnerFlex = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default CommentsLayout