
'use client'
import { useRoomContext } from "@/app/context/RoomContext";
import { leaveRoom,  } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRouter } from "next/navigation";

const RoomSummary : React.FC = () => {
    const router = useRouter();
    const { roomData } = useRoomContext();

    console.log('Context information in roomSummary component',roomData);
    const leaveRoomAction = async () => {
        try {
            const roomCode = roomData?.room_code;
            const userCheck = await checkUserAuth();
            const userId = userCheck?.uid;
            if (roomCode && userId) {
                await leaveRoom(roomCode, userId);
                router.push("/rooms")
            }
        } catch (error : unknown ) {
            console.error("Error trying to leave room: ", error)
        }
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