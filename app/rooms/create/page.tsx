"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom, checkRoom, fetchRoomData } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRoomContext } from "@/app/context/RoomContext";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 
    const [error, setError] = useState<boolean>(false);
    const {  setRoomData, updateRoomData } = useRoomContext();

    const handleCreate = async () => {
        console.log("Creating room:", roomName, "Password:", password);
        const user = await checkUserAuth();

        // check if user exists
        if (user) {
            const user_id = user.uid;
            const create = await createRoom(roomName, user_id, password);
            if (create) { // confirm that its created and to also query the roomId
                // fetch roomId
                const check = await checkRoom(user_id)
                const roomId = check;
                console.log("Create room bug check roomId,", roomId)
                if (check ){ // if room was created, fetch roomName and code for context
                    const fetchData = await fetchRoomData(check);
                    if (fetchData) {
                        const { room_name, room_code } = fetchData;
                        updateRoomData({...setRoomData, 
                            room_id : roomId, 
                            room_name : room_name,
                            room_code : room_code
                        })
                    }
                    console.log("UPDATING ROOM 111", roomId)
                    //updateRoomData({...setRoomData, room_id : roomId })
                } else {
                    setError(true);
                }
                router.push(`/dashboard/${roomId}`);
        } else {
            console.error("Error trying to check if user exists");
            alert("Error trying to check if user exists")
        }

        //router.push('/dashboard')
        };
    }
    const handleBack = () => {
        router.push("/rooms"); // Navigate back to the Rooms page
    };

    if (error) {
        alert("Error trying to create a room")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <img 
                src="/Home-About.png" 
                alt="Description of the image" 
                className="w-180 h-180 object-cover rounded-lg "
            />
            <div className="flex flex-col items-center gap-4 w-80">
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    className="w-full bg-blue-500 text-white py-2 px-6 rounded-md shadow-md text-xl hover:bg-blue-600 transition"
                    onClick={handleCreate}>
                        Create Room
                </button>
                <button  className="w-full bg-gray-300 text-gray-700 py-2 px-6 rounded-md shadow-md text-xl hover:bg-gray-400 transition" onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    );
}