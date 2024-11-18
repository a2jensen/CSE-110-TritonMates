"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Use Next.js router for navigation

    const handleCreate = () => {
        console.log("Creating room:", roomName, "Password:", password);
    };

    const handleBack = () => {
        router.push("/rooms"); // Navigate back to the Rooms page
    };

    return (
        <div className="container">
            <div className="logo">LOGO</div>
            <h1>Create Room Page</h1>
            <input
                type="text"
                placeholder="Room Name or Number"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="create-button" onClick={handleCreate}>Create Room</button>
            <button className="back-button" onClick={handleBack}>
                Back
            </button>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #f7f7f7;
                }
                .logo {
                    background: #fbe4a1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                h1 {
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    color: #333;
                }
                input {
                    width: 300px;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    padding: 10px 20px;
                    margin-top: 10px;
                    background: #add8e6;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .back-button {
                    margin-top: 15px;
                    background: #ccc;
                    color: #333;
                }
                .back-button:hover {
                    background: #bbb;
                }
                .create-button:hover {
                    background: #90c3e6;
                }
            `}</style>
        </div>
    );
}
