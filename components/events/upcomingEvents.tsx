import styles from "./upcomingEvents.module.css";
import { event } from "../../types";
import { EventCard } from "./eventCard";

type UpcomingEventsProps = {
  events: event[];
  roomName: string;
  onRsvp: (eventId: string) => void; // Callback for RSVP
  currentUserId: string; // Pass the current user ID
  onDelete: (eventId: string) => void; // Callback for Delete
  onEdit: (updatedEvent: event) => void; // Callback for Edit
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  roomName,
  onRsvp,
  currentUserId,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-[#FFEE8C] p-5 rounded-[15px] w-full h-full mx-auto">
      <h1 className="text-2xl font-bold text-[#DAA520] m-0">Upcoming Events</h1>
      <p className="text-[#DAA520] mb-5">{roomName}</p>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onRsvp={onRsvp}
            currentUserId={currentUserId}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
