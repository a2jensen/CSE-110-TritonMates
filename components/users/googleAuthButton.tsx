"use client"

import { useState } from 'react';
import { auth, provider, signInWithPopup, signOut, User } from "../../firebase/firebaseConfig"

export default function GoogleAuthButton() {
    const [user, setUser] = useState<User | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            console.log('about to run signInWithPopup')
            const result = await signInWithPopup(auth, provider);
            console.log("Results ", result.user)
            setUser(result.user);
        } catch (error : any) {
            console.error("Failed to sign in with google", error);
        }
    }

    const handleSignOut = async () => {
        try {
            const result = await signOut(auth)
            setUser(null)
        } catch (error : any) {
            console.error("Failed to sign out", error)  
        }
    }
    
    return (
        <div>
          {user ? (
            <div>
              <p>Welcome, {user.displayName}!</p>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          )}
        </div>
      );
}