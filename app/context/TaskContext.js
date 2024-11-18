import { db } from '@/firebase/firebase.js'

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc,getDoc } from "firebase/firestore";


export async function getAllTasks(roomID){


    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const docsSnap = await getDocs(docRef);

    // Loop through documents in the collection
    docsSnap.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());

  });

}
export async function addTask(roomID, taskName, taskPoints, assignee){

    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const newDocRef = await addDoc(docRef, {
        name: taskName,
        points: taskPoints,
        assigned: assignee 
      });
      console.log("New document ID: ", newDocRef.id);
      return newDocRef.id;

}

export async function deleteTask(roomID, taskID){

    const taskDocRef = doc(db, "rooms", roomID, "Tasks", taskID);
    await deleteDoc(taskDocRef);

}


export async function updateTask(roomID, taskID, name, points, assigned){

    const taskRef = doc(db, "rooms", roomID, "Tasks", taskID)


    await updateDoc(taskRef, {
        name: name, 
        points: points,
        assigned: assigned
    });


}

export async function getTask(roomID, taskID){

    const taskRef =  doc(db, "rooms", roomID, "Tasks", taskID)
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
     console.log("Document data:", taskSnap.data());
    } else {
   
    console.log("No such document!");
    }   

}

