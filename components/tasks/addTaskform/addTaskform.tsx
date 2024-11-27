// corresponds to add task component -> refer to figma file
"use client";
import { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (task: {
    text: string;
    assignee: string;
    dueDate: string;
  }) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask({
        text: newTask,
        assignee: newAssignee || "Unassigned",
        dueDate: dueDate,
      });
      setNewTask("");
      setNewAssignee("");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow"
    >
      <h3 className="text-lg font-semibold">Add New Task</h3>
      <div>
        <label className="block text-sm mb-1">Task Title</label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task Title"
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Task Assignee</label>
        <select
          value={newAssignee}
          onChange={(e) => setNewAssignee(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Assignee</option>
          <option value="Assignee1">Assignee 1</option>
          <option value="Assignee2">Assignee 2</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
