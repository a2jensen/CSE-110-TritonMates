import styles from './upcomingEvents.module.css';
import { event } from '../../types';


type UpcomingEventsProps = {
    events: event[];
    roomName: string;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ eventsProp, roomName }) => {
     const events: event[] = [
         { name: 'Movie Night', description: 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.', id: 0, date: new Date()},
         { name: 'Dinner', description: 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.', id: 1, date: new Date()},
     ];

    return (
        <div className="bg-[#FFD54F] p-5 rounded-[15px] w-full h-full mx-auto">
            <h1 className="text-2xl font-bold text-white m-0">Upcoming Events</h1>
            <p className="text-white mb-5">{roomName}</p>
            <div className="flex flex-col gap-4">
                {events.map((event) => (
                    EventCard(event)
                ))}
            </div>
        </div>
    );
    
}

export function EventCard(event: event) {
    return (
        <div key={event.id} className="flex bg-white rounded-[10px] p-2 items-stretch">
            <div className="w-[100px] bg-[#E0E0E0] rounded-[5px] mr-4"></div>
            <div>
                <h2 className="m-0 text-[1.2em] text-[#333333]">{event.name}</h2>
                <p className="text-[0.9em] text-[#666]">{event.description}</p>
                <button className="mt-2 px-2.5 py-1 border border-[#ccc] rounded-[5px] bg-[#f5f5f5] cursor-pointer text-[#333333]">RSVP</button>
            </div>
        </div>
    )
}

export default UpcomingEvents;