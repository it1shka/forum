import type { FC } from 'react'
import styled, { css } from 'styled-components'

const PostContainer: FC<{hidden?: boolean}> = ({
   children, hidden
  }) => {

  return (
    <OuterContainer hidden={hidden}>
      <InnerContainer>
        {children}
      </InnerContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div<{
  hidden?:boolean
}>`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({hidden}) => hidden && css`
  display: none;
  `}
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

export const CloseButton = styled.button`
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