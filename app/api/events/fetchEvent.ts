import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { event } from "@/types";

// Fetch a specific event from a room's Events subcollection
export async function fetchEvent(
  event_id: string,
  room_id: string
): Promise<event | null> {
  try {
    // Reference to the event document in Firestore
    const eventRef = doc(db, `rooms/${room_id}/Events`, event_id);
    const eventSnap = await getDoc(eventRef);

    // Check if the document exists
    if (!eventSnap.exists()) {
      console.log("Event not found");
      return null; // Return null if the event does not exist
    }

    // Return the event data along with its Firestore ID
    const eventData = eventSnap.data();
    return {
      id: Number(event_id),
      name: eventData.name,
      description: eventData.description,
      date: eventData.date.toDate(), // Convert Firestore Timestamp to JavaScript Date
      event_participants: eventData.event_participants,
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event. Please try again.");
  }
}
