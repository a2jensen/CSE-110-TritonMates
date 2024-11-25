import { useState } from "react";

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
];

const AvatarSelector = ({ currentAvatar, onAvatarChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    if (onAvatarChange) {
      onAvatarChange(avatar);
    }
  };

  return (
    <div className="avatar-selector">
      <h3>Select Your Avatar</h3>
      <div className="avatar-list">
        {avatars.map((avatar) => (
          <img
            key={avatar}
            src={avatar}
            alt="Avatar"
            className={`avatar-item ${
              selectedAvatar === avatar ? "selected" : ""
            }`}
            onClick={() => handleAvatarSelect(avatar)}
          />
        ))}
      </div>
      <style jsx>{`
        .avatar-selector {
          text-align: center;
        }
        .avatar-list {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .avatar-item {
          width: 50px;
          height: 50px;
          border: 2px solid transparent;
          border-radius: 50%;
          cursor: pointer;
        }
        .avatar-item.selected {
          border-color: #0070f3;
        }
      `}</style>
    </div>
  );
};

export default AvatarSelector;
