import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <b>Sign Up</b>
            </div>
            <div>
                <Link href="/dashboard">Go To Dashboard</Link>
            </div>
        </>
    );
}
