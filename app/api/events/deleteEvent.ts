import { db } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

// Delete an event using event ID
async function deleteEvent(eventId: string, room_id: string): Promise<void> {
  try {
    // Reference to the specific event document in the room's Events subcollection
    const eventRef = doc(db, `rooms/${room_id}/events`, eventId);

    // Delete the event document
    await deleteDoc(eventRef);

    console.log("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event. Please try again.");
  }
}