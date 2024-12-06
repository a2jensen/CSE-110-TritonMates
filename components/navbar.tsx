"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState, } from 'react';
import { auth, signOut, User, } from "../firebase/firebaseConfig"
import { useRoomContext } from '@/app/context/RoomContext';


// Put this component in sites that need it
export default function Navbar() {
    const router = useRouter();
    const [, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    const excludedRouters = ["/", "/signup/about-usr", "/rooms" ,"/rooms/create", "/rooms/join"];
    const [ roomLink , setRoomLink ] = useState<string>("");
    const {roomData, fetchRoomData} = useRoomContext();

    const isExcluded = excludedRouters.includes(pathname);
    
    useEffect(() => {
        if (!roomData) {
            fetchRoomData(); // Fetch room data if not already loaded
        }
        }, [roomData, fetchRoomData]);

    if (isExcluded) {
        return null;
    }
    return (
        // what is navbar?
        <header className="bg-blue-300 p-4 px-4 shadow-lg">
            <div className="container">
                <div className="text-4xl pl-12">
                    <Link href="/">
                        <b>TritonMates</b>
                    </Link>
                </div>
                <nav className="nav-links text-xl px-0 font-semibold">
                    <ul>
                        
                        <li><Link href={`/dashboard/${roomData?.room_id}`}>Dashboard</Link></li>
                        <li><Link href="/user">User</Link></li>
                    </ul>
                </nav>
            </div>
            <style jsx>{`
                .navbar {
                    background: #333;
                    color: #fff;
                    padding: 1rem;
                }
                .container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    color: #fff;
                    text-decoration: none;
                    font-size: 1.2rem;
                }
                .nav-links ul {
                    display: flex;
                    list-style: none;
                    gap: 1rem;
                }
                .nav-links ul li a {
                    color: #fff;
                    text-decoration: none;
                }
            `}</style>
        </header>
    );
}
