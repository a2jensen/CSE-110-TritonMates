"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "../addTaskform/addTaskform";
import { Timestamp } from 'firebase/firestore'; 
import TaskOverview from "../taskOverview/taskOverview";
import { Task } from "../types";
//import { useRoomContext } from './context/RoomContext';


import {
  getAllTasks,
  deleteTask,
  updateTask,
} from "../../../app/api/tasks/TaskContext";
import { useRoomContext } from "@/app/context/RoomContext";
import { checkUserAuth } from "../../../app/api/user";
import { updateUserPoints } from "@/app/api/user/UserContext";

const removeTask = async (roomID: string, taskID: string) => {
  await deleteTask(roomID, taskID);
};




const changeTask = async (
  roomID: string,
  taskID: string,
  name: string,
  points: number,
  assignee: string,
  assigneeID: string,
  status: string,
  due_date: string
) => {
  await updateTask(
    roomID,
    taskID,
    name,
    points,
    assignee,
    assigneeID,
    status,
    new Date(due_date)
  );
};


const fetchCurrentUser = async (
  currentUserId: string,
  setCurrentUserId: React.Dispatch<string>
)=>{
  const currentUser = await checkUserAuth();
  console.log("CURRENT USER", currentUser);
   const userId = currentUser?.uid  || '' ;
   console.log("USER ID", userId);

   setCurrentUserId(userId);


}


const fetchTasks = async (
  roomID: string,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const task_data = await getAllTasks(roomID);

  console.log("fetching tasks");

  const new_tasks = [];
  for (let i = 0; i < task_data.length; i++) {
    const today = new Date();

    const dueDateObj = task_data[i]["due_date"].toDate();
    const isUpcoming = dueDateObj > today;
    new_tasks.push({
      id: task_data[i]["task_ID"],
      text: task_data[i]["name"],
      assignee: task_data[i]["assignee"],
      assigneeID: task_data[i]["assigneeID"],
      assigner: "Creator",
      done: task_data[i]["status"],
      doneReason: "",
      dueDate: dueDateObj.toLocaleDateString(),
      points: task_data[i]["points"],
      isUpcoming,
    });
    console.log(task_data[i]);
  }
  setTasks([...tasks, ...new_tasks]);
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  //const { roomData } = useRoomContext();
  //const room ID = roomData.room_id;
  //const roomID = "bOfA98OEsUdA1ZDkGz8d";

  const { roomData } = useRoomContext();

  // Safely retrieve the room_id

  if (roomData?.room_id == undefined){
    const roomID = "";
  }
  const roomID = roomData?.room_id || "";

 const currentUser = checkUserAuth();
 console.log(currentUser);

  const addTask = (task: {
    id: string;
    text: string;
    assignee: string;
    assigneeID: string;
    dueDate: string;
    points: number;
  }) => {
    const today = new Date();
    const dueDateObj = new Date(task.dueDate);
    const isUpcoming = dueDateObj > today;

    setTasks([
      ...tasks,
      {
        id: task.id,
        text: task.text,
        assignee: task.assignee,
        assigneeID: task.assigneeID,
        assigner: "Creator",
        done: false,
        doneReason: "",
        dueDate: task.dueDate,
        points: task.points,
        isUpcoming,
      },
    ]);
  };
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    fetchTasks(roomID, tasks, setTasks);
    fetchCurrentUser(currentUserId, setCurrentUserId);
  }, [roomID]);

  const toggleTask = (id: string) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        console.log("assignee ID ", tasks[i].assigneeID);
        console.log( "id", id, "text",
          tasks[i].text, "points",
          tasks[i].points, "assignee",
          tasks[i].assignee,"assigneeID",
          tasks[i].assigneeID,"status",
          "in progress", "duedate",
          tasks[i].dueDate)
        console.log(tasks[i]);
        if (tasks[i].done) {
          changeTask(
            roomID,
            id,
            tasks[i].text,
            tasks[i].points,
            tasks[i].assignee,
            tasks[i].assigneeID,
            "in progress",
            tasks[i].dueDate,
          );
          if (currentUserId === tasks[i].assigneeID ){
            console.log("updating points");
            updateUserPoints(currentUserId, -1*tasks[i].points);


          }
        } else {
          changeTask(
            roomID,
            id,
            tasks[i].text,
            tasks[i].points,
            tasks[i].assignee,
            tasks[i].assigneeID,
            "done",
            tasks[i].dueDate,
          );

          if (currentUserId === tasks[i].assigneeID ){
            console.log("updating points");
            updateUserPoints(currentUserId, tasks[i].points);


          }
        }
      }
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    removeTask(roomID, id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskHandler = (id: string, updatedTask: Partial<Task>) => {
    // Update local state first
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            ...updatedTask,
            isUpcoming: updatedTask.dueDate
              ? new Date(updatedTask.dueDate) > new Date()
              : task.isUpcoming,
          }
        : task
    );
    setTasks(updatedTasks);

    // Find the specific task to update
    const taskToUpdate = updatedTasks.find((task) => task.id === id);
    if (taskToUpdate) {
      // Call backend update function
      changeTask(
        roomID,
        id,
        updatedTask.text || taskToUpdate.text,
        updatedTask.points !== undefined
          ? updatedTask.points
          : taskToUpdate.points,
        updatedTask.assignee || taskToUpdate.assignee,
        updatedTask.assigneeID || taskToUpdate.assigneeID,
        taskToUpdate.done ? "done" : "in progress",
        updatedTask.dueDate || taskToUpdate.dueDate
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <TaskOverview
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTaskHandler}
        />
        <AddTaskForm onAddTask={addTask} />
      </div>
    </div>
  );
}
