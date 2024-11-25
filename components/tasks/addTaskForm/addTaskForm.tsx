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
    <div className="bg-blue-50 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#4C98FC] mb-6">Add New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Take out the garbage or fend off the raccoon's den alone..."
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
          />
        </div>

        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Tag a TritonMate!
          </label>
          <select
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
          >
            <option value="None" className="text-[#7D7D7D]">
              None
            </option>
            <option value="Roommate1">Roommate 1</option>
            <option value="Roommate2">Roommate 2</option>
            <option value="Everyone">Everyone</option>
          </select>
        </div>

        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF] text-[#000000]"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-[#4C98FC] hover:bg-[#006EFF] text-white font-medium rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
}
