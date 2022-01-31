import { useDispatch, useSelector } from "react-redux"
import styled, { css } from "styled-components"
import PostContainer from "../components/PostContainer"
import { AppDispatch, AppState } from "../store"
import { setOpened, setPostContent, setTitle, setTopicId } from "../store/postform/actions"
import { FormEvent, ChangeEvent, useEffect, useState } from 'react'
import { Post, Topic } from "../types"
import { addDoc, collection, getDocs, getFirestore, Timestamp } from 'firebase/firestore'

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    title, 
    topicId, 
    postContent
  } = useSelector((state: AppState) => {
    return state.postform
  })

  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    // fetching topics...
    const db = getFirestore()
    const topicCollection = collection(
      db, 'topics'
    )
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
      setTopics(topics)
      if(topicId === null) {
        dispatch(setTopicId(topics[0].id))
      }
    }).catch(() => {
      alert('Unable to load topics from DB!')
    })
  }, [])

  const closeForm = () => {
    dispatch(setOpened(false))
  }

  const user = useSelector((state: AppState) => {
    return state.auth.user
  })
  const db = getFirestore()
  const postCollection = collection(db, 'posts')

  const handleSubmitPost = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    if(topicId === null || user === null) {
      alert('Error occured!')
      return
    }
    const trimmedTitle = title.trim()
    const trimmedContent = postContent.trim()

    if(!trimmedTitle || !trimmedContent) {
      alert('Empty post not allowed!')
      return
    }

    const post: Post = {
      title: trimmedTitle,
      topicId: topicId,
      postContent: trimmedContent,
      authorUid: user.uid,
      createdAt: Timestamp.now()
    }
    
    addDoc(postCollection, post)

    dispatch(setTitle(''))
    dispatch(setTopicId(null))
    dispatch(setPostContent(''))
    dispatch(setOpened(false))
  }

  const handleTitleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    dispatch(setTitle(value))
  }

  const handleTopicChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value
    dispatch(setTopicId(value))
  }

  const handleContentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value
    dispatch(setPostContent(value))
  }

  return (
    <PostContainer>
      <CloseButton onClick={closeForm}>
        Close
      </CloseButton>
      <FormContainer onSubmit={handleSubmitPost}>
        <Group>
          <h3>Title:</h3>
          <TitleInput 
            required
            placeholder="Your title..."
            value={title}
            onChange={handleTitleChange}
          />
        </Group>

        <Group>
          <h3>Topic:</h3>
          <TopicInput 
            required
            onChange={handleTopicChange}
            value={topicId || ''}
          >
            {topics.map((topic, idx) => {
              return (
                <option key={idx} value={topic.id}>
                  {topic.name}
                </option>
              )
            })}
          </TopicInput>
        </Group>

        <Group style={{flex: '1'}}>
          <h3>Post:</h3>
          <PostInput
            required
            value={postContent}
            onChange={handleContentChange}
            autoCorrect="false"
            spellCheck="false"
          ></PostInput>
        </Group>
        
        <PostButton type="submit">
          Post!
        </PostButton>
      </FormContainer>
    </PostContainer>
  )
}

const PostButton = styled.button`
  padding: 0.25em;
  font-size: 1.2em;
  border: none;
  color: grey;
  font-weight: bold;
  border-radius: 10px;
  background-color: #efefef;

  &:hover {
    background-color: var(--grey);
    color: black;
  }
`

const baseInputCss = css`
  outline: none;
  border: none;
  font-size: 1.2em;
  box-shadow: var(--grey) 1px 1px 6px;
  padding: 0.5em 1em;
  border-radius: 15px;
`

const PostInput = styled.textarea`
  ${baseInputCss}

  font-family: inherit;
  flex: 1;
  resize: none;
`

const TopicInput = styled.select`
  ${baseInputCss}
`

const TitleInput = styled.input`
  ${baseInputCss}
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  color: grey;

  & > h3 {
    margin-left: 0.5em;
    margin-bottom: 0.25em;
  }
`

const FormContainer = styled.form`
  height: 100%;
  padding: 3em;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 1.5em;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 0; right: 0;

  font-size: 1.2em;
  border: none;
  background-color: var(--primary);
  color: white;
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 0px 0px 0px 15px;

  &:hover {
    background-color: var(--darkprimary);
  }
`

export default PostForm