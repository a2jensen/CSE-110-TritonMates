import Link from 'next/link'
// run "npm run dev" in CSE-110-GROUP1 folder to start the website
import SignInButton from "../components/users/googleAuthButton";

export default function Home() {
  return (
    <>
    <div className='place-content-center '>
      <h6>Welcome To TritonMates</h6>
      <SignInButton/>
    </div>
    </>
  );
}
