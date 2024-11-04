import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <b>Dashboard</b>
            </div>
            <div>
                <Link href="/user">Go to user page</Link>  
            </div>
            <div>
                <Link href="/rooms">Go to rooms page</Link>
            </div>
            <div>
                <Link href="/">Sign out</Link>
            </div>
        </>
    );
}
