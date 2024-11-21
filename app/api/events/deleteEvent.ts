import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// To delete an event in a room's Events subcollection
async function deleteEvent(eventName: string, room_id: string): Promise<void> {
  try {
    // Ref to the Events subcollection
    const roomRef = doc(db, "rooms", room_id);
    const eventsCollection = collection(roomRef, "Events");

    // Query the Events subcollection to find the event document by name
    const q = query(eventsCollection, where("name", "==", eventName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Event not found");
    }

    // Get the reference of the first matching event document
    const eventRef = querySnapshot.docs[0].ref;

    // Delete the event document
    await deleteDoc(eventRef);

    console.log("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event. Please try again.");
  }
}
