import React, { useEffect, useState } from "react";
import { event } from "../../types";
import { getRsvp } from "@/app/api/events";
import { useRoomContext } from "@/app/context/RoomContext";
import { getUser } from "@/app/api/user/UserContext";

interface User {
  name: any;
    points: any;
    major: any;
    pronouns: any;
    sleepingHours: any;
    favoriteThing: any;
    avatar: any;
    user_ID: any;
    room_ID: any;
}

type EventCardProps = {
  event: event; // Event data
  onRsvp: (eventId: string) => void; // Callback for RSVP
  onDelete: (eventId: string) => void; // Callback for Delete
  onEdit: (updatedEvent: event) => void; // Callback for Edit
  currentUserId: string; // Current user ID for RSVP logic
};

export function EventCard({
  event,
  onRsvp,
  onDelete,
  onEdit,
  currentUserId,
}: EventCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<event>(event);
  const [rsvped, setRsvped] = useState<string[]>([]);
  const [rsvpUsers, setRsvpUsers] = useState<User[]>([])
  const { roomData , setRoomData } = useRoomContext();

  const handleSaveEdit = async () => {
    try {
      await onEdit(editedEvent); // Notify parent about the edit
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving the event:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(event.id); // Notify parent about the deletion
    } catch (error) {
      console.error("Error deleting the event:", error);
    }
  };

  const hasUserRsvped = event.event_participants?.includes(currentUserId) ?? false;

  useEffect(() => {
    const fetch = async() => {
      try {
        if (roomData?.room_id) {
          const rsvpers = await getRsvp(roomData?.room_id ,event.id, currentUserId)
          if (rsvpers) {
            console.log(rsvpers);
            setRsvped(rsvpers);
          }
        }
      } catch ( error : unknown ){
        console.error("Failed to fetch within event card")
      }
    }
    fetch();
  },[hasUserRsvped])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const users = await Promise.all(
          rsvped.map(async (userId) => {
            const userInfo = await getUser(userId); // Fetch user info
            return userInfo;
          })
        );
        const validUsers = users.filter((user): user is User => user !== undefined);
        setRsvpUsers(validUsers); // Update state with user info
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (rsvped.length > 0) {
      fetchUserInfo();
    }
  }, [rsvped]); // Run this effect when `rsvped` changes

  if (isEditing) {
    return (
      <div className="flex flex-col bg-white rounded-lg p-4 shadow-sm space-y-2">
        <input
          value={editedEvent.name}
          onChange={(e) =>
            setEditedEvent({ ...editedEvent, name: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Event Title"
          required
        />
        <textarea
          value={editedEvent.description}
          onChange={(e) =>
            setEditedEvent({ ...editedEvent, description: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Event Description"
          required
        />
        <input
          type="date"
          value={editedEvent.date.toISOString().split("T")[0]} // Format date to YYYY-MM-DD
          onChange={(e) =>
            setEditedEvent({
              ...editedEvent,
              date: new Date(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
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
    <div
      key={event.id}
      className="flex bg-white rounded-[10px] p-4 shadow-sm items-stretch"
    >
      <div className="w-[100px] bg-[#E0E0E0] rounded-[5px] mr-4"></div>
      <div className="flex-1">
        <h2 className="m-0 text-[1.2em] text-[#333333]">{event.name}</h2>
        <p className="text-[0.9em] text-[#666]">{event.description}</p>
        <ul className="text-[0.9em] text-[#666] flex "> {/* Add Tailwind classes to the list */}
          <div>RSVPED:</div>
            {rsvpUsers.length > 0 ? (
              rsvpUsers.map((user, index) => (
                <li key={index} className=" items-center ml-2 rounded">
                  <span className="text-[0.9em] text-[#666]">{user.name}</span> {/* User's name */}
                </li>
              ))
            ) : (
              <li className="text-gray-500"> No RSVPs yet.</li>
            )}
        </ul>
        <div className="text-[0.9em] text-[#999]">
          {event.date.toLocaleDateString()} {/* Format date */}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#7D7D7D] hover:text-[#4C98FC]"
          >
            ✎
          </button>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-[#7D7D7D] hover:text-[#FF0000]"
          >
            ×
          </button>
          {/* RSVP Button */}
          <button
            onClick={() => onRsvp(event.id)}
            disabled={hasUserRsvped}
            className={`px-2.5 py-1 border rounded-[5px] ${hasUserRsvped
              ? "bg-gray-200 cursor-not-allowed text-[#999]"
              : "bg-[#f5f5f5] hover:bg-[#ccc] cursor-pointer text-[#333333]"
              }`}
          >
            {hasUserRsvped ? "RSVPed" : "RSVP"}
          </button>
          <div>
</div>
        </div>
      </div>
    </div>
  );
}