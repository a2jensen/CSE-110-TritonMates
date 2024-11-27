import { useState } from 'react';

const AvatarSelector = ({ currentAvatar, onAvatarChange, avatars, points }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleAvatarSelect = (avatar) => {
    if (points >= avatar.pointsRequired) { // Ensure the avatar is unlocked
      setSelectedAvatar(avatar.src);
      if (onAvatarChange) {
        onAvatarChange(avatar.src);
      }
    }
  };

  return (
    <div className="avatar-selector">
      <h3>Select Your Avatar</h3>
      <div className="avatar-list">
        {avatars.map((avatar) => (
          <div key={avatar.src} className="avatar-container">
            <img
              src={avatar.src}
              alt="Avatar"
              className={`avatar-item ${selectedAvatar === avatar.src ? 'selected' : ''}`}
              onClick={() => handleAvatarSelect(avatar)}
              style={{
                opacity: points >= avatar.pointsRequired ? 1 : 0.5,
                cursor: points >= avatar.pointsRequired ? 'pointer' : 'not-allowed',
              }}
            />
            <p className="points-label">
              {points >= avatar.pointsRequired
                ? 'Unlocked'
                : `${avatar.pointsRequired} Points Needed`}
            </p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .avatar-selector {
          text-align: center;
        }
        .avatar-list {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .avatar-container {
          text-align: center;
        }
        .avatar-item {
          width: 70px;
          height: 70px;
          border: 2px solid transparent;
          border-radius: 50%;
          transition: border-color 0.2s ease-in-out, transform 0.2s;
        }
        .avatar-item:hover {
          transform: scale(1.1);
        }
        .avatar-item.selected {
          border-color: #0070f3;
        }
        .points-label {
          font-size: 0.8rem;
          margin-top: 5px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default AvatarSelector;
