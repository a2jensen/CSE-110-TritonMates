import { db } from "@/firebase/firebaseConfig";
import { collection, doc, addDoc, getDoc, Timestamp, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { event } from "@/types";




// Add an event to a room's Events subcollection

export async function addEvent(
    eventData: Omit<event, "id">, //This will allow front end to pass event object without ID
    room_id: string,
    //event_participants: string[] = []
): Promise<string> {
    try {
        // Reference to the room document
        const roomRef = doc(db, "rooms", room_id);
        const roomSnap = await getDoc(roomRef);

        // Check if the room exists and has members
        if (!roomSnap.exists()) {
            throw new Error("Room not found");
        }

        //const roomData = roomSnap.data();
        //const roomMembers = roomData?.Members || [];

        // Validate participants: Ensure all participants are members of the room (CAN BE REMOVED)
        // const validParticipants = event_participants.filter((participant) =>
        //   roomMembers.includes(participant)
        // );

        // if (validParticipants.length !== event_participants.length) {
        //   throw new Error("Some participants are not members of the room");
        // }


        // Reference to the Events subcollection in the specific room
        const eventsCollection = collection(roomRef, "events");


        // Add a document to the Events subcollection with room and participants info
        const docRef = await addDoc(eventsCollection, {
            ...eventData,
            date: Timestamp.fromDate(eventData.date), // Convert to Firestore-compatible Timestamp
            event_participants: [], // Add only valid participants
            createdAt: Timestamp.now(), // Timestamp for creation time of the event document
        });

        await updateDoc(docRef, { id: docRef.id }); //Adding firebase generated id to event

        console.log("Event added with ID:", docRef.id, room_id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding event:", error);
        throw new Error("Failed to add event. Please try again.");
    }
}


//====================================================================//


// Delete an event using event ID
export async function deleteEvent(eventId: string, room_id: string): Promise<void> {
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


//====================================================================//


// Edit an event in a room's Events subcollection
export async function editEvent(eventData: event, room_id: string): Promise<void> {
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

//====================================================================//


export async function getAllRoomEvents(room_id: string): Promise<event[]> {
    try {
        // Reference to the Events subcollection
        const eventsCollection = collection(db, `rooms/${room_id}/events`);

        // Fetch all documents from the Events subcollection
        const querySnapshot = await getDocs(eventsCollection);

        // Map through the results and format them into the `event` type
        const events: event[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id, // Firestore-generated document ID
                name: data.name,
                description: data.description,
                date: data.date.toDate(), // Convert Firestore Timestamp to JavaScript Date
                event_participants: data.event_participant || [],
            };
        });

        return events;
    } catch (error) {
        console.error("Error fetching room events:", error);
        throw new Error("Failed to fetch room events. Please try again.");
    }
}


//====================================================================//


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


//====================================================================//

export async function eventRsvp(
    room_id: string,
    event_id: string,
    user_id: string
): Promise<void> {
    try {
        const eventRef = doc(db, `rooms/${room_id}/events`, event_id);
        const eventSnap = await getDoc(eventRef);

        if (!eventSnap.exists()) {
            throw new Error("Event not found");
        }

        const eventData = eventSnap.data();
        const eventParticipants = eventData.event_participants || [];

        if (eventParticipants.includes(user_id)) {
            console.log("User has already RSVPed to this event.");
            return;
        }

        // Add the user to the `event_participants` array
        await updateDoc(eventRef, {
            event_participants: [...eventParticipants, user_id],
        });

        console.log(`User ${user_id} successfully RSVPed to event ${event_id}`);
    } catch (error) {
        console.error("Error updating event participants:", error);
        throw new Error("Failed to RSVP to the event. Please try again.");
    }
}

export async function getRsvp(
    room_id: string,
    event_id: string,
    user_id: string
){
    try {
        const eventRef = doc(db, `rooms/${room_id}/events`, event_id);
        const eventSnap = await getDoc(eventRef);

        if (!eventSnap.exists()) {
            throw new Error("Event not found");
        }

        const eventData = eventSnap.data();
        const eventParticipants = eventData.event_participants || [];

        if (eventParticipants.includes(user_id)) {
            console.log("User has already RSVPed to this event.");
            return eventParticipants;
        }

        return eventParticipants
        console.log(`User ${user_id} successfully RSVPed to event ${event_id}`);
    } catch (error) {
        console.error("Error updating event participants:", error);
        throw new Error("Failed to RSVP to the event. Please try again.");
    }
}
