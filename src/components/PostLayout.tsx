import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where, } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AppDispatch, AppState } from "../store"
import { setOpenedComments, setPostId } from "../store/comments/actions"
import { Post, Topic, UserData } from "../types"

const PostLayout = ({ post }: {post: Post}) => {

  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector((state: AppState) => {
    return state.auth.user
  })

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

  const removeThisPost = () => {
    if(!window.confirm('Are you sure?'))
      return
    const db = getFirestore()
    deleteDoc(doc(db, 'posts', post.id!)).catch(() => {
      alert('Failed to delete post!')
    })
    const comments = collection(db, 'comments')
    const postComments = query(
      comments,
      where('postId', '==', post.id)
    )
    getDocs(postComments).then(shot => {
      shot.docs.forEach(doc => {
        deleteDoc(doc.ref)
      })
    })
  }

  const openComments = () => {
    dispatch(setPostId(post.id!))
    dispatch(setOpenedComments(true))
  }

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
        <Buttons>
          {currentUser?.uid === post.authorUid && (
            <FancyButton 
              onClick={removeThisPost}
              color="red"
            >
              Delete
            </FancyButton>
          )}
          <FancyButton
            onClick={openComments}
            color="var(--primary)"
          >
            Comments
          </FancyButton>
        </Buttons>

        <Icon src={author?.photoURL ?? ''}/>
        <div style={{fontSize: '0.7em'}}>
          <h3>{author?.displayName ?? 'Unknown'}</h3>
          <small>{author?.email ?? 'unknown'}</small>
        </div>
      </UserContainer>
    </Container>
  )
}

const Buttons = styled.div`
  margin-right: auto;
  & > * + * {
    margin-left: 0.5em;
  }
`

const FancyButton = styled.button<{color?:string}>`
  border: none;
  padding: 0.5em;
  font-size: inherit;
  border-radius: 5px;
  transition: 0.25s all 0s;

  &:hover {
    color: white;
    background-color: ${({color}) => color ?? 'grey'};
  }
`

const Icon = styled.img`
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