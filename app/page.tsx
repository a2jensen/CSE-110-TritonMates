import Link from 'next/link'

// run "npm run dev" in CSE-110-GROUP1 folder to start the website

export default function Home() {
  return (
    <>
      <div>
        <b>Roommate App</b>
      </div>
      <div>
        <Link href="/signin">Sign In</Link>
      </div>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </>

  );
}
