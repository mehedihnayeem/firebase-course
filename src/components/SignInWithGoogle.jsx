import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../config/firebase'
import HomePage from './HomePage'

function SignInWithGoogle() {


    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    onAuthStateChanged(auth, (user)=> {
        if(user){
            return <HomePage/>
        }
    })


  return (
    <div style={{textAlign: "center"}}>
      <button onClick={signInWithGoogle} className='signInBtn'>Sign In With Google</button>
    </div>
  )
}

export default SignInWithGoogle

