"use client"
import Link from "next/link";
import Navbar from "../../components/navbar";
import TaskBoard from "@/components/tasks/taskBoard/taskBoard";
import EmailForm from "../../components/conflict/conflictForm";
import EventsManager from "@/components/events/eventsManager";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged, User } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("Guest");
  const [points, setPoints] = useState(0);

  const fetchFromFirestore = async (uid: string, setName: React.Dispatch<React.SetStateAction<string>>, setPoints: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const userDocRef = doc(db, "user", uid);
      
      const userSnap = await getDoc(userDocRef);
      console.log("user data", userSnap.data());
      if (userSnap.exists()) {
        const fetchedName = userSnap.data().name;
        console.log(`Name from Firestore: ${fetchedName}`);
        setName(fetchedName);
        const fetchedPoints = userSnap.data().points;
        setPoints(fetchedPoints);
      } else {
        console.error("No such document in Firestore!");
        setName("Guest");
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
      setName("Guest");
    }
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
            {name} {/* Displays the name from our User collection on firestore. */}
            <br></br>Points: {points}
          </Link>
        </h2>
      </div>
      <div className="space-y-6">

        <TaskBoard />
        <EmailForm trigger={popUp} setTrigger={setpopUp} />
        <button onClick={() => setpopUp(true)}> Report Conflict</button>
        <EventsManager />
      </div>
    </div>
  );
}
