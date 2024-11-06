import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <b>User</b>
            </div>
            <div>
                <Link href="/dashboard">Return to dashboard</Link>
            </div>
        </>
    );
}
