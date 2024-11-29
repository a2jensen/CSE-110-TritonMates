"use client";

import { useState } from "react";
import AvatarSelector from "../../components/user/AvatarSelector";
import Link from "next/link";
import ProfileSummary from "../../components/user/profileSummary";

const UserPage = () => {
  const [avatar, setAvatar] = useState('/avatars/default.png'); // Default avatar
  const [points, setPoints] = useState(0);

  const avatars = [
    { src: '/avatars/default.png', pointsRequired: 0 },
    { src: '/avatars/avatar1.png', pointsRequired: 100 },
    { src: '/avatars/avatar2.png', pointsRequired: 200 },
    { src: '/avatars/avatar3.png', pointsRequired: 300 },
  ];

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
    // backend can save avatar
  };

  const addPoints = () => {
    setPoints((prevPoints) => prevPoints + 50);
    // backend can send updated pts
  };



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
