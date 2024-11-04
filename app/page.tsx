import Link from 'next/link'



export default function Home() {
  return (
    <>
      <div>
        Roommate App
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
