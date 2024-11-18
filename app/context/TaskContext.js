import { db } from '@/firebase/firebase.js'

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";


export async function getAllTasks(roomID){


 
    const docRef = collection(db, "tasks");
    const docsSnap = await getDocs(docRef);

    // Loop through documents in the collection
    docsSnap.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());

  });

}
export async function addTask(taskName, taskPoints, assignee){

    //const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(db, "tasks");
    const newDocRef = await addDoc(docRef, {
        name: taskName,
        points: taskPoints,
        assigned: assignee 
      });
      console.log("New document ID: ", newDocRef.id);
      return newDocRef.id;

}

export async function deleteTask(taskID){

    const taskDocRef = doc(db,"tasks", taskID);
    await deleteDoc(taskDocRef);

}


export async function updateTask(taskID, name, points, assigned){

    const taskRef = doc(db, "tasks", taskID)


    await updateDoc(taskRef, {
        name: name, 
        points: points,
        assigned: assigned
    });


}

export async function getTask(taskID){
    const taskRef = doc(db, "tasks", taskID)
    //const taskRef =  doc(db, "tasks", taskID)
  /*  const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
     console.log("Document data:", taskSnap.data());
    } else {
   
    console.log("No such document!");
    }   */

}

