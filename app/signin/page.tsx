import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <b>Sign In</b>
            </div>
            <div>
                <Link href="/dashboard">Go to dashboard</Link>
            </div>
        </>
    );
}
