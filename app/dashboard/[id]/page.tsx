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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { checkUserAuth } from "@/app/api/user";
import EmailForm from "@/components/conflict/conflictForm";

const DashboardPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { setRoomData } = useRoomContext();
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState("/avatars/default.png"); // Default avatar

  const [name, setName] = useState("Guest");
  const [points, setPoints] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");

  const fetchFromFirestore = async (uid: string, setName: React.Dispatch<React.SetStateAction<string>>, setPoints: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const userDocRef = doc(db, "user", uid);

      onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.points !== undefined) {
            const fetchedName = data.name; 
            console.log(`Name from Firestore: ${fetchedName}`);
            setName(fetchedName); 
            setPoints(data.points); // Update points state in real-time
          }
        }
        else {
          console.error("No such document in Firestore!");
          setName("Guest");
        } 
      });
      
    } catch (error : unknown ) {

      console.error("Error fetching user data from Firestore:", error);
      setName("Guest");
    }
  };

  const fetchCurrentUser = async (   currentUserId: string,
    setCurrentUserId: React.Dispatch<string>)=>{
    const currentUser = await checkUserAuth();
    console.log("CURRENT USER", currentUser);
    const userId = currentUser?.uid  || '' ;
    console.log("USER ID", userId);
    setCurrentUserId(userId);
  }

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

  const [popUp, setpopUp] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFromFirestore(currentUser.uid, setName, setPoints);
        // fetchFromFirestore('D3eIVTebFOhTKaptvyDCXfF0TYb2',setName, setPoints); // Fetch the name from Firestore
        setLoading(false);
      } else {
        router.push("/");
        alert("Sign In First!");
      }
      fetchCurrentUser(currentUserId, setCurrentUserId);
 
    });

    return () => unsubscribe();
  }, [router]);

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
            {name} {/* Displays the name from our User collection on firestore. */}
            <br></br>Points: {points}
          </Link>
        </h2>
      </div>
      <div className="space-y-6">
        <TaskBoard />
        <EmailForm trigger={popUp} setTrigger={setpopUp} />
        <div className="flex justify-center items-center my-4">
          <button
            onClick={() => setpopUp(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md 
            transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 
            focus:ring-gray-400"
          >
            🦝 Report Conflict
          </button>
        </div>
        <EventsManager roomId={roomId}/>
      </div>
    </div>
  );
};

export default DashboardPage;
