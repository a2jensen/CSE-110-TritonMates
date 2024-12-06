"use client";

import { useEffect, useState } from "react";
import AvatarSelector from "../../components/user/AvatarSelector";
import Link from "next/link";
import ProfileSummary from "../../components/user/profileSummary";
import {
  updateUserPoints,
  getUser,
  updateUserAvatar,
} from "../api/user/UserContext";
import { auth, onAuthStateChanged, signOut } from "../../firebase/firebaseConfig";
import { useRouter} from "next/navigation";
import { User } from "@/types";

const UserPage = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState("/avatars/default.png"); // Default avatar
  const [points, setPoints] = useState(0);
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null);

  const avatars = [
    { src: "/avatars/default.png", pointsRequired: 0 },
    { src: "/avatars/racoon.png", pointsRequired: 0 },
    { src: "/avatars/tritonRacoon1.png", pointsRequired: 25 },
    { src: "/avatars/tritonRacoon2.png", pointsRequired: 25 },
    { src: "/avatars/chainsaw.png", pointsRequired: 25 },
    { src: "/avatars/tritonPumpkin.png", pointsRequired: 50 },
    { src: "/avatars/bloody.png", pointsRequired: 50 },
    { src: "/avatars/avatar1.png", pointsRequired: 100 },
    { src: "/avatars/avatar2.png", pointsRequired: 200 },
    { src: "/avatars/avatar3.png", pointsRequired: 300 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserID(user.uid);
        try {
          const userData = await getUser(user.uid);
          if (userData) {
            setPoints(userData.points);
            setAvatar(userData.avatar);
            setRoomID(userData.room_ID);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not authenticated");
      }
    });

    return () => unsubscribe();
  }, [roomID]);

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
    console.log(newAvatar);
    updateUserAvatar(userID, newAvatar);
    // backend can save avatar
  };

  const addPoints = () => {
    setPoints((prevPoints) => prevPoints + 50);
    updateUserPoints(userID, points);
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  const handleSignOut = async () => {
    try {
        await signOut(auth);
        setUser(null);
        document.cookie = `auth-token=; path=/; max-age=0;`;
        console.log('IS THIS EMPTY',document.cookie)
    } catch (error : unknown ) {
        console.error("Failed to sign out", error)  
    }
    router.push('/');
}

  return (
    <div className="user-page bg-white text-black min-h-screen">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-[#FFCD00]">Welcome!</h1>
        <div className="profile flex items-center mt-4">
          <img src={avatar} alt="User Avatar" className="profile-avatar mr-4" />
          <Link
            href="/dashboard"
            className="inline-block bg-[#FFCD00] text-white px-4 py-2 rounded-lg hover:bg-[#FFD633] transition duration-300 ease-in-out text-center font-semibold"
          >
            Done
          </Link>
          <button   className="ml-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-[#FFD633] transition duration-300 ease-in-out text-center font-semibold" onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <div className="flex items-center space-x-4 bg-[#D462AD]/10 p-4 rounded-lg border border-[#D462AD]/30 shadow-sm">
        <div className="flex items-center space-x-2">
          <p className="text-lg font-semibold text-[#FFCD00]">
            Points: <span className="text-[#D462AD]">{points}</span>
          </p>
        </div>
        <div className="avatar-selector-container mb-6">
          <AvatarSelector
            currentAvatar={avatar}
            onAvatarChange={handleAvatarChange}
            avatars={avatars}
            points={points}
          />
        </div>
      </div>

      <div className="profile-summary-container mt-8 p-6 rounded-lg shadow-lg">
        <ProfileSummary
          initialData={{
            name: "",
            major: "",
            pronouns: "",
            sleepingHours: "",
            favoriteThing: "",
          }}
          userID={userID}
          roomID={roomID}
        />
      </div>

      <style jsx>{`
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .user-page {
          padding: 20px;
        }
        .profile-summary-container {
          background-color: #c1dcff;
        }
      `}</style>
    </div>
  );
};

export default UserPage;
