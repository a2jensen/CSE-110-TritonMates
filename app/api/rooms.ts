import { db } from "@/firebase/firebaseConfig";

import {doc, query, collection, where, getDocs, addDoc, updateDoc, deleteDoc,getDoc, setDoc, arrayRemove, arrayUnion, Timestamp} from "firebase/firestore";

// function that will create a room. will initalisze room with roomname, roomid, date created, and adding person who created it to members array
// params : roomname ex. (Suite 88), room_user : pass in the users ID
export async function createRoom(roomname : string, user_id : string, room_code : string) {
    const roomsCollectionRef = collection(db, "rooms"); // reference to rooms collection

    const roomRef = await addDoc( roomsCollectionRef, { // adds room document within rooms collection
        room_id : "", // to be updated
        room_name : `${roomname}`,
        room_users : arrayUnion(user_id),
        created : Timestamp.now(),
        room_events : [],
        room_tasks : [],
        room_code : `${room_code}`
    });

    // use auto generated ID as the room id field
    await addDoc(roomsCollectionRef,{
        room_id : roomRef.id,
    });

    console.log("Room create with ID:", roomRef.id);
    return roomRef.id;
}


// takes in roomname as string, and will delete room collection
export async function deleteRoom(roomname : string) {
     // get specific room
    const roomsCollectionRef = query(collection(db, 'rooms'), where("room_code", "==", roomname));
    const roomSnapshot = await getDocs(roomsCollectionRef);

    if (!roomSnapshot.empty) {
        const doc = roomSnapshot.docs[0]; // accesses first document in query result(this should be the only 1)
        const roomId = doc.id;
        
        await deleteRoomCollections(roomId); // delete all subcollections
        await deleteDoc(doc.ref)
    }
}

export async function deleteRoomCollections( roomId : string) {
    const subcollections = ["events", "tasks"];

    for (const subcollection of subcollections){
        const subcollectionRef = collection(db, `rooms/${roomId}/${subcollection}`)
        const subcollectionDocs = await getDocs(subcollectionRef);

        // delete each document within subcollection
        const deletePromises = subcollectionDocs.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log(`Delete all documents for room ${roomId}`);
    }
}

export async function joinRoom(room_code : string, user_id : string){
        // get specific room
        const roomsCollectionRef = query(collection(db, 'rooms'), where("room_code", "==", room_code));

        const roomSnapshot = await getDocs(roomsCollectionRef);
        console.log(roomSnapshot)
        // ensure only one document was found
         
        if(roomSnapshot.empty || roomSnapshot.docs.length > 1) {
            console.error("Invalid code made");
            throw new Error("Room not found");
        } 
        console.log(roomSnapshot)
        const roomRef = roomSnapshot.docs[0].ref;

        await updateDoc(roomRef, {
            room_users : arrayUnion(user_id)
        })

        console.log('User added to room succesfully');

        return roomRef.id;
}


export async function leaveRoom(room_code : string, user_id : string){
    // get specific room
    const roomsCollectionRef = query(collection(db, 'rooms'), where("room_code", "==", room_code));

    const roomSnapshot = await getDocs(roomsCollectionRef);
    
    // ensure only one document was found
    if(!roomSnapshot.empty || roomSnapshot.docs.length > 1) {
        console.error("Invalid code made")
        throw new Error("Room not found")
    }

    const docRef = roomSnapshot.docs[0].ref;

    await updateDoc(docRef, {
        room_users : arrayRemove(user_id)
    })

    console.log('User added to room successfully')
}

// i may not need this function at all...
export async function fetchRoomData(room_id : string) {
    const roomRef = doc(db, `rooms/${room_id}`)
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
        console.log("Document data: ", roomSnap.data())
        return roomSnap.data();
    } else {
        console.error("Failed to fetch room data")
        return null;
    }   
}

export async function checkRoom(user_id : string) {
    const roomQuery = query(
        collection(db, "rooms"),
        where('room_users', 'array-contains', user_id )
    )

    const roomSnap = await getDocs(roomQuery);
    if (roomSnap) {
        const roomId = roomSnap.docs.map(doc => doc.id)
        const roomIdString = roomId[0];
        return roomIdString;
    }
}