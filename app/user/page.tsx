import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                User
            </div>
            <div>
                <Link href="/dashboard">Go to dashboard</Link>
            </div>
        </>
    );
}
