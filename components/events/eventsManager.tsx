'use client';
import UpcomingEvents from "./upcomingEvents";
import AddEventForm from "./addEventForm";
import { useState, useEffect } from "react";
import { event } from "../../types";
import { addEvent, getAllRoomEvents, eventRsvp, deleteEvent, editEvent } from "@/app/api/events";
import { checkUserAuth } from "@/app/api/user";

interface EventsManagerProps {
  roomId : string;
}

function EventsManager( {roomId}: EventsManagerProps ): React.JSX.Element {
  const roomIDParam = roomId;
  const [events, setEvents] = useState<event[]>([]);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllRoomEvents(roomIDParam);
        console.log("Fetched events:", fetchedEvents);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();

    const fetchUser = async () => {
      const user = await checkUserAuth();
      console.log("User:", user);
      setUserID(user?.uid || "");
    }
    fetchUser();
  }, [roomIDParam]);

  const currentUserId = userID;
  const handleAddEvent = async (newEvent: Omit<event, "id">) => {
    try {
      const eventId = await addEvent(newEvent, roomIDParam); // No need to pass participants
      setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: eventId }]);
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };


  const onRsvp = async (eventId: string) => {
    try {
      // Make an RSVP API call
      await eventRsvp(roomIDParam, eventId, userID);

      // Update the state with the RSVP information
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
              ...event,
              event_participants: Array.isArray(event.event_participants)
                ? [...event.event_participants, currentUserId]
                : [currentUserId], // Add user if the array is empty or undefined
            }
            : event
        )
      );
      console.log(`User ${currentUserId} RSVPed to event ${eventId}`);
    } catch (error) {
      console.error("Failed to RSVP to event:", error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId, roomIDParam); // Backend delete
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId)); // Update state
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleEditEvent = async (updatedEvent: event) => {
    try {
      await editEvent(updatedEvent, roomIDParam); // Backend edit
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error("Failed to edit event:", error);
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-start p-5">
      <UpcomingEvents
        events={events}
        roomName=""
        onRsvp={onRsvp}
        currentUserId={currentUserId}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
      <AddEventForm onAddEvent={handleAddEvent} />
    </div>
  );
}

export default EventsManager;