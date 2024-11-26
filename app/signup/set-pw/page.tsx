"use client";   //keep this until separate client and server folders are made

import Logo from '@/components/logo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


// run "npm run dev" in CSE-110-GROUP1 folder to start the website

export default function SetPassword() {

  const router = useRouter();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password1.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    let hasNumber = false;
    for (let i = 0; i < password1.length; i++) {
      if ('0123456789'.includes(password1[i])) {
        hasNumber = true;
        break;
      }
    }
    if (!hasNumber) {
      alert("Password must contain at least one number");
      return;
    }


    let hasSpecialChar = false;
    for (let i = 0; i < password1.length; i++) {
      if ('@#$%'.includes(password1[i])) {
        hasSpecialChar = true;
        break;
      }
    }
    if (!hasSpecialChar) {
      alert("Password must contain at least one special character (e.g.: @, #, $, %)");
      return;
    }

    if(password1!=password2){
      alert("Both passwords should match");
      return;
    }

    router.push('/signup/about-usr');

  }

  return (
    <>
      <Logo/>
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>

      <h1 id="welcome-hdr">Set Your Password</h1>
     
      <form className="pwd-form" onSubmit={handleSubmit}>  
      <div id='input-field'>
        <div style={{  marginLeft: '50px', marginTop: '20px'}} >Create a password</div>
        <input onChange={(e)=>setPassword1(e.target.value)} value={password1} type='password' id='pw-input' placeholder= 'Create a password' required className="mt-[5px] ml-[50px] pt-[2px] pl-[15px] rounded-[5px] border border-[#0a0a0a] h-[50px] w-[250px]"></input>
      </div>

      <div id='input-field-2'>
        <div style={{  marginLeft: '50px', marginTop: '20px'}}>Confirm password</div>
        <input onChange={(e)=>setPassword2(e.target.value)} value={password2} type='password' id='pw-input-2' placeholder= 'Confirm password' required className="mt-5 ml-[50px] pt-[2px] pl-[15px] rounded-[5px] border border-[#0a0a0a] h-[50px] w-[250px]"></input>
      </div>

      <ul id='requirements' className="mt-5 ml-[50px]"> Your password must have at least:
          <li>8 characters</li>
          <li>1 special character (eg: @,#,$,%)</li>
          <li>1 number</li>
      </ul>

      <button type='submit' id='sign-up-btn1'>Next</button>
      </form>
      </>

  );
}
