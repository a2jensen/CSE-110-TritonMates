"use client";   //keep this until separate client and server folders are made

import Link from 'next/link'
import { styleText } from 'util'
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import './sign-in.css';
import Logo from '@/components/logo';

import { signInUser } from '../context/AuthContext.js'; 


// run "npm run dev" in CSE-110-GROUP1 folder to start the website


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const user = await signInUser(email, password);
      console.log("Signed in user:", user);
      // Redirect to dashboard or another page
    } catch (error) {
      if (error instanceof Error) {
    console.log(error.message); // Safely access 'message' property
  } else {
    console.log("An unexpected error occurred");
  }
    }
  };
  
  return (
    <>
      <Logo/>
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>
      <h1 id="welcome-hdr">Welcome!</h1>

      <form className="email-form" onSubmit={handleSignIn}>
      
      <div id='field'>
        <div style={{ marginLeft: '10px' }}>Enter email</div>
        <input type='email' id='email-input' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder= 'Enter email' required></input>
      </div>

      <div id='field'>
        <div style={{ marginLeft: '10px' }}>Enter password</div>
        <input type='password' id='password-input' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder= 'Enter password' required></input>
      </div>

      <button type='submit' id='sign-up-btn1'>Log In</button>

      <div style={{marginLeft: '60px', marginTop:'30px'}}>
      <hr id='line1'></hr> or <hr id='line1'></hr>
      </div>

      </form>
      
      <button style={{width:'50px', marginLeft:'130px', marginTop:'20px'}}>
        <img src='https://cdn4.iconfinder.com/data/icons/picons-social/57/09-google-3-512.png'></img>
      </button>

      <div style={{marginLeft:'30px', marginTop:'20px'}}>
        Don't have an account? <Link style={{textDecoration:'underline'}} href="/signup">Sign up here</Link>
      </div>
    </>

  );
}
