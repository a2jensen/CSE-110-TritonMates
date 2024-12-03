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
import { auth, onAuthStateChanged } from "../../firebase/firebaseConfig";

const UserPage = () => {
  const [avatar, setAvatar] = useState("/avatars/default.png"); // Default avatar
  const [points, setPoints] = useState(0);
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [loading, setLoading] = useState(true);

  const avatars = [
    { src: "/avatars/default.png", pointsRequired: 0 },
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

  return (
    <div className="user-page bg-[#182B49] text-white min-h-screen">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-[#FFCD00]">Select Avatar</h1>
        <div className="profile flex items-center mt-4">
          <img src={avatar} alt="User Avatar" className="profile-avatar mr-4" />
          <Link className="text-[#FFCD00] hover:underline" href="/dashboard">
            Done
          </Link>
        </div>
      </header>

      <button onClick={addPoints}>Earn Points</button>
      <p>{`Points: ${points}`}</p>

      <div className="avatar-selector-container mb-8">
        <AvatarSelector
          currentAvatar={avatar}
          onAvatarChange={handleAvatarChange}
          avatars={avatars}
          points={points}
        />
      </div>

      <div className="profile-summary-container mt-8 p-6 bg-[#182B49] rounded-lg shadow-lg">
        {/* Include ProfileSummary component */}
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
          background-color: #182b49;
        }
      `}</style>
    </div>
  );
};

export default UserPage;
