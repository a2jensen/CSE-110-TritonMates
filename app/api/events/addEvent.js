
import { db } from '@/firebase/firebaseConfig.ts';
import { collection, doc, addDoc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

// To add an event to a room's Events subcollection

export async function addEvent(
  eventData, //This will allow front end to pass event object without ID
  room_id,
  event_participants
){
  try {
    // Reference to the room document
    const roomRef = doc(db, "rooms", room_id);
    const roomSnap = await getDoc(roomRef);

    console.log("roomID", room_id);


    const roomData = roomSnap.data();
    const roomMembers = roomData?.Members || [];

    // Validate participants: Ensure all participants are members of the room (CAN BE REMOVED)
    const validParticipants = event_participants.filter((participant) =>
      roomMembers.includes(participant)
    );

    if (validParticipants.length !== event_participants.length) {
      throw new Error("Some participants are not members of the room");
    }


    // Reference to the Events subcollection in the specific room
    const eventsCollection = collection(roomRef, "Events");

    
    // Add a document to the Events subcollection with room and participants info
    const docRef = await addDoc(eventsCollection, {
      ...eventData,
      date: Timestamp.fromDate(eventData.date), // Convert to Firestore-compatible Timestamp
      event_participants: validParticipants, // Add only valid participants
      createdAt: Timestamp.now(), // Timestamp for creation time of the event document
    });

    await updateDoc(docRef, { id: docRef.id }); //Adding firebase generated id to event

    console.log("Event added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw new Error("Failed to add event. Please try again.");
  }
}