import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import AppBar from "../components/AppBar"
import Filters from "../components/Filters"
import { AppDispatch, AppState } from "../store"
import { setOpened } from "../store/postform/actions"
import PostForm from "./PostForm"

const MainLayout = () => {

  const dispatch = useDispatch<AppDispatch>()

  const openForm = () => {
    dispatch(setOpened(true))
  }

  const opened = useSelector((state: AppState) => {
    return state.postform.opened
  })

  return (
    <div>
      {opened && <PostForm />}
      <AppBar />
      <ContentContainer>
        <PostButton onClick={openForm}>
          Write your post!
        </PostButton>
        <Filters />
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