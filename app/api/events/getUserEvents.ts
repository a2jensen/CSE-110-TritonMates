import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { event } from "@/types";

// Fetch all events a user is participating in
export async function fetchUserEvents(user_id: string, room_id: string): Promise<event[]> {
  try {
    // Reference to the room document
    const roomRef = doc(db, "rooms", room_id);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      throw new Error("Room not found");
    }

    // Reference to the Events collection in the specific room
    const eventsCollection = collection(db, `rooms/${room_id}/events`);

    // Query the events where the user is a participant
    const q = query(eventsCollection, where("event_participants", "array-contains", user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No events found for the user");
      return [];
    }

    // Map through the results and format them into the `event` type
    const events: event[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        date: data.date.toDate(),
        event_participants: data.event_participants,
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw new Error("Failed to fetch user events. Please try again.");
  }
}
