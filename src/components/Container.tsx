import type { FC } from 'react'
import styled from "styled-components"

const Container: FC = ({ children }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        {children}
      </InnerContainer>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--lightgrey);
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 520px;
  max-height: 720px;
  
  background-color: white;
  box-shadow: var(--grey) 1px 1px 5px;
  border-radius: 15px;

  overflow: hidden;
`

export default Container