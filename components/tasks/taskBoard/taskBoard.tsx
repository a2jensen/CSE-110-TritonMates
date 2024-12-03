"use client";

import { useEffect, useState, useCallback } from "react";
import AddTaskForm from "../addTaskform/addTaskform";
//import { Timestamp } from 'firebase/firestore';
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
) => {
  const currentUser = await checkUserAuth();
  console.log("CURRENT USER", currentUser);
  const userId = currentUser?.uid || "";
  console.log("USER ID", userId);

  setCurrentUserId(userId);
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error tracking

  const { roomData } = useRoomContext();
  const roomID = roomData?.room_id || "";

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);

      // Non-expired session storage common for standard browsers
      const cachedTasks = window.localStorage.getItem(`tasks_${roomID}`);
      if (cachedTasks) {
        const parsedCachedTasks = JSON.parse(cachedTasks);
        setTasks(parsedCachedTasks);
      }

      const task_data = await getAllTasks(roomID);
      console.log("fetching tasks");

      const new_tasks = task_data.map((taskItem) => {
        const today = new Date();
        const dueDateObj = taskItem["due_date"].toDate();
        const isUpcoming = dueDateObj > today;

        return {
          id: taskItem["task_ID"],
          text: taskItem["name"],
          assignee: taskItem["assignee"],
          assigneeID: taskItem["assigneeID"],
          assigner: "Creator",
          done: taskItem["status"],
          doneReason: "",
          dueDate: dueDateObj.toLocaleDateString(),
          points: taskItem["points"],
          isUpcoming,
        };
      });

      // Refetch
      setTasks(new_tasks);
      // Convert back the object to string
      localStorage.setItem(`tasks_${roomID}`, JSON.stringify(new_tasks));
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks");
      setIsLoading(false);
    }
  }, [roomID]);

  useEffect(() => {
    fetchTasks();
    fetchCurrentUser(currentUserId, setCurrentUserId);

    // Listener to check interval per 5 minutes
    const intervalId = setInterval(fetchTasks, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchTasks, currentUserId]);

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

  const toggleTask = (id: string) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        console.log("assignee ID ", tasks[i].assigneeID);
        console.log(
          "id",
          id,
          "text",
          tasks[i].text,
          "points",
          tasks[i].points,
          "assignee",
          tasks[i].assignee,
          "assigneeID",
          tasks[i].assigneeID,
          "status",
          "in progress",
          "duedate",
          tasks[i].dueDate
        );
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
            tasks[i].dueDate
          );
          if (currentUserId === tasks[i].assigneeID) {
            console.log("updating points");
            updateUserPoints(currentUserId, -1 * tasks[i].points);
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
            tasks[i].dueDate
          );

          if (currentUserId === tasks[i].assigneeID) {
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

  // Render loading or error states
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

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
};

export default TaskBoard;
