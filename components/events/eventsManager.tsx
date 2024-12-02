'use client'
import UpcomingEvents from "./upcomingEvents";
import AddEventForm from "./addEventForm";
import styles from './eventsManager.module.css';
import { useState, useEffect } from "react";
import { event } from '../../types';
import { addEvent, getAllRoomEvents, eventRsvp } from "@/app/api/events";
import { useAuth } from "@/app/context/AuthContext";




export default function EventsManager() {
    // ik these hardcoded values are temporory, but i think getting events data will be handled in the upcomingEvents component instead of here(this component can actually be cut)
    const { currentUser } = useAuth()
    const userId = currentUser?.uid;
    const roomId = "egIBDVFQs4AsRSk3iSHN";
    const [events, setEvents] = useState<event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await getAllRoomEvents(roomId);
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };
        fetchEvents();
    }, [roomId]);

    const handleAddEvent = async (newEvent: Omit<event, "id">) => {
        try {
            const eventId = await addEvent(newEvent, roomId, []);
            setEvents((prevEvents) => [
                ...prevEvents, { ...newEvent, id: eventId },

            ]);
        } catch (error) {
            console.log("Failed to add event", error);
        }

    };
    const handleRsvp = async (eventId: string) => {
        try {
            await eventRsvp(roomId, eventId, userId);
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId
                        ? {
                            ...event,
                            event_participants: [...event.event_participants, userId], // Add user to participants
                        }
                        : event
                )
            );
        } catch (error) {
            console.error("Failed to RSVP to event:", error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-start p-5">
                <UpcomingEvents events={events} roomName="testRoom" onRsvp={handleRsvp} />
                <AddEventForm onAddEvent={handleAddEvent} />
            </div>
        </div>
    );
}