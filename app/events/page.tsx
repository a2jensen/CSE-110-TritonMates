"use client";

import Link from "next/link";
import Navbar from "../../components/navbar";
import { useEffect } from "react";
import { addEvent } from "@/app/api/events/addEvent";
import { event } from "@/types";

export default function Home() {
  const eventData: event = {
    id: 1,
    name: "New Event",
    description: "This is a new event",
    date: new Date("2024-11-20T23:00:00"),
  };

  const room_id = "bOfA98OEsUdA1ZDkGz8d";
  const event_participants = ["QLbNRRs9eRY8wnyVKUE75jvVoyA2"];

  const addTestEvent = async () => {
    try {
      const eventId = await addEvent(eventData, room_id, event_participants);
      console.log("Event created successfully: ", eventId);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return (
    <>
      <div>
        <b>Events</b>
      </div>
      <div>
        <Link href="/dashboard">Return to dashboard</Link>
      </div>

      <div>
        <button onClick={addTestEvent}>Add Test Event</button>
      </div>
    </>
  );
}
