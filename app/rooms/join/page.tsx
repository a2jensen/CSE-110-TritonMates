"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinRoom } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRoomContext } from "@/app/context/RoomContext";


export default function JoinRoom() {
    const [roomCode, setRoomCode] = useState("");
    const router = useRouter(); // Use Next.js router for navigation
    const { roomData, setRoomData} = useRoomContext();

    const handleJoin = async () => {
        console.log("Joining room with code:", roomCode);
        try {
            const user = await checkUserAuth();
            if (user) {
                const userId = user.uid;
                const join = await joinRoom(roomCode, userId);
                const roomId = join;

                if ( join ) {
                    router.push(`/dashboard/${roomId}`);
                    setRoomData({...roomData, room_id : roomId}); // this will only set room_id in context
                };
            }

        } catch ( error : unknown ) {
            console.error("Error trying to join room", error)
            alert("Error trying to join room")
        }
    };

    const handleBack = () => {
        router.push("/rooms"); // Navigate back to the Rooms page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-400">
            <img 
                src="/Home-About.png" 
                alt="Description of the image" 
                className="w-180 h-180 object-cover rounded-lg "
            />
            <div className="flex flex-col items-center gap-4 w-80">
                <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="w-full bg-blue-500 text-white py-2 px-6 rounded-md shadow-md text-xl hover:bg-blue-600 transition"
                    onClick={handleJoin}
                >
                    Join Room
                </button>
                <button
                    className="w-full bg-gray-300 text-gray-700 py-2 px-6 rounded-md shadow-md text-xl hover:bg-gray-400 transition"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
        </div>

    );
}
