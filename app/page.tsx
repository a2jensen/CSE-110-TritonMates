import Link from 'next/link'
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth/web-extension';
import {auth} from '../firebase/firebase.js'

// run "npm run dev" in CSE-110-GROUP1 folder to start the website

export default function Home() {



  const googleLogin = async() => {

    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
    
}
  return (
    <>
      <div>
        {/* hello world - Allen */}
        Roommate App
      </div>
      <div> <button onClick = {googleLogin}>Sign in With Google </button> </div>
      <div>
       
        <Link href="/signin">Sign In</Link>
      </div>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </>

  );
}
