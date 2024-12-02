import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { event } from "@/types";

// Edit an event in a room's Events subcollection
async function editEvent(eventData, room_id){
  try {
    // Reference to the room document
    const roomRef = doc(db, "rooms", room_id);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) {
      throw new Error("Room not found");
    }

    //Access event reference in firestore
    const eventRef = doc(db, `rooms/${room_id}/events`, eventData.id);


    //Check if event exists
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      throw new Error("Event not found");
    }


    // Prepare updated data with converted date
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