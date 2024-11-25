"use client";

import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded shadow hover:shadow-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        <div>
          <p className={`font-medium ${task.done ? "line-through" : ""}`}>
            {task.text}
          </p>
          <p className="text-sm text-gray-500">
            Assignee: {task.assignee} | Due: {task.dueDate} | Points: {task.points}
          </p>
        </div>
      </div>
      {task.done && (
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 text-sm hover:underline"
        >
          x
        </button>
      )}
    </li>
  );
}
