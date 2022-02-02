import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Post, Topic, UserData } from "../types"

const PostLayout = ({ post }: {post: Post}) => {

  const [topic, setTopic] = useState('')
  const [author, setAuthor] = useState<UserData | null>()
  useEffect(() => {
    const db = getFirestore()
    const topicDoc = doc(db, 'topics', post.topicId)
    getDoc(topicDoc).then(snapshot => {
      const data = (snapshot.data() as Topic)
      const name = data.name
      setTopic(name)
    }).catch(reason => {
      console.log(reason)
      setTopic('Unknown')
    })

    const authorDoc = doc(db, 'users', post.authorUid)
    getDoc(authorDoc).then(snapshot => {
      const data = (snapshot.data() as UserData)
      setAuthor(data)
    }).catch(reason => {
      console.log(reason)
      setAuthor(null)
    })
  }, [])

  return (
    <Container>
      <div style={{marginBottom: '2em'}}>
        <Grouped>
          <h2>{post.title}</h2>
          <TopicText>{topic}</TopicText>
        </Grouped>
        <small>{post.createdAt.toDate().toLocaleDateString()}</small>
      </div>

      <p>{post.postContent}</p>

      <UserContainer> 
        <Icon src={author?.photoURL ?? ''}/>
        <div style={{fontSize: '0.7em'}}>
          <h3>{author?.displayName ?? 'Unknown'}</h3>
          <small>{author?.email ?? 'unknown'}</small>
        </div>
      </UserContainer>
    </Container>
  )
}

const Icon = styled.img`
  margin-left: auto;
  height: 30px;
  border-radius: 100%;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > * + * {
    margin-left: 0.5em;
  }

`

const Grouped = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 1.5em;
  }
`

const TopicText = styled.h5`
  color: grey;
  border: 3px dashed grey;
  padding: 0.5em;
  border-radius: 30px;
`

const Container = styled.div`
  padding: 1em 2em;
  box-shadow: var(--grey) 0px 0px 3px;
  margin: 1em;
  white-space: pre-line;

  & > * + * {
    margin-top: 1em;
  }
`

export default PostLayout