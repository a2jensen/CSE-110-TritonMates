"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState, } from 'react';
import { auth, signOut, User, } from "../firebase/firebaseConfig"
import { checkUserAuth } from '@/app/api/user';
import { checkRoom } from '@/app/api/rooms';


// Put this component in sites that need it
export default function Navbar() {
    const router = useRouter();
    const [, setUser] = useState<User | null>(null);
    const pathname = usePathname();
    const excludedRouters = ["/", "/signup/about-usr", "/rooms" ,"/rooms/create", "/rooms/join"];
    const [ roomLink , setRoomLink ] = useState<string>("");

     
    if (excludedRouters.includes(pathname)) {
        return null;
    } 

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            document.cookie = `auth-token=; path=/; max-age=0;`;
            console.log('IS THIS EMPTY',document.cookie)
        } catch (error : unknown ) {
            console.error("Failed to sign out", error)  
        }
        router.push('/');
    }
    
    /** 
    useEffect(() => {
        const fetchRoomId = async () => {
            try {
                const userFetch = await checkUserAuth();
                if (userFetch) {
                    const userId = userFetch.uid;
                    const roomId = await checkRoom(userId);
                    if (roomId) {
                        setRoomLink(roomId);
                    }
                }
            } catch (error : unknown ) {
                console.error("Error trying to fetch room id")
            }
        }
        fetchRoomId();
    },[router]) */

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
                        <li><Link href="/rooms">Rooms</Link></li>
                        <li><Link href="/dashboard/">Dashboard</Link></li>
                        <li><Link href={`/dashboard/${roomLink}`}>Dashboard2</Link></li>
                        <li><Link href="/user">User</Link></li>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
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
