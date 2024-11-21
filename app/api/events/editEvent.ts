import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { event } from "@/types";

// To edit an event in a room's Events subcollection using a generated ID
async function editEvent(eventData: event, room_id: string): Promise<void> {
  try {
    // Reference to the room document
    const roomRef = doc(db, "rooms", room_id);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) {
      throw new Error("Room not found");
    }

    // Reference to the Events subcollection
    const eventsCollection = collection(roomRef, "Events");

    // Query the Events subcollection to find the document with matching criteria (e.g., `name`)
    const q = query(eventsCollection, where("name", "==", eventData.name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Event not found");
    }

    // Firestore-generated ID of the first matching event
    const eventRef = querySnapshot.docs[0].ref;

    // Prepare updated data with a Firestore-compatible `date`
    const updatedData = {
      ...eventData,
      date: Timestamp.fromDate(eventData.date),
    };

    // Update the event document with new data
    await updateDoc(eventRef, updatedData);

    console.log("Event updated successfully");
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event. Please try again.");
  }
}
