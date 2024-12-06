"use client";

import Link from "next/link";
import { useEffect } from "react";
import { checkRoom } from "../api/rooms";
import { checkUserAuth } from "../api/user";
import { useRouter } from "next/navigation";
import { useRoomContext } from "../context/RoomContext";
import AboutAnimation from "@/components/AboutAnimation";

export default function RoomsPage() {
    const { roomData } = useRoomContext();
    const router = useRouter();
    const room_id = roomData?.room_id

    useEffect(() => {
        const roomUserCheck = async () => {
            try {
                const user = await checkUserAuth();
                const user_id = user?.uid;
                if (user_id){
                    const check = await checkRoom(user_id);
                    if (check) {
                        alert("You are already in a room!");
                        router.push(`dashboard/${room_id}`);
                    }
                }
            } catch ( error : unknown ){
                console.error("error trying to check if user is in a room")
            }
        }
        roomUserCheck();
    }, [])
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <header className="text-center mb-6">
                    <h1 className="text-8xl font-bold text-blue-600">TritonMates</h1>
                </header>
            
                <div className="flex flex-col gap-4">
                    <Link href="/rooms/join">
                        <button className="bg-blue-500 text-white text-3xl w-60 py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition">
                            Join Room
                        </button>
                    </Link>
                    <Link href="/rooms/create">
                        <button className="bg-green-500 text-white text-3xl w-60 py-2 px-6 rounded-md shadow-md hover:bg-green-600 transition">
                            Create Room
                        </button>
                    </Link>
                    <Link href="/user">
                        <button className="bg-green-500 text-white text-3xl w-60 py-2 px-6 rounded-md shadow-md hover:bg-green-600 transition">
                            User
                        </button>
                    </Link>
                </div>
            </div>
            <AboutAnimation/>
        </div>
    
    );
}
