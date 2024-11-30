"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "../addTaskform/addTaskform";
import TaskOverview from "../taskOverview/taskOverview";
import { Task } from "../types";
import {
  getAllTasks,
  deleteTask,
  updateTask,
} from "../../../app/api/tasks/TaskContext";

const removeTask = async (roomID: string, taskID: string) => {
  await deleteTask(roomID, taskID);
};

const changeTask = async (
  roomID: string,
  taskID: string,
  name: string,
  points: number,
  assignee: string,
  status: string,
  due_date: string
) => {
  await updateTask(
    roomID,
    taskID,
    name,
    points,
    assignee,
    status,
    new Date(due_date)
  );
};

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
    const dueDateObj = new Date(task_data[i]["due_date"]);
    const isUpcoming = dueDateObj > today;
    new_tasks.push({
      id: task_data[i]["task_ID"],
      text: task_data[i]["name"],
      assignee: task_data[i]["assignee"],
      assigner: "Creator",
      done: false,
      doneReason: "",
      dueDate: String(dueDateObj),
      points: task_data[i]["points"],
      isUpcoming,
    });
    console.log(task_data[i]);
  }
  setTasks([...tasks, ...new_tasks]);
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const roomID = "bOfA98OEsUdA1ZDkGz8d";

  const addTask = (task: {
    id: string;
    text: string;
    assignee: string;
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
        assigner: "Creator",
        done: false,
        doneReason: "",
        dueDate: task.dueDate,
        points: task.points,
        isUpcoming,
      },
    ]);
  };

  useEffect(() => {
    fetchTasks(roomID, tasks, setTasks);
  }, [roomID]);

  const toggleTask = (id: string) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        console.log(tasks[i]);
        if (tasks[i].done) {
          changeTask(
            roomID,
            id,
            tasks[i].text,
            tasks[i].points,
            tasks[i].assignee,
            "in progress",
            tasks[i].dueDate
          );
        } else {
          changeTask(
            roomID,
            id,
            tasks[i].text,
            tasks[i].points,
            tasks[i].assignee,
            "done",
            tasks[i].dueDate
          );
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
