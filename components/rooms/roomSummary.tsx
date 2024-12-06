'use client'
import { useRoomContext } from "@/app/context/RoomContext";
import { leaveRoom, } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { get } from "http";
import { checkRoom, fetchRoomData } from "@/app/api/rooms";
import { useState } from "react";
import Roommate from "./roommate";

const RoomSummary: React.FC = () => {
    const [roomData, setRoomData1] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [roommates, setRoommates] = useState<string[]>([]);
    const {setRoomData} = useRoomContext();

    useEffect(() => {
        const handleUserAuth = async () => {
            const userData = await checkUserAuth();
            if (userData) {
                const user_id = userData.uid;
                if (user_id) {
                    const room_id = await checkRoom(user_id);
                    if (room_id) {
                        const roomData = await fetchRoomData(room_id);
                        if (roomData) {
                            setRoomData1(roomData);
                            setRoomData({...roomData, room_id : room_id, })
                            setLoading(false);
                            // Remove the user's UID from room_users
                            const filteredRoommates = roomData?.room_users?.filter((user: string) => user !== user_id);
                            setRoommates(filteredRoommates)
                            console.log('Room data fetched successfully', roomData);
                        }
                    }
                }
            }
        }
        handleUserAuth();
    }, []);



    const router = useRouter();
    // const { roomData } = useRoomContext();

    console.log('Context information in roomSummary component', roomData);
    const leaveRoomAction = async () => {
        try {
            const roomCode = roomData?.room_code;
            const userCheck = await checkUserAuth();
            const userId = userCheck?.uid;
            if (roomCode && userId) {
                await leaveRoom(roomCode, userId);
                router.push("/rooms")
            }
        } catch (error: unknown) {
            console.error("Error trying to leave room: ", error)
        }
    }
    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
            <div className="rounded-lg bg-sky-200 font-bold p-4 m-10 flex justify-between"
            style={{ 
                backgroundImage: "url('/avatars/sungod.png')",
                backgroundSize: "45%", // or "contain", "50% 50%", etc.
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
            }}
            >
                <div className="p-4 text-blue-500">
                    <h2> {roomData?.room_name || 'No Room name available'} </h2>
                    <h4> Room Code: {roomData?.room_code || 'No Room code available'}</h4>
                    <h4> Roommates: </h4>
                    <div className="flex mx-8">
                        {roommates.map((userId : string) => (
                            <Roommate key={userId} roommate_Id={userId}/>
                        ))
                        }
                    </div>
                    <button className="bg-red-100 p-1 rounded-md mr-8 h-12" onClick={leaveRoomAction}>
                    Leave Room
                </button>
                </div>
               
            </div>
    )
}

export default RoomSummary;