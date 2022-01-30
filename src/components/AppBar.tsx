import styled from 'styled-components'
import icon from '../images/icon.png'
import LoggedUser from './LoggedUser'

const AppBar = () => {

  return (
    <Container>
      <Icon src={icon}/>
      <h1>Forum</h1>
      <LoggedUser />    
    </Container>
  )
}

const Icon = styled.img`
  height: 35px;
  margin-right: 0.25em;
`

const Container = styled.header`
  background-color: white;
  padding: 1em 2em;
  box-shadow: var(--grey) 0px 0px 5px;

  display: flex;
  align-items: center;
  min-height: 77px;

  position: sticky;
  top: 0;
`

export default AppBar