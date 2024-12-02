
'use client'
import { useRoomContext } from "@/app/context/RoomContext";

const RoomSummary : React.FC = () => {
    const { roomData } = useRoomContext();

    return (
        <div className="flex">
            <h2> Welcome To Room: </h2>
            <p> Room ID: {roomData?.room_id || 'No RoomID available'}</p>
        </div>
    )
}

export default RoomSummary;