"use client";
import Link from "next/link";
import TaskBoard from "@/components/tasks/taskBoard/taskBoard";
import EmailForm from "../../components/conflict/conflictForm";
import EventsManager from "@/components/events/eventsManager";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged, User } from "../../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { checkUserAuth } from "../api/user";
import { getUser } from "../api/user/UserContext";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null);

  const [name, setName] = useState("Guest");
  const [points, setPoints] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");

  const fetchFromFirestore = async (
    uid: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setPoints: React.Dispatch<React.SetStateAction<number>>
  ) => {
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
        } else {
          console.error("No such document in Firestore!");
          setName("Guest");
        }
      });
    } catch (error: unknown) {
      console.error("Error fetching user data from Firestore:", error);
      setName("Guest");
    }
  };

  const fetchCurrentUser = async (
    currentUserId: string,
    setCurrentUserId: React.Dispatch<string>
  ) => {
    const currentUser = await checkUserAuth();
    console.log("CURRENT USER", currentUser);
    const userId = currentUser?.uid || "";
    console.log("USER ID", userId);

    setCurrentUserId(userId);
  };

  const fetchPoints = async (
    currentUserId: string,
    setPoints: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const userData = await getUser(currentUserId);
    const current_points: number = userData?.points || 0;
    setPoints(current_points as number);
  };

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
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 mb-4 flex items-center gap-4">
        <Link className="text-blue-500 hover:underline" href="/user">
          <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        </Link>
        <h2 className="text-xl">
          <Link className="text-blue-500 hover:underline" href="/user">
            {name}{" "}
            {/* Displays the name from our User collection on firestore. */}
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
        <EventsManager />
      </div>
    </div>
  );
}
