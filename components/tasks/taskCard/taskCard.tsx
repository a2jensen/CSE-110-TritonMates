"use client";

import { useState } from "react";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    text: task.text,
    assignee: task.assignee,
    dueDate: task.dueDate,
    points: task.points,
  });

  const handleSaveEdit = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col bg-white rounded-lg p-4 shadow-sm space-y-2">
        <input
          value={editedTask.text}
          onChange={(e) =>
            setEditedTask({ ...editedTask, text: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Task description"
        />
        <select
          value={editedTask.assignee}
          onChange={(e) =>
            setEditedTask({ ...editedTask, assignee: e.target.value })
          }
          className="w-full p-2 border rounded"
        >
          <option value="Assignee1">Assignee 1</option>
          <option value="Assignee2">Assignee 2</option>
          <option value="Unassigned">Unassigned</option>
        </select>
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) =>
            setEditedTask({ ...editedTask, dueDate: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={editedTask.points}
          onChange={(e) =>
            setEditedTask({ ...editedTask, points: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
          placeholder="Points"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-200 p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center bg-white rounded-lg p-4 shadow-sm`}>
      <div
        className={`h-5 w-5 rounded-full border-2 mr-4 ${
          task.done
            ? "bg-[#4C98FC] border-[#4C98FC]"
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
          Tasked: {task.assignee} | Due By: {task.dueDate} | Points:{" "}
          {task.points}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#7D7D7D] hover:text-[#4C98FC]"
        >
          ✎
        </button>

        {task.done && (
          <button
            onClick={() => onDelete(task.id)}
            className="text-[#7D7D7D] hover:text-[#FF0000]"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
