import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { event } from "@/types";

// Fetch all events from a room's Events subcollection
export async function getAllRoomEvents(room_id: string): Promise<event[]> {
  try {
    // Reference to the Events subcollection
    const eventsCollection = collection(db, `rooms/${room_id}/Events`);

    // Fetch all documents from the Events subcollection
    const querySnapshot = await getDocs(eventsCollection);

    // Map through the results and format them into the `event` type
    const events: event[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id, // Firestore-generated document ID
        name: data.name,
        description: data.description,
        date: data.date.toDate().toLocaleDateString(), // Convert Firestore Timestamp to JavaScript Date
        event_participants: data.event_participants,
      };
    });

    return events;
  } catch (error) {
    console.error("Error fetching room events:", error);
    throw new Error("Failed to fetch room events. Please try again.");
  }
}