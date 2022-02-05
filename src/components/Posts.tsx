import { useSelector } from "react-redux"
import styled from "styled-components"
import { AppState } from "../store"
import PostLayout from "./PostLayout"

const Posts = () => {
  const posts = useSelector((state: AppState) => {
    return state.feed.posts
  })

  return (
    <div>
      {(!posts.length) && <Mock />}
      {posts.map((post, idx) => {
        return (
          <PostLayout 
            key={idx} 
            post={post} 
          />
        )
      })}
    </div>
  )
}

const Mock = () => {
  return <MockText>Sorry, nothing here...</MockText>
}

const MockText = styled.h1`
  padding: 2em 2em;
  color: grey;
`

export default Posts