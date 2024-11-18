import UpcomingEvents from "../../components/events/upcomingEvents";
import Link from "next/link";
import { TaskStatus } from "./task";
import Navbar from '../../components/navbar';

export default function Home() {
  return (
    <div className="flex">
      <div className="w-64">
        <div>
          <b>Dashboard</b>
        </div>
      </div>
      <UpcomingEvents roomName="testRoom" events={[]} />
      <div className="flex-1 ml-4">
        <TaskStatus />
      </div>
    </div>
  );
}
