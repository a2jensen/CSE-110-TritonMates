
'use client'
import { useRoomContext } from "@/app/context/RoomContext";
import { leaveRoom, joinRoom } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRouter } from "next/navigation";

const RoomSummary : React.FC = () => {
    const router = useRouter();
    const { roomData } = useRoomContext();

    const leaveRoomAction = async () => {
        try {
            const roomCode = roomData?.room_code;
            const userCheck = await checkUserAuth();
            const userId = userCheck?.uid;
            if (roomCode && userId) {
                await leaveRoom(roomCode, userId);
                router.push("/rooms")
            }
        } catch (error : any) {
            console.error("Error trying to leave room: ", error)
        }
    }
    return (
        <div className="p-4">
            <div>
                <p> Welcome To Room: {roomData?.room_name || 'No Room name available'} </p>
                <p> Room Code: {roomData?.room_code || 'No Room code available'}</p>
            </div>
            <button onClick={leaveRoomAction}>
                Leave Room
            </button>
        </div>
    )
}

export default RoomSummary;