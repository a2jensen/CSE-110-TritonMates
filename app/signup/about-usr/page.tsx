"use client";   //keep this until separate client and server folders are made

import Link from 'next/link'
import Logo from '../../../components/logo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addUserToFirestore } from '@/app/api/auth/login';
import firebase from 'firebase/app';
import { auth } from '@/firebase/firebaseConfig';
import { checkUserAuth } from '@/app/api/user';


// run "npm run dev" in CSE-110-GROUP1 folder to start the website

export default function AboutUser() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [points, setPoints] = useState(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name: ", name);

    if (!name) {
      alert("Enter name");
      return;
    }
    if (!date) {
      alert("Enter Date of Birth");
      return;
    }

    // Replace this with actual user ID from Google Auth
    const user = await checkUserAuth();
    if (user) {
      const userId = user.uid;
      await addUserToFirestore(userId, name, date, points);
    }
    // THERE IS AN ERROR IN CASE CURRENT USER IS NULL BUT IT CANNOT BE NULL.
    //await addUserToFirestore(userId, name, date);

    router.push('/rooms');
  };

  
  return (
    <>
      <Logo />
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>
      <h1 id="welcome-hdr">Tell us about yourself!</h1>

      <form className="form" onSubmit={handleSubmit}>
      <div id='input-field'>
        <div style={{  marginLeft: '50px', marginTop: '20px'}}>Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='name-input' placeholder= 'Name' required className="mt-[5px] ml-[50px] pt-[2px] pl-[15px] rounded-[5px] border border-[#0a0a0a] h-[50px] w-[250px]"></input>
      </div>

      <div id='input-field'>
        <div style={{  marginLeft: '50px', marginTop: '20px'}}>Date of birth</div>
        <input onChange={(e) => setDate(e.target.value)} value={date} type='date' id='date-input' placeholder= 'MM/DD/YYYY' required className="mt-5 ml-[50px] pt-[2px] pl-[15px] rounded-[5px] border border-[#0a0a0a] h-[50px] w-[250px]"></input>
      </div>
      <button type='submit' id='sign-up-btn1'>Get Started!</button>
      
      </form>

      </>

  );
}
