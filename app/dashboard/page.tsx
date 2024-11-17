import UpcomingEvents from "../../components/events/upcomingEvents";
import Link from "next/link";
import { TaskStatus } from "./task";
import Navbar from '../../components/navbar';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"

export default  async function Home() {
  const docRef = collection(db, "rooms");
  const docsSnap = await getDocs(docRef);

    // Loop through documents in the collection
  docsSnap.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });

  return (
    <div className="flex">
      <div className="w-64">
        <div>
          <b>Dashboard</b>
        </div>
            <div>
                <Link href="/events">Go to events page</Link>  
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
      <UpcomingEvents roomName="testRoom" events={[]}/>
      <div className="flex-1 ml-4">
        <TaskStatus />
      </div>
    </div>
  );
}
