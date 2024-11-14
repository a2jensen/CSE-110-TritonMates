'use client'
import UpcomingEvents from "@/app/components/events/upcomingEvents";
import AddEventForm from "@/app/components/events/addEventForm";
import styles from './eventsManager.module.css';
import { useState } from "react";
import { event } from "../../../types";


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
            <div className={styles.eventsManagerGrid}>
                <UpcomingEvents events={events} roomName="testRoom" />
                <AddEventForm onAddEvent={handleAddEvent}/>
            </div>
        </div>
    );
}