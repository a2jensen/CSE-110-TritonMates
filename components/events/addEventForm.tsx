'use client'
import { randomInt } from 'crypto';
import React, { useState } from 'react';
import {addEvent} from '../../app/api/events/addEvent';
import { event } from '../../types';


// move this into types.ts
type AddEventFormProps = {
    onAddEvent: (event: event) => void;
};

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventInfo, setEventInfo] = useState('');
    const [eventDate, setEventDate] = useState('');





    const roomID = "bOfA98OEsUdA1ZDkGz8d";

    const pushEvent = async(newEvent: event, roomID: string, participants: string[] ) => {
        const eventID = await addEvent( newEvent,roomID,participants);
        console.log("eventID", eventID);
  
        return eventID;
    
      
     }
    const handleSubmit = async (e: React.FormEvent) => {

        console.log("hello world!");
        e.preventDefault();
    
        const participants: string[] = [];
        const newEvent: event = {
            id: "",
            name: eventTitle,
            description: eventInfo,
            date: new Date(eventDate), // Example date
        };
        const eventId = await pushEvent(newEvent, roomID, participants);
        console.log(eventId);

        onAddEvent({ name: eventTitle, description: eventInfo, id: eventId, date: new Date(eventDate) });

        setEventTitle('');
        setEventInfo('');
        setEventDate('');
    };

    return (
        <div className="bg-white p-5 rounded-[10px] shadow-md max-w-[400px] self-start">
            <h2 className="text-[1.8em] font-bold text-[#FFD54F] mb-5">Add New Event</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                <label className="text-[0.9em] font-bold text-[#333]">Event Title</label>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333]"
                />

                <label className="text-[0.9em] font-bold text-[#333]">Event Info</label>
                <input
                    type="text"
                    placeholder="Event Info"
                    value={eventInfo}
                    onChange={(e) => setEventInfo(e.target.value)}
                    className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333]"
                />

                <label className="text-[0.9em] font-bold text-[#333]">Event Date (Calendar OR Manual Input)</label>
                <div className="flex items-center relative">
                    <input
                        type="date"
                        placeholder="Due Date (MM/DD/YYYY)"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="p-2.5 text-[1em] border border-[#ccc] rounded-[5px] outline-none text-[#333333] flex-1"
                    />
                </div>
                <button type="submit" className="p-2.5 text-[1em] font-bold bg-[#FFD54F] border-none rounded-[20px] cursor-pointer text-white text-center hover:bg-[#FFC107]">Add</button>
            </form>
        </div>
    );
};

export default AddEventForm;