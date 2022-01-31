import type { FC } from 'react'
import styled from 'styled-components'

const PostContainer: FC = ({ children }) => {

  return (
    <OuterContainer>
      <InnerContainer>
        {children}
      </InnerContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 860px;
  max-height: 720px;

  background-color: white;
  border-radius: 15px;

  position: relative;
  overflow: hidden;
`

export default PostContainer