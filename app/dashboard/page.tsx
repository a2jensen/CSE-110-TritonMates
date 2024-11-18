"use client";
import UpcomingEvents from "@/components/events/upcomingEvents";
import Link from "next/link";
import { TaskStatus } from "./task";
import {getAllTasks, addTask, getTask, deleteTask, updateTask} from "../context/TaskContext";
import { useState } from "react";

export default function Home() {


 // getAllTasks("bOfA98OEsUdA1ZDkGz8d");
 
  const roomID = "bOfA98OEsUdA1ZDkGz8d";
  const [taskID, setTaskID] = useState("");
  
  const pushTask = async() => {
      const taskId = await addTask(roomID, "Take out the Trash", 15, "Sheikh Hasina");
      console.log("taskID", taskId);
      setTaskID(taskId)
      return taskId;
  
    
   }

  const changeTask = async() => {
    await updateTask(roomID, taskID, "Take out food", 20, "Chuppu");


  
 }

 const fetchTask = async() => {
  await getTask(roomID, taskID);

}

 const removeTask = async() => {
  await deleteTask(roomID, taskID);

}

return (
    <div className="flex">
      <div className="w-64">
        <div>
          <b>Dashboard</b>
        </div>
        <div>
          <button onClick={pushTask}>Add Task</button>
        </div>

        <div>
          <button onClick={fetchTask}>Get Task</button>
        </div>

        <div>
          <button onClick={changeTask}>Change Task</button>
        </div>

        <div>
          <button onClick={removeTask}>Delete Task</button>
        </div>


       
        <div>
          <Link href="/user">Go to user page</Link>
        </div>
        <div>
          <Link href="/rooms">Go to rooms page</Link>
        </div>
        <div>
          <Link href="/shop">Go to shop page</Link>
        </div>
        <div>
          <Link href="/">Sign out</Link>
        </div>
      </div>
      <UpcomingEvents roomName="testRoom" events={[]}/>
      <div className="flex-1 ml-4">
        <TaskStatus />
      </div>
    </div>
  );
}
