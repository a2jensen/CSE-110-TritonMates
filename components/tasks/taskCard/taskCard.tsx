"use client";

import { useEffect, useState } from "react";
import { Task } from "../types";
import { user } from "@/types";

import { getAllUsers } from "../../../app/api/user/UserContext";
import { useRoomContext } from "@/app/context/RoomContext";
import { checkUserAuth } from "@/app/api/user";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
}

const fetchCurrentUser = async (
  currentUserId: string,
  setCurrentUserId: React.Dispatch<string>
) => {
  const currentUser = await checkUserAuth();
  console.log("CURRENT USER", currentUser);
  const userId = currentUser?.uid || "";
  console.log("USER ID", userId);

  setCurrentUserId(userId);
};

const fetchUsers = async (
  roomID: string,
  roomUsers: user[],
  setRoomUsers: React.Dispatch<React.SetStateAction<user[]>>
) => {
  const user_data = await getAllUsers(roomID);

  const new_users: user[] = [];

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
    new_users.push(new_user);
  }

  setRoomUsers([...roomUsers, ...new_users]);
};

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
    assigneeID: task.assigneeID,
    dueDate: task.dueDate,
    points: task.points,
  });

  //const { roomData } = useRoomContext();
  //const room ID = roomData.room_id;

  const { roomData } = useRoomContext();

  // Safely retrieve the room_id

  /* if (roomData?.room_id == undefined){
    const roomID = "";
  }*/
  const roomID = roomData?.room_id || "";
  const [roomUsers, setRoomUsers] = useState<user[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  //  fetchUsers(roomID, roomUsers, setRoomUsers);
  useEffect(() => {
    fetchUsers(roomID, roomUsers, setRoomUsers);
    fetchCurrentUser(currentUserId, setCurrentUserId);
    console.log(roomUsers);
  }, [roomID]);

  console.log("roomUsers", roomUsers);
  console.log("currentUserId", currentUserId);

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
          required
        />
        <select
          value={`${editedTask.assignee}|${editedTask.assigneeID}`}
          onChange={(e) => {
            const selectedOption = e.target.value; // Get the value from the selected option
            const [name, user_ID] = selectedOption.split("|"); // Split the value to extract name and ID

            setEditedTask({
              ...editedTask,
              assignee: name,
              assigneeID: user_ID,
            });
            //    setEditedTask({ ...editedTask, assigneeID: user_ID})
            console.log("changed task", editedTask);
          }}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Unassigned"> Unassigned </option>
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
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) =>
            setEditedTask({ ...editedTask, dueDate: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={editedTask.points}
          onChange={(e) =>
            setEditedTask({ ...editedTask, points: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
          placeholder="Points"
          required
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
