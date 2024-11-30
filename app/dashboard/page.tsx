"use client"
import Link from "next/link";
import Navbar from "../../components/navbar";
import TaskBoard from "../../components/tasks/taskBoard/taskBoard";
import EmailForm from "../../components/conflict/conflictForm";
import EventsManager from "@/components/events/eventsManager";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged, User } from "../../firebase/firebaseConfig";


export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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
        <Link className="text-blue-500 hover:underline" href="/user"><div className="w-16 h-16 bg-gray-400 rounded-full"></div></Link>
        <h2 className="text-xl"><Link className="text-blue-500 hover:underline" href="/user">User Profile</Link></h2>
      </div>

      <div className="space-y-6">
        <TaskBoard />
        <EmailForm />
        <EventsManager/>
      </div>
    </div>
  );
}
