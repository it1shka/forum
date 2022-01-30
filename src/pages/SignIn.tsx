import styled from 'styled-components'
import Container from '../components/Container'
import {
  AuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  getAuth,
} from 'firebase/auth'

type SignInType = 
  | 'google'
  | 'facebook'
  | 'twitter'

const SignIn = () => {

  const auth = getAuth()

  const handleSignIn = (type: SignInType) => {
    const provider: AuthProvider = (() => {
      switch(type) {
        case 'google': 
          return new GoogleAuthProvider()
        case 'facebook': 
          return new FacebookAuthProvider()
        case 'twitter':
          return new TwitterAuthProvider()
        default:
          throw new Error(`Invalid auth type: ${type}`)
      }
    })()
    signInWithPopup(auth, provider).catch(() => {
      alert('Failed to sign in!')
    })
  }

  const withGoogle = () => handleSignIn('google')
  const withFacebook = () => handleSignIn('facebook')
  const withTwitter = () => handleSignIn('twitter')

  return (
    <Container>
      <Title>Sign in with:</Title>
      <Links>
        <SigninLink onClick={withGoogle}>
          Google
        </SigninLink>
        <SigninLink onClick={withFacebook}>
          <span style={{color: '#12244a'}}>
            Facebook
          </span>
        </SigninLink>
        <SigninLink onClick={withTwitter}>
          <span style={{color: '#215214'}}>
            Twitter
          </span>
        </SigninLink>
      </Links>
    </Container>    
  )
}

const SigninLink = styled.button`
  font-weight: bold;
  padding: 0.75em;
  border: none;
  background: transparent;
  color: grey;
  box-shadow: var(--grey) -2px 2px 6px;
  border: 1px solid var(--grey);
  border-radius: 15px;
  font-size: 1.2em;
  transition: 0.2s ease-in all 0s;
  text-align: start;

  &:hover {
    padding-left: 15%;
    transform: scale(1.04);
    color: black;
    background-color: var(--lightgrey);
    box-shadow: var(--darkgrey) -2px 2px 6px;
    border: 1px solid var(--darkgrey);
  }
`

const Links = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  padding: 0.5em 15%;

  & > * + * {
    margin-top: 0.75em;
  }
`

const Title = styled.h1`
  padding: 0.5em;
  color: white;
  background-color: var(--primary);
  box-shadow: var(--darkprimary) 0px 1px 4px;
`

export default SignIn