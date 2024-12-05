import { db } from '@/firebase/firebaseConfig.ts'

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc, Timestamp} from "firebase/firestore";
//import { task } from "@/types";
//import { useState } from "react";
///add try and except blocks 

export async function getAllTasks(roomID){
    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const docsSnap = await getDocs(docRef);
    // Loop through documents in the collectio

    const tasks = [];
   
    if (docsSnap.empty) {
      console.log("No documents found in the tasks collection.");
    }
  
    docsSnap.forEach((doc) => {

      const data = doc.data();
      const taskData = { 
              name: data['name'],
              points: data['points'],
              assignee: data['assignee'],
              assigneeID: data['assigneeID'],
              room_ID: data['room_ID'],
              task_ID: data['task_ID'],
              status: data['status'],
              due_date: data['due_date'],

        };
        tasks.push(taskData)

      
    });
    return tasks;
}
export async function addTask(roomID, taskName, taskPoints, assignee, assigneeID, status, due_date){

    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const newDocRef = await addDoc(docRef, {
        name: taskName,
        points: taskPoints,
        assignee: assignee,
        assigneeID: assigneeID,
        room_ID: roomID,
        status:  status,
        due_date: due_date
      });
    console.log("New document ID: ", newDocRef.id);
    const taskRef = doc(db, "rooms", roomID, "Tasks", newDocRef.id)
    await updateDoc(taskRef, {
        name: taskName,
        points: taskPoints,
        assignee: assignee,
        assigneeID: assigneeID,
        room_ID: roomID,
        task_ID: newDocRef.id,
        status: status,
        due_date: Timestamp.fromDate(due_date)
    });
    return newDocRef.id;
    
}

export async function deleteTask(roomID, taskID){
    const taskDocRef = doc(db, "rooms", roomID, "Tasks", taskID);
    await deleteDoc(taskDocRef);
}
export async function updateTask(roomID, taskID, taskName, taskPoints, assignee, assigneeID, status, due_date){
    console.log("elements to be updated: ", roomID, taskID, taskName, taskPoints, assignee, assigneeID, status, due_date);
    console.log("status", status);
    console.log("due date", due_date);
    const taskRef = doc(db, "rooms", roomID, "Tasks", taskID);
    await updateDoc(taskRef, {
        name: taskName,
        points: taskPoints,
        assignee: assignee,
        assigneeID: assigneeID,
        room_ID: roomID,
        task_ID: taskID,
        status:  status,
        due_date: Timestamp.fromDate(due_date)
    });

}
export async function getTask(roomID, taskID){
    const taskRef =  doc(db, "rooms", roomID, "Tasks", taskID)
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
        console.log("Document data:", taskSnap.data());
        const data = taskSnap.data();
        return {
           name: data['name'],
           points: data['points'],
           assignee: data['assignee'],
           assigneeID:  data['assigneeID'],
           room_ID: data['room_ID'],
           task_ID: data['task_ID'],
           status: data['status'],
           due_date:  data['due_date']
       };
   
       } else {
      
       console.log("No such document!");
       }   
    
}