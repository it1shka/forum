import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled, { css } from "styled-components"
import { AppState } from "../store"
import { Comment, UserData } from "../types"
import defaultpp from '../images/defaultpp.png'

const Comments = () => {
  const comments = useSelector((state: AppState) => {
    return state.comments.comments
  })
  
  return (
    <Container>
      {comments.map((comment, idx) => {
        return (
          <CommentElem
            key={idx}
            data={comment} 
          />
        )
      })}
    </Container>
  )
}

const Container = styled.ul`
  flex: 1 1 auto;
  overflow: scroll;
  padding: 1em 2em;
  scrollbar-width: none;

  & > * + * {
    margin-top: 1em;
  }
`

const CommentElem = ({ data }: {data: Comment}) => {
  const [author, setAuthor] = useState<UserData | null>(null)

  useEffect(() => {
    const db = getFirestore()
    const authorDoc = doc(db, 'users', data.authorUid)
    getDoc(authorDoc).then(shot => {
      const user = shot.data() as UserData
      setAuthor(user)
    })
  }, [])

  return (
    <CommentContainer>
      <Icon src={author?.photoURL ?? defaultpp}/>
      <Wrapper>
        <Additional>{author?.displayName ?? 'Incognito'}, {data.createdAt.toDate().toLocaleDateString()}</Additional>
        <Content>{data.content}</Content>
      </Wrapper>
    </CommentContainer>
  )
}

const Icon = styled.img`
  height: 35px;
  border-radius: 100%;
`

const Wrapper = styled.div`
  margin-left: 1em;
  margin-top: -0.5em;
`

const Additional = styled.small`
  color: grey;
  font-style: italic;
`

const Content = styled.p`
  background-color: var(--grey);
  padding: 0.25em 0.5em;
  border-radius: 10px;
  max-width: 360px;
  font-size: 1.15em;
`

const CommentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export default Comments