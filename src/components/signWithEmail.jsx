import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config/firebase'

function signInWithEmail() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }


  return (
    <div style={{textAlign: "center"}}>
      <input type="email" placeholder='Email...' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Password'  onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign In </button>
    </div>
  )
}

export default signInWithEmail
