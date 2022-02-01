import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"

import MainLayout from "./pages/MainLayout"
import SignIn from "./pages/SignIn"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { setUser } from "./store/auth/actions"
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { UserData } from "./types"

const App = () => {
  const auth = getAuth()
  const dispatch = useDispatch<AppDispatch>()
  const db = getFirestore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // setting user globally for app
      dispatch(setUser(user))

      // updating user info in firestore db
      if(user === null) return

      const {
        displayName,
        email,
        photoURL,
        uid
      } = user
      const userData: UserData = {
        displayName: displayName ?? 'Incognito',
        email: email ?? 'No email',
        photoURL: photoURL
      }
      const userDoc = doc(db, 'users', uid)
      setDoc(userDoc, userData).catch(() => {
        alert('Failed to update user data!')
      })
    })
    return () => unsubscribe()
  }, [])

  const user = useSelector((state: AppState) => {
    return state.auth.user
  })

  return user ? <MainLayout /> : <SignIn />
}

export default App