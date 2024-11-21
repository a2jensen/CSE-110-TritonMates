import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { event } from "@/types";

// Fetch an event from a room's Events subcollection by query
export async function fetchEvent(
  room_id: string,
  criteria: Partial<event>
): Promise<event | null> {
  try {
    // Reference to the Events subcollection
    const eventsCollection = collection(db, `rooms/${room_id}/Events`);

    // Build a query based on provided criteria
    const filters = [];
    if (criteria.name) filters.push(where("name", "==", criteria.name));
    if (criteria.date)
      filters.push(where("date", "==", criteria.date.toISOString()));
    if (criteria.description)
      filters.push(where("description", "==", criteria.description));

    const q = query(eventsCollection, ...filters);

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents were found
    if (querySnapshot.empty) {
      console.log("No matching event found");
      return null;
    }

    // Fetch the first matching event
    const eventSnap = querySnapshot.docs[0];
    const eventData = eventSnap.data();

    // Return the event data
    return {
      id: Number(eventSnap.id), // Convert Firestore ID to number (need to discuss this)
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
