import EventsManager from "@/components/events/eventsManager";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                Events
                <EventsManager/>
            </div>
        </>
    );
}
