'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import React from "react";
import TaskBoard from "@/components/tasks/taskBoard/taskBoard";
import EventsManager from "@/components/events/eventsManager";
import RoomSummary from "@/components/rooms/roomSummary";
import { auth, onAuthStateChanged, User} from '../../../firebase/firebaseConfig';
import Link from "next/link";
import { useRoomContext } from "../../context/RoomContext"
import { fetchRoomData } from "@/app/api/rooms";


const dashboardPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const {roomData, setRoomData} = useRoomContext();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // unwrap params promise
    const { id : roomId } = React.use(params);

    useEffect(() => {
        const onLoad = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/');
                alert("Sign in first!");
            }
            setLoading(false);
        })
        return () => onLoad()
    }, [router, roomId, setRoomData])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
          <RoomSummary/>
          <div className="bg-white p-4 mb-4 flex items-center gap-4">
            <Link className="text-blue-500 hover:underline" href="/user"><div className="w-16 h-16 bg-gray-400 rounded-full"></div></Link>
            <h2 className="text-xl"><Link className="text-blue-500 hover:underline" href="/user">User Profile</Link></h2>
          </div>
          <div className="space-y-6">
            <TaskBoard />
            <EventsManager/>
          </div>
        </div>
      );
}

export default dashboardPage