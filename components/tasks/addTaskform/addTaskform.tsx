// corresponds to add task component -> refer to figma file
"use client";
import { useEffect, useState } from "react";

import { addTask } from "../../../app/api/tasks/TaskContext";

import { getAllUsers } from "../../../app/api/user/UserContext";
import { useRoomContext } from "@/app/context/RoomContext";

import { user } from "@/types";

interface AddTaskFormProps {
  onAddTask: (task: {
    id: string;
    text: string;
    assignee: string;
    assigneeID: string;
    dueDate: string;
    points: number;
  }) => void;
}

const fetchUsers = async (
  roomID: string,
  roomUsers: user[],
  setRoomUsers: React.Dispatch<React.SetStateAction<user[]>>
) => {
  const user_data = await getAllUsers(roomID);

  const new_users: user[] = [];
  console.log("user", user_data);
  console.log("length", user_data.length);
  for (let i = 0; i < user_data.length; i++) {
    const new_user: user = {
      name: user_data[i]["name"],
      points: user_data[i]["points"],
      major: user_data[i]["major"],
      pronouns: user_data[i]["pronouns"],
      sleepingHours: user_data[i]["sleepingHours"],
      favoriteThing: user_data[i]["favoriteThing"],
      user_ID: user_data[i]["user_ID"],
      room_ID: user_data[i]["room_ID"],
    };
    console.log("new_user", new_user);
    new_users.push(new_user);
  }

  setRoomUsers([...roomUsers, ...new_users]);
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newAssigneeID, setNewAssigneeID] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState(0);

  //const { roomData } = useRoomContext();
  //const roomID = roomData?.room_id?? "error";

  //const roomID = "fYWz7t6dA6C774jzAYvz";
  const [taskID, setTaskID] = useState("");

  // Safely retrieve the room_id
  const { roomData } = useRoomContext();

  const roomID = roomData?.room_id || "";

  const pushTask = async (
    roomID: string,
    name: string,
    points: number,
    assignee: string,
    assigneeID: string,
    status: string,
    date: Date
  ) => {
    const taskId = await addTask(
      roomID,
      name,
      points,
      assignee,
      assigneeID,
      status,
      date
    );
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
      newAssigneeID || "Unassigned",
      "inprogress",
      new Date(dueDate)
    );
    console.log(taskId);
    if (newTask.trim()) {
      onAddTask({
        id: String(taskId),
        text: newTask,
        assignee: newAssignee || "Unassigned",
        assigneeID: newAssigneeID || "Unassigned",
        dueDate: dueDate,
        points: points,
      });

      setNewTask("");
      setNewAssignee("");
      setNewAssigneeID("");
      setDueDate("");
      setPoints(0);
    }
    if (isNaN(points) || points < 0) {
      console.log("Points must be a valid non-negative number!");
      return;
    }
  };

  const [roomUsers, setRoomUsers] = useState<user[]>([]);

  //fetchUsers(roomID, roomUsers, setRoomUsers);
  useEffect(() => {
    fetchUsers(roomID, roomUsers, setRoomUsers);
    console.log(roomUsers);
  }, [roomID]);

  console.log("roomUsers", roomUsers);

  return (
    <div className="bg-sky-100 rounded-lg p-6 shadow-md">
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
            
            value={`${newAssignee}|${newAssigneeID}`}
            onChange={(e) => {
              const selectedOption = e.target.value; // Get the value from the selected option
              const [name, user_ID] = selectedOption.split("|"); // Split the value to extract name and ID
              setNewAssignee(name); // Update the name
              setNewAssigneeID(user_ID); // Set the Assignee ID
            }}
            className="w-full p-3 border border-[#C1DCFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
            required
          >
            <option value="Unassigned|"> Unassigned </option>
            {roomUsers.map((roomUser) => (
              <option
                key={roomUser.user_ID}
                value={`${roomUser.name}|${roomUser.user_ID}`}
              >
                {" "}
                {roomUser.name}
              </option>
            ))}
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
