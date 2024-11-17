import { db } from "@/firebase/firebaseConfig";

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc,getDoc, setDoc, arrayRemove, arrayUnion, Timestamp} from "firebase/firestore";

// function that will create a room. will initalisze room with roomname, roomid, date created, and adding person who created it to members array
// params : roomname ex. (Suite 88), room_user : pass in the users ID
export async function createRoom(roomname : string, room_user_id : string, room_code : string) {
    const roomRef = doc(db, "rooms"); // generates random ID

    await setDoc( roomRef, {
        room_name : `${roomname}`,
        room_users : arrayUnion(room_user_id),
        created : Timestamp.now(),
        room_events : [],
        room_tasks : [],
        room_code : `${room_code}`
    });

    console.log("Room create with ID:", roomRef.id);
    return roomRef.id;
}