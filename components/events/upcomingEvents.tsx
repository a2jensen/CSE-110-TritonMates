import styles from './upcomingEvents.module.css';
import { event } from '../../types';
import { EventCard } from './eventCard';


type UpcomingEventsProps = {
    events: event[];
    roomName: string;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, roomName }) => {
    return (
      <div className="bg-[#FFD54F] p-5 rounded-[15px] w-full h-full mx-auto">
        <h1 className="text-2xl font-bold text-white m-0">Upcoming Events</h1>
        <p className="text-white mb-5">{roomName}</p>
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    );
  };


export default UpcomingEvents;