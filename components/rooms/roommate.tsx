'use client'

import { useEffect, useState } from "react"
import { getUser } from "@/app/api/user/UserContext";

interface RoommateProps {
    roommate_Id : string;
}

const Roommate: React.FC<RoommateProps> = ({roommate_Id}) => {
    const [avatar, setAvatar] = useState<string>("/avatars/default.png");
    const [name, setName] = useState<string>("");
    const [points, setPoints] = useState();
    const [popup, setPopup ] = useState(false);
    const [major, setMajor] = useState<string>("");
    const [pronouns, setPronouns] = useState<string>("");
    const [sleepinghours, setSleepinghours] = useState<string>("");
    const [favoritething, setFavoritething] = useState<string>("");

    const togglePopup = () => {
        setPopup((prev) => !prev);
    }

    useEffect(() => {
        const fetchRoommate = async () => {
            try {
                const roomMate = await getUser(roommate_Id);
                setAvatar(roomMate?.avatar);
                setName(roomMate?.name);
                setPoints(roomMate?.points);
                setMajor(roomMate?.major);
                setPronouns(roomMate?.pronouns);
                setSleepinghours(roomMate?.sleepingHours);
                setFavoritething(roomMate?.favoriteThing);
            } catch ( error : unknown ) {
                console.error("Could not fetch roommate info", error)
            }
        }
        fetchRoommate();
    }, [])

    return (
        <>
            {/* Main Roommate Component */}
            <div
                className="bg-sky-200 p-4 mb-4 flex items-center gap-4 cursor-pointer"
                onClick={togglePopup}
            >
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                    <h2 className="text-xl text-blue-500 hover:underline">
                        {name}
                    </h2>
                    <p>Points: {points}</p>
                </div>
            </div>

            {/* Popup Component */}
            {popup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={togglePopup}
                        >
                            
                        </button>
                        <div className="flex flex-col items-center">
                            <img
                                src={avatar}
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <h2 className="text-xl font-bold mb-2">{name}</h2>
                            <p className="text-gray-700 mb-4">
                                Points: {points}
                            </p>
                            <p className="text-gray-500">
                                Major: {major}
                            </p>
                            <p className="text-gray-500">
                                Pronouns: {pronouns}
                            </p>
                            <p className="text-gray-500">
                                Sleeping Hours: {sleepinghours}
                            </p>
                            <p className="text-gray-500">
                                Likes: {favoritething}
                            </p>
                            <button
                              
                                onClick={togglePopup}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Roommate;
