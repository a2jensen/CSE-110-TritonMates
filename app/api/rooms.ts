import { db } from "@/firebase/firebaseConfig";

import {doc,query, collection, where, getDocs, addDoc, updateDoc, deleteDoc,getDoc, setDoc, arrayRemove, arrayUnion, Timestamp} from "firebase/firestore";

// function that will create a room. will initalisze room with roomname, roomid, date created, and adding person who created it to members array
// params : roomname ex. (Suite 88), room_user : pass in the users ID
export async function createRoom(roomname : string, user_id : string, room_code : string) {
    const roomRef = doc(db, "rooms"); // generates random ID

    await setDoc( roomRef, {
        room_name : `${roomname}`,
        room_users : arrayUnion(user_id),
        created : Timestamp.now(),
        room_events : [],
        room_tasks : [],
        room_code : `${room_code}`
    });

    console.log("Room create with ID:", roomRef.id);
    return roomRef.id;
}


export async function deleteRoom(roomname : string) {
     // get specific room
     const q = query(collection(db, 'rooms'), where("room_code", "==", roomname));
     try { 
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // accesses first document in query result(this should be the only 1)
            const roomData = doc.data();

            // save room tasks to a variable
            const roomTasks = roomData.room_tasks;
        }
     } catch {
        throw Error("error deleting room")
     }

    // go through events and unlink all references to room

    // go through tasks and unlink all references to room

    // go through the users apart of the room and unlink them

    // clear out room collection finally
}

export async function joinRoom(room_code : string, user_id : string){
    try {
        // get specific room
        const q = query(collection(db, 'rooms'), where("room_code", "==", room_code));

        const querySnapshot = await getDocs(q);
        
        // ensure only one document was found
        if(!querySnapshot.empty || querySnapshot.docs.length > 1) {
            console.error("Invalid code made")
            throw new Error("Room not found")
        }

        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
            room_users : arrayUnion(user_id)
        })

        console.log('User added to room succesffuly')
    } catch {
        throw Error("Failed to join room")
    }
}


export async function leaveRoom(room_code : string, user_id : string){
    try {
        // get specific room
        const q = query(collection(db, 'rooms'), where("room_code", "==", room_code));

        const querySnapshot = await getDocs(q);
        
        // ensure only one document was found
        if(!querySnapshot.empty || querySnapshot.docs.length > 1) {
            console.error("Invalid code made")
            throw new Error("Room not found")
        }

        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
            room_users : arrayRemove(user_id)
        })

        console.log('User added to room successfully')
    } catch {
        throw Error("error trying to leave room.")
    }
}