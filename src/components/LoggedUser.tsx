import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../store'
import defaultpp from '../images/defaultpp.png'
import { getAuth, signOut } from 'firebase/auth'
import { useState } from 'react'

const LoggedUser = () => {
  const user = useSelector((state: AppState) => {
    return state.auth.user
  })

  const handleSignOut = () => {
    if(!window.confirm('Are you sure?')) 
      return
    const auth = getAuth()
    signOut(auth).catch(() => {
      alert('Failed to sign out!')
    })
  }

  const [opened, setOpened] = useState(false)

  const toggle = () => {
    setOpened(prev => !prev)
  }

  if(!user) return <></>

  return (
    <Container onClick={toggle}>
      <ProfilePicture src={user.photoURL ?? defaultpp} opened={opened}/>
      {(opened &&
        <>
        <div>
          <h3>{user.displayName ?? 'Incognito'}</h3>
          <small>{user.email ?? 'Incognito'}</small>
        </div>
        <SignOutButton onClick={handleSignOut}>
          Sign Out
        </SignOutButton>
        </>
      )}
    </Container>
  )
}

const ProfilePicture = styled.img<{opened?: boolean}>`
  height: ${({opened}) => opened ? '35' : '45'}px;
  border-radius: 100%;
`

const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: grey;

  & > * + * {
    margin-left: 0.5em;
  }
`

const SignOutButton = styled.button`
  font-size: inherit;
  border: none;
  background-color: var(--primary);
  color: white;
  font-weight: bold;
  padding: 0.5em;
  border-radius: 10px;
  &:hover {
    background-color: var(--darkprimary);
  }
`

export default LoggedUser