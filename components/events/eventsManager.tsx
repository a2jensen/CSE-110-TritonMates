'use client'
import UpcomingEvents from "./upcomingEvents";
import AddEventForm from "./addEventForm";
import styles from './eventsManager.module.css';
import { useEffect, useState } from "react";
import { event } from '../../types';
import {getAllRoomEvents} from '../../app/api/events/getAllEvents';



const fetchEvents = async(roomID: string, events:event[], setEvents: React.Dispatch<React.SetStateAction<event[]>>) => {
    const event_data = await getAllRoomEvents(roomID);
    
    console.log("fetching events");
    console.log(event_data);

    setEvents([ ...events, ...event_data])
    
  }

export default function EventsManager() {


    const roomID = "bOfA98OEsUdA1ZDkGz8d";

    
    const [events, setEvents] = useState<event[]>([
        { name: 'Movie Night', description: 'Join us for a movie!', id: '1313', date: new Date() },
        { name: 'Dinner', description: 'Dinner gathering in the suite', id: '131232', date: new Date() },
      ]);

  


    // ik these hardcoded values are temporory, but i think getting events data will be handled in the upcomingEvents component instead of here(this component can actually be cut)
    
    useEffect(() => {
        // Only call fetchTasks when the component mounts
        fetchEvents(roomID, events, setEvents);
      }, [roomID]);

      
      console.log("adding event ot the events list");
      const handleAddEvent = (newEvent: event) => {
        console.log("adding event ot the events list");
        setEvents([...events, newEvent]);
      };

      fetchEvents
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-start p-5">
                <UpcomingEvents events={events} roomName="testRoom" />
                <AddEventForm onAddEvent={handleAddEvent}/>
            </div>
        </div>
    );
}