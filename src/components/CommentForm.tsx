import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AppDispatch, AppState } from "../store"
import type { ChangeEvent, FormEvent } from 'react'
import { setEnteredText } from "../store/comments/actions"
import { Comment } from "../types"
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore"

const CommentForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {enteredText, postId} = useSelector((state: AppState) => {
    return state.comments
  })

  const currentUser = useSelector((state: AppState) => {
    return state.auth.user
  })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    dispatch(setEnteredText(value))
  }


  const db = getFirestore()
  const commentsCollection = collection(db, 'comments')

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const comment: Comment = {
      content: enteredText,
      postId: postId,
      createdAt: Timestamp.now(),
      authorUid: currentUser!.uid
    }
    addDoc(commentsCollection, comment).catch(() => {
      alert('Failed to send comment!')
    })
    dispatch(setEnteredText(''))
  }

  return (
    <Container onSubmit={handleSubmit}>
      <CommentInput required
        placeholder="Comment..." 
        value={enteredText}
        onChange={handleInputChange}
      />    
      <SubmitComment type="submit">
        Comment
      </SubmitComment>
    </Container>
  )
}

const CommentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: inherit;
  padding: 0.75em 1.25em;
  color: #292929;
`

const SubmitComment = styled.button`
  border: none;
  font-size: inherit;
  padding: 0em 1em;
  border-radius: 15px 0px 0px 0px;
  background-color: var(--primary);
  color: white;
  font-weight: bold;

  &:hover {
    background-color: var(--darkprimary);
  }
`

const Container = styled.form`
  display: flex;
  box-shadow: var(--grey) 0px -1px 3px;
`

export default CommentForm