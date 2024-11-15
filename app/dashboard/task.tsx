"use client"; // refer: https://react.dev/reference/rsc/use-client
import { useState } from "react";
import { Task } from "./types";

let taskID = 0;

export const TaskStatus = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: taskID++, text: newTask, finished: false }]);
      setNewTask("");
    }
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // refer tailwind
  return (
    <div className="p-6">
      <h2>Tasks</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2 p-2">
            <input
              type="checkbox"
              checked={task.finished}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.finished ? "line-through" : ""}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks to do, everyone is free!</p>}

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleSubmit}
          placeholder="Add a new task..."
          className="border p-2 rounded-md text-black focus:ring focus:ring-gray-300"
        />
        <button
          onClick={addTask}
          className="p-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          +
        </button>
      </div>
    </div>
  );
};
