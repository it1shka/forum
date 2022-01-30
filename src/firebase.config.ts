import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAORxTl3ahrpOPKiFRNzwx1oWsvfx2PN1g",
  authDomain: "forum-1f334.firebaseapp.com",
  projectId: "forum-1f334",
  storageBucket: "forum-1f334.appspot.com",
  messagingSenderId: "301455137328",
  appId: "1:301455137328:web:26c5602d8994a20d222bf5"
};

const app = initializeApp(firebaseConfig)
export default app