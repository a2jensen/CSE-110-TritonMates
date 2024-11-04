import UpcomingEvents from "@/components/events/upcomingEvents";
import Link from "next/link";
import { TaskStatus } from "./task";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-64">
        <div>
          <b>Dashboard</b>
        </div>
        <div>
          <Link href="/user">Go to user page</Link>
        </div>
        <div>
          <Link href="/rooms">Go to rooms page</Link>
        </div>
        <div>
          <Link href="/shop">Go to shop page</Link>
        </div>
        <div>
          <Link href="/">Sign out</Link>
        </div>
      </div>
      <UpcomingEvents roomName="testRoom"/>
      <div className="flex-1 ml-4">
        <TaskStatus />
      </div>
    </div>
  );
}
