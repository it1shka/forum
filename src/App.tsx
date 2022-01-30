import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"

import MainLayout from "./pages/MainLayout"
import SignIn from "./pages/SignIn"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { setUser } from "./store/auth/actions"

const App = () => {
  const auth = getAuth()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(setUser(user))
    })
    return () => unsubscribe()
  }, [])

  const user = useSelector((state: AppState) => {
    return state.auth.user
  })

  return user ? <MainLayout /> : <SignIn />
}

export default App