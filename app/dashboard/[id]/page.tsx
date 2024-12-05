"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import TaskBoard from "@/components/tasks/taskBoard/taskBoard";
import EventsManager from "@/components/events/eventsManager";
import RoomSummary from "@/components/rooms/roomSummary";
import { auth, onAuthStateChanged, User } from "../../../firebase/firebaseConfig";
import Link from "next/link";
import { useRoomContext } from "../../context/RoomContext";
import { getUser } from "../../api/user/UserContext"; // Import the getUser function

const DashboardPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { setRoomData } = useRoomContext();
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState("/avatars/default.png"); // Default avatar

  // Unwrap params promise
  const { id: roomId } = React.use(params);

  useEffect(() => {
    const onLoad = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userData = await getUser(currentUser.uid);
          if (userData && userData.avatar) {
            setAvatar(userData.avatar); // Set the user's avatar
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push("/");
        alert("Sign in first!");
      }
      setLoading(false);
    });
    return () => onLoad();
  }, [router, roomId, setRoomData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoomSummary />
      <div className="bg-white p-4 mb-4 flex items-center gap-4">
        {/* Display the user's avatar */}
        <Link className="text-blue-500 hover:underline" href="/user">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border border-gray-300"
          />
        </Link>
        <h2 className="text-xl">
          <Link className="text-blue-500 hover:underline" href="/user">
            User Profile
          </Link>
        </h2>
      </div>
      <div className="space-y-6">
        <TaskBoard />
        <EventsManager />
      </div>
    </div>
  );
};

export default DashboardPage;
