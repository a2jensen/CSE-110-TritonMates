import UpcomingEvents from "../../components/events/upcomingEvents";
import Link from "next/link";
import Navbar from "../../components/navbar";
import TaskBoard from "../../components/tasks/taskBoard/taskBoard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 mb-4 flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        <h2 className="text-xl">User Profile</h2>
      </div>

      <div className="space-y-6">
        <TaskBoard />
        <UpcomingEvents roomName="testRoom" events={[]} />
      </div>
    </div>
  );
}
