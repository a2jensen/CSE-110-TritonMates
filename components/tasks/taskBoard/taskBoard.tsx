"use client";

import { useState } from "react";
import AddTaskForm from "../addTaskForm/addTaskform";
import TaskOverview from "../taskOverview/taskOverview";
import { Task } from "../types";

let taskID = 0;

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: {
    text: string;
    assignee: string;
    dueDate: string;
  }) => {
    const today = new Date();
    const dueDateObj = new Date(task.dueDate);
    const isUpcoming = dueDateObj > today;

    setTasks([
      ...tasks,
      {
        id: taskID++,
        text: task.text,
        assignee: task.assignee,
        assigner: "Creator",
        done: false,
        doneReason: "",
        dueDate: task.dueDate,
        isUpcoming,
      },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6 bg-[#C1DCFF] rounded-lg shadow-lg space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <TaskOverview
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <AddTaskForm onAddTask={addTask} />
      </div>
    </div>
  );
}
