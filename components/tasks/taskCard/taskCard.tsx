"use client";

import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div
      className={`flex items-center bg-white rounded-lg p-4 shadow-sm 
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full border-2 mr-4 ${
          task.done
            ? "bg-[#4C98FC] border-[#4C98FC]" // Updated color
            : "border-[#C1DCFF] bg-transparent"
        }`}
        onClick={() => onToggle(task.id)}
      ></div>

      <div className="flex-grow">
        <p
          className={`text-lg ${
            task.done ? "line-through text-[#000000]" : "text-[#000000]"
          }`}
        >
          {task.text}
        </p>
        <p className="text-sm text-[#000000]">
          Tasked: {task.assignee} | Due By: {task.dueDate}
        </p>
      </div>

      {task.done && (
        <button
          onClick={() => onDelete(task.id)}
          className="text-[#7D7D7D] hover:text-[#FF0000]"
        >
          ×
        </button>
      )}
    </div>
  );
}
