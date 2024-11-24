import UpcomingEvents from "../../components/events/upcomingEvents";
import Link from "next/link";
import Navbar from "../../components/navbar";
import TaskBoard from "../../components/tasks/taskBoard/taskBoard";
import EventsManager from "@/components/events/eventsManager";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 mb-4 flex items-center gap-4">
        <Link className="text-blue-500 hover:underline" href="/user"><div className="w-16 h-16 bg-gray-400 rounded-full"></div></Link>
        <h2 className="text-xl"><Link className="text-blue-500 hover:underline" href="/user">User Profile</Link></h2>
      </div>

      <div className="space-y-6">
        <TaskBoard />
        <EventsManager />
      </div>
    </div>
  );
}
