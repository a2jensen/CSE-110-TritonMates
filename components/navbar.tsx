"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { auth, provider, signInWithPopup, signOut, User, onAuthStateChanged } from "../firebase/firebaseConfig"



// Put this component in sites that need it
export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch (error : any) {
            console.error("Failed to sign out", error)  
        }
        router.push('/');
    }
    
    return (
        <header className="navbar">
            <div className="container">
                <div className="logo">
                    <Link href="/">
                        <b>TritonMates</b>
                    </Link>
                </div>
                <nav className="nav-links">
                    <ul>
                        <li><Link href="/rooms">Rooms</Link></li>
                        <li><Link href="/dashboard">Dashboard</Link></li>
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
