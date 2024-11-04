import Link from "next/link";
import UpcomingEvents from "../../components/events/events";

export default function Home() {
    return (
        <>
            <div>
                Events
                <UpcomingEvents roomName="testRoom"/>
            </div>
        </>
    );
}
