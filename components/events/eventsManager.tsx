'use client'
import UpcomingEvents from "./upcomingEvents";
import AddEventForm from "./addEventForm";
import styles from './eventsManager.module.css';
import { useState } from "react";
import { event } from '../../types';

export default function EventsManager() {
    // ik these hardcoded values are temporory, but i think getting events data will be handled in the upcomingEvents component instead of here(this component can actually be cut)
    const [events, setEvents] = useState<event[]>([
        { name: 'Movie Night', description: 'Join us for a movie!', id: 0, date: new Date() },
        { name: 'Dinner', description: 'Dinner gathering in the suite', id: 1, date: new Date() },
      ]);
    
      const handleAddEvent = (newEvent: event) => {
        setEvents([...events, newEvent]);
      };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-start p-5">
                <UpcomingEvents events={events} roomName="testRoom" />
                <AddEventForm onAddEvent={handleAddEvent}/>
            </div>
        </div>
    );
}