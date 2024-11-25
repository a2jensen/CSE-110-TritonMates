"use client";

import { useState } from 'react';
import AvatarSelector from '../../components/user/AvatarSelector';
import Link from 'next/link';

const UserPage = () => {
  const [avatar, setAvatar] = useState('/avatars/default.png'); // Default avatar

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
    // Optionally, send the updated avatar to the backend
  };

  return (
    <div className="user-page">
      <header>
        <h1>{`Select Avatar`}</h1>
        <div className="profile">
          <img src={avatar} alt="User Avatar" className="profile-avatar" />
          <Link className="text-blue-500 hover:underline" href="/dashboard">done</Link>
        </div>
      </header>
      <AvatarSelector currentAvatar={avatar} onAvatarChange={handleAvatarChange} />
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
