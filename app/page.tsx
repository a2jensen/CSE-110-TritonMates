
"use client";   //keep this until separate client and server folders are made
import Link from 'next/link'

import { styleText } from 'util'
import { useRouter } from 'next/navigation';
// import Logo from './components/logo'
import { useState } from 'react';
import Logo from '@/components/logo';


// run "npm run dev" in CSE-110-GROUP1 folder to start the website


export default function Home() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!email){
      alert("Enter email");
      return;
    }
    
    router.push('/signup/set-pw');
  }
  
  return (
    <>
      <Logo/>
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>
      <h1 id="welcome-hdr">Welcome!</h1>

      <form className="email-form" onSubmit={handleSubmit}>
      <div id='email'>
        <div style={{ marginLeft: '10px' }}>Enter email</div>
        <input type='email' id='email-input' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder= 'Enter email' required></input>
      </div>

      <button type='submit' id='sign-up-btn1'>Next</button>

      <div style={{marginLeft: '60px', marginTop:'30px'}}>
      <hr id='line1'></hr> or <hr id='line1'></hr>

      </div>

      </form>
      
      <button style={{width:'50px', marginLeft:'130px', marginTop:'20px'}}>
        <img src='https://cdn4.iconfinder.com/data/icons/picons-social/57/09-google-3-512.png'></img>
      </button>

      <div style={{marginLeft:'30px', marginTop:'20px'}}>
        Already have an account? <Link style={{textDecoration:'underline'}} href="/signin">Sign in here</Link>
      </div>
    </>
  );
}