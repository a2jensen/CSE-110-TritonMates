import React, { useState } from "react";
import { event } from "../../types";
import { editEvent } from "../../app/api/events/editEvent";
import { deleteEvent } from "../../app/api/events/deleteEvent";
import { db } from "@/firebase/firebaseConfig";

export function EventCard(event: event) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleSaveEdit = async () => {
    try {
      await editEvent(editedEvent); // Call your API function to update the event
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving the event:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id, "bOfA98OEsUdA1ZDkGz8d"); // Call your API function to delete the event
      console.log(`Event with ID ${event.id} deleted`);
    } catch (error) {
      console.error("Error deleting the event:", error);
    }
  };

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
          value={editedEvent.date.toString()}
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
    <div key={event.id} className="flex bg-white rounded-[10px] p-2 items-stretch">
      <div className="w-[100px] bg-[#E0E0E0] rounded-[5px] mr-4"></div>
      <div className="flex-1">
        <h2 className="m-0 text-[1.2em] text-[#333333]">{event.name}</h2>
        <p className="text-[0.9em] text-[#666]">{event.description}</p>
        <div className="text-[0.9em] text-[#999]">
          {event.date.toString()}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#7D7D7D] hover:text-[#4C98FC]"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            className="text-[#7D7D7D] hover:text-[#FF0000]"
          >
            ×
          </button>
          <button 
          className="mt-2 px-2.5 py-1 border border-[#ccc] rounded-[5px] bg-[#f5f5f5] cursor-pointer text-[#333333]">RSVP</button>
        </div>
      </div>
    </div>
  );
}
