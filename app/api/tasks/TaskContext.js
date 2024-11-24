import { db } from '@/firebase/firebase.js'

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { task } from "@/types";
import { useState } from "react";
///add try and except blocks 

export async function getAllTasks(roomID){

    const docRef = collection(db, "tasks");
    
    const docsSnap = await getDocs(docRef);

    console.log("Hellow world!");

    // Loop through documents in the collection
  //  const [tasks, updateTasks] = useState([])
    const tasks = [];
   
    if (docsSnap.empty) {
        console.log("No documents found in the tasks collection.");
    }
    
    docsSnap.forEach((doc) => {

        const data = doc.data();
       
        if (data["room_ID"] === roomID){

           const taskData = { 
                name: data['name'],
                points: data['points'],
                assigned: data['assignee'],
                room_ID: data['room_ID'],
                room_ID: data['task_ID'],
                status: data['status'],
                task_id: doc.id
            };
            tasks.push(taskData)

        }


  });
  return tasks;

}
export async function addTask(taskName, taskPoints, assignee, roomID, status){

    //const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(db, "tasks");
    const newDocRef = await addDoc(docRef, {
        name: taskName,
        points: taskPoints,
        assigned: assignee,
        room_ID: roomID,
        status:  status
      });
    
      console.log("New document ID: ", newDocRef.id);
      const taskRef = doc(db, "tasks", newDocRef.id);
      await updateDoc(taskRef, {
        name: taskName,
        points: taskPoints,
        assigned: assignee,
        room_ID: roomID,
        task_ID: newDocRef.id,
        status: status
      });
      return newDocRef.id;

}

export async function deleteTask(taskID){

    const taskDocRef = doc(db,"tasks", taskID);
    await deleteDoc(taskDocRef);

}


export async function updateTask(taskID, roomID, taskName, taskPoints, assignee, status){

    const taskRef = doc(db, "tasks", taskID)

    await updateDoc(taskRef, {
        name: taskName,
        points: taskPoints,
        assigned: assignee,
        room_ID: roomID,
        task_ID: taskID,
        status:  status
    });


}

export async function getTask(taskID){
   
    const taskRef =  doc(db, "tasks", taskID)
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
     console.log("Document data:", taskSnap.data());
     const data = taskSnap.data();
     return {
        name: data['name'],
        points: data['points'],
        assigned: data['assignee'],
        room_ID: data['room_ID'],
        task_ID: data['task_ID'],
        status: data['status']
    };

    } else {
   
    console.log("No such document!");
    }   

}

