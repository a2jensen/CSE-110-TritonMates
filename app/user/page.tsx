"use client";

import { useState } from 'react';
import AvatarSelector from '../../components/user/AvatarSelector';
import Link from 'next/link';

const UserPage = () => {
  const [avatar, setAvatar] = useState('/avatars/default.png'); // Default avatar
  const [points, setPoints] = useState(0);

  const avatars = [
    { src: '/avatars/default.png', pointsRequired: 0 },
    { src: '/avatars/avatar1.png', pointsRequired: 100 },
    { src: '/avatars/avatar2.png', pointsRequired: 200 },
    { src: '/avatars/avatar3.png', pointsRequired: 300 },
  ];

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
    // Save avatar to backend
  };

  const addPoints = () => {
    setPoints((prevPoints) => prevPoints + 50);
    // Optionally send updated points to the backend
  };

  return (
    <div className="user-page">
      <header>
        <h1>Select Avatar</h1>
        <div className="profile">
          <img src={avatar} alt="User Avatar" className="profile-avatar" />
          <Link className="text-blue-500 hover:underline" href="/dashboard">
            done
          </Link>
        </div>
      </header>
      <button onClick={addPoints}>Earn Points</button>
      <p>{`Points: ${points}`}</p>
      <AvatarSelector
        currentAvatar={avatar}
        onAvatarChange={handleAvatarChange}
        avatars={avatars} // Pass the full list of avatars
        points={points} // Pass user points
      />
      <style jsx>{`
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default UserPage;
