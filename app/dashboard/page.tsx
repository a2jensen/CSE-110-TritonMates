"use client";
"use client";
import Link from "next/link";
import Navbar from "../../components/navbar";
import TaskBoard from "../../components/tasks/taskBoard/taskBoard";
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
  const [name, setName] = useState("Guest"); // State to hold the user's name
  const [points, setPoints] = useState(0);
  // Move the fetchFromFirestore function here
  const fetchFromFirestore = async (uid: string) => {
    try {
      // Reference the document in Firestore
      const userDocRef = doc(db, "user", uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const fetchedName = userSnap.data().name; // Access the `name` field
        console.log(`Name from Firestore: ${fetchedName}`);
        setName(fetchedName); // Update the name state
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFromFirestore(currentUser.uid); // Fetch the name from Firestore
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
        <EventsManager />
      </div>
    </div>
  );
}
