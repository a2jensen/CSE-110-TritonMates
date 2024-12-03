"use client"; 

import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';
import { auth, provider, signInWithPopup, } from "../firebase/firebaseConfig"
import { checkIfUserExists } from './api/auth/login';
import { checkRoom, fetchRoomData } from './api/rooms';
import { useRoomContext } from './context/RoomContext';


// run "npm run dev" in CSE-110-GROUP1 folder to start the website


export default function Home() {

  const router = useRouter();
  //const [user, setUser] = useState<User | null>(null);
  const { roomData,  updateRoomData } = useRoomContext();


  const handleGoogleSignIn = async () => {
    try {
      console.log('about to run signInWithPopup')
      const result = await signInWithPopup(auth, provider);
      console.log("Results ", result.user)
      const userExists = await checkIfUserExists(result.user.uid);
      const token = await result.user.getIdToken();
      
      // set token
      document.cookie = `auth-token=${token}; path=/; secure; SameSite=Lax`; // ADD IN HTTP HERE SO USERS CAN LOG IT
      console.log("COOKIE",document.cookie)
      if (userExists) {
        const check = await checkRoom(result.user.uid); // checks if user is already in  room

        if (check && check.length !== 0) {
          const roomId = check;
          const roomDataFetch = await fetchRoomData(roomId);
          if (roomDataFetch) {
            const { room_name, room_code } = roomDataFetch;
            updateRoomData({
              ...roomData,
              room_id: roomId,
              room_name: room_name,
              room_code: room_code
            })
          }
          router.push(`/dashboard/${roomId}`); // sends user to their room dashboard
        } else {
          router.push('/rooms'); // will send them to join/create room
        }

      } else {
        // Redirect to about-usr if user doesn't exist
        router.push('/signup/about-usr');
      }
    } catch (error: unknown ) {
      console.error("Failed to sign in with google", error);
    }
  }

  return (
    <>
      <Logo />
      <img id="roommates-img" src='https://img.freepik.com/free-vector/parents-child-holding-their-cellphones-tablet-home-chatting-online-social-media_74855-14130.jpg?t=st=1731474608~exp=1731478208~hmac=940cc60f124ac8c46eb1bcc20dd97159c348b738a07328e006d802e0dc318565&w=996'></img>
      <h2 id="welcome-hdr" style={{ color: '#000000', marginTop: '20px' }}>Welcome to </h2>
      <h1>TritonMates!</h1>

      <button style={{ backgroundColor: '#59a6cb', color: '#FFFFFF', width: '230px', height: '50px', marginLeft: '280px', marginTop: '40px', border: '2px solid #FFFFFF', borderRadius: '23px', fontSize: '20px' }} onClick={handleGoogleSignIn}>
        Sign In with Google!
      </button>
    </>
  );
}