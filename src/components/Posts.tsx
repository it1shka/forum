import { useSelector } from "react-redux"
import { AppState } from "../store"
import PostLayout from "./PostLayout"

const Posts = () => {
  const posts = useSelector((state: AppState) => {
    return state.feed.posts
  })

  return (
    <div>
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

export default Posts