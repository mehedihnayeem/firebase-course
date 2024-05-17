import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }

    const signOutFromPage = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }

    console.log(auth?.currentUser?.email)

  return (
    <div style={{textAlign: "center"}}>
      <input type="email" placeholder='Email...' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Password'  onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign In </button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={signOutFromPage}>Sign Out </button>
    </div>
  )
}

export default Auth
