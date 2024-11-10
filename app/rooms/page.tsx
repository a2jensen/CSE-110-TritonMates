import Link from "next/link";
import Navbar from "../../components/navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            <div>
                <b>Rooms</b>
            </div>
            <div>
                <Link href="/dashboard">Return to dashboard</Link>
            </div>
        </>
    );
}
