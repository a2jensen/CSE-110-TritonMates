"use client";

import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="container">
                <div className="logo">
                    <Link href="/">
                        <b>Navbar Component</b>
                    </Link>
                </div>
                <nav className="nav-links">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/user">User Page</Link></li>
                        <li><Link href="/rooms">Rooms</Link></li>
                        <li><Link href="/signout">Sign Out</Link></li>
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
