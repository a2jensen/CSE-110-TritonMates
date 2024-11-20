"use client";

import Link from 'next/link';


// Put this component in sites that need it
export default function Navbar() {
    return (
        <header className="navbar">
            <div className="container">
                <div className="logo">
                    <Link href="/">
                        <b>Tentative Navbar Component</b>
                    </Link>
                </div>
                <nav className="nav-links">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/events">Events</Link></li>
                        <li><Link href="/rooms">Rooms</Link></li>
                        <li><Link href="/signin">Sign In</Link></li>
                        <li><Link href="/">Sign Out/Up</Link></li>
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
