'use client'
import { useRoomContext } from "@/app/context/RoomContext";
import { leaveRoom, } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { get } from "http";
import { checkRoom, fetchRoomData } from "@/app/api/rooms";
import { useState } from "react";

const RoomSummary: React.FC = () => {



    const [roomData, setRoomData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUserAuth = async () => {
            const userData = await checkUserAuth();
            const user_id = userData?.uid  || "";
            const room_id = await checkRoom(user_id) || "";
            const roomData = await fetchRoomData(room_id);
            if (roomData) {
                setRoomData(roomData);
                setLoading(false);
                console.log('Room data fetched successfully', roomData);
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
        <div className="p-4 m-10 flex justify-between">
            <div className="p-2">
                <h2> {roomData?.room_name || 'No Room name available'} </h2>
                <h4> Room Code: {roomData?.room_code || 'No Room code available'}</h4>
            </div>
            <button className="bg-red-100 p-1 my-8 rounded-md" onClick={leaveRoomAction}>
                Leave Room
            </button>
        </div>
    )
}

export default RoomSummary;