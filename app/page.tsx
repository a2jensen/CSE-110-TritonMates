
"use client";   //keep this until separate client and server folders are made
import Link from 'next/link'

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import Logo from '@/components/logo';
import { auth, provider, signInWithPopup, signOut, User } from "../firebase/firebaseConfig"
import { checkIfUserExists } from './api/auth/login';


// run "npm run dev" in CSE-110-GROUP1 folder to start the website


export default function Home() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const handleGoogleSignIn = async () => {
    try {
        console.log('about to run signInWithPopup')
        const result = await signInWithPopup(auth, provider);
        console.log("Results ", result.user)
        setUser(result.user);

        const userExists = await checkIfUserExists(result.user.uid);
        if (userExists) {
          // Redirect to dashboard if user exists
          router.push('/dashboard');
        } else {
          // Redirect to about-usr if user doesn't exist
          router.push('/signup/about-usr');
        }
    } catch (error : any) {
        console.error("Failed to sign in with google", error);
    }
}

const roomCheck = async () => {
  try {

  } catch (error : any){
    console.error("Error trying to check if user is in a room", error)
  }
}

/*  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!email){
      alert("Enter email");
      return;
    }
    if(!password){
        alert("Enter password");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
        }

        let hasNumber = false;
        for (let i = 0; i < password.length; i++) {
        if ('0123456789'.includes(password[i])) {
            hasNumber = true;
            break;
        }
        }
        if (!hasNumber) {
        alert("Password must contain at least one number");
        return;
        }


        let hasSpecialChar = false;
        for (let i = 0; i < password.length; i++) {
        if ('@#$%'.includes(password[i])) {
            hasSpecialChar = true;
            break;
        }
        }
        if (!hasSpecialChar) {
        alert("Password must contain at least one special character (e.g.: @, #, $, %)");
        return;
        }

      //TODO: Check if password matches the password set by user for the email entered. (Connect to backend)

        router.push('/dashboard');
  }
  */
  return (
    <>
      <Logo/>
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>
      <h2 id="welcome-hdr" style={{color: '#000000', marginTop:'20px'}}>Welcome to </h2>
      <h1>TritonMates!</h1>

      <button style={{ backgroundColor: '#59a6cb', color: '#FFFFFF', width:'230px', height:'50px' ,marginLeft:'280px', marginTop:'40px', border:'2px solid #FFFFFF', borderRadius:'23px', fontSize:'20px'}} onClick={handleGoogleSignIn}>
        Sign In with Google!
      </button>
    </>
  );
}
