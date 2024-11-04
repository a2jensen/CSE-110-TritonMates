import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                Rooms
            </div>
            <div>
                <Link href="/dashboard">Go to dashboard</Link>
            </div>
        </>
    );
}
