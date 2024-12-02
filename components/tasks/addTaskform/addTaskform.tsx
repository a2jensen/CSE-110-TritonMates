// corresponds to add task component -> refer to figma file
"use client";
import { useState } from "react";
import {
  getAllTasks,
  addTask,
  getTask,
  deleteTask,
  updateTask,
} from "../../../app/api/tasks/TaskContext"
import { useRoomContext } from "../../../app/context/RoomContext"

interface AddTaskFormProps {
  onAddTask: (task: {
    id: string;
    text: string;
    assignee: string;
    dueDate: string;
    points: number;
  }) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState(0);


  const { roomData } = useRoomContext();
  const roomID = roomData?.room_id?? "error";
  //const roomID = "bOfA98OEsUdA1ZDkGz8d";
  const [taskID, setTaskID] = useState("");

  const pushTask = async (
    roomID: string,
    name: string,
    points: number,
    assignee: string,
    status: string,
    date: Date
  ) => {
    const taskId = await addTask(roomID, name, points, assignee, status, date);
    console.log("taskID", taskId);
    setTaskID(taskId);
    return taskId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskId = await pushTask(
      roomID,
      newTask,
      points,
      newAssignee || "Unassigned",
      "inprogress",
      new Date(dueDate)
    );
    console.log(taskId);
    if (newTask.trim()) {
      onAddTask({
        id: String(taskId),
        text: newTask,
        assignee: newAssignee || "Unassigned",
        dueDate: dueDate,
        points: points,
      });

      setNewTask("");
      setNewAssignee("");
      setDueDate("");
      setPoints(0);
    }
    if (isNaN(points) || points < 0) {
      console.log("Points must be a valid non-negative number!");
      return;
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#4C98FC] mb-6">Task Builder</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Task Description
          </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Take out the garbage or fend off the raccoon's den alone..."
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
            required
          />
        </div>

        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Tag a TritonMate
          </label>
          <select
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
            required
          >
            <option value="" className="text-[#7D7D7D]">
              None
            </option>
            <option value="Assignee1">Assignee 1</option>
            <option value="Assignee2">Assignee 2</option>
          </select>
        </div>

        <div>
          <label className="font-bold block text-sm mb-1">Add Point(s)</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.valueAsNumber || 0)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="font-bold block text-sm text-[#000000] mb-2">
            Set Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF] text-[#000000]"
            required
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
