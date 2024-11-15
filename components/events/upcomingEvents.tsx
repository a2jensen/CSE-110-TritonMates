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
        <div className={styles.container}>
            <h1 className={styles.title}>Upcoming Events</h1>
            <p className={styles.subtitle}>{roomName}</p>
            <div className={styles.eventsList}>
                {events.map((event) => (
                    EventCard(event)
                ))}
            </div>
            <div className={styles.allEventsLink}>
                <a href="#">All Events &rarr;</a>
            </div>
        </div>
    );
    
}

export function EventCard(event: event) {
    return (
        <div key={event.id} className={styles.eventCard}>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.eventContent}>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <button className={styles.button}>RSVP</button>
            </div>
        </div>
    )
}

export default UpcomingEvents;