import { useState, useEffect } from "react";

interface ProfileSummaryProps {
  initialData?: {
    name: string;
    major: string;
    pronouns: string;
    sleepingHours: string;
    favoriteThing: string;
  };
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  initialData = {
    name: "",
    major: "",
    pronouns: "",
    sleepingHours: "",
    favoriteThing: "",
  },
}) => {
  const [name, setName] = useState(initialData.name);
  const [major, setMajor] = useState(initialData.major);
  const [pronouns, setPronouns] = useState(initialData.pronouns);
  const [sleepingHours, setSleepingHours] = useState(initialData.sleepingHours);
  const [favoriteThing, setFavoriteThing] = useState(initialData.favoriteThing);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    // Optionally, save each field to localStorage or send to backend
  };

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name);
      setMajor(parsedData.major);
      setPronouns(parsedData.pronouns);
      setSleepingHours(parsedData.sleepingHours);
      setFavoriteThing(parsedData.favoriteThing);
    }
  }, []);

  useEffect(() => {
    const profileData = { name, major, pronouns, sleepingHours, favoriteThing };
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [name, major, pronouns, sleepingHours, favoriteThing]);

  return (
    <div className="profile-summary">
      <h2 className="text-xl font-semibold text-[#FFCD00]">User Profile</h2>

      <div className="input-group">
        <label className="text-[#D462AD]" htmlFor="name">
          Preferred Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleChange(e, setName)}
          className="input-field"
          placeholder="Enter your preferred name"
        />
      </div>

      <div className="input-group">
        <label className="text-[#D462AD]" htmlFor="major">
          Major:
        </label>
        <input
          type="text"
          id="major"
          value={major}
          onChange={(e) => handleChange(e, setMajor)}
          className="input-field"
          placeholder="Enter your major"
        />
      </div>

      <div className="input-group">
        <label className="text-[#D462AD]" htmlFor="pronouns">
          Pronouns:
        </label>
        <input
          type="text"
          id="pronouns"
          value={pronouns}
          onChange={(e) => handleChange(e, setPronouns)}
          className="input-field"
          placeholder="Enter your pronouns"
        />
      </div>

      <div className="input-group">
        <label className="text-[#D462AD]" htmlFor="sleepingHours">
          Preferred Sleeping Hours:
        </label>
        <input
          type="text"
          id="sleepingHours"
          value={sleepingHours}
          onChange={(e) => handleChange(e, setSleepingHours)}
          className="input-field"
          placeholder="Enter your preferred sleeping hours"
        />
      </div>

      <div className="input-group">
        <label className="text-[#D462AD]" htmlFor="favoriteThing">
          Favorite Thing:
        </label>
        <input
          type="text"
          id="favoriteThing"
          value={favoriteThing}
          onChange={(e) => handleChange(e, setFavoriteThing)}
          className="input-field"
          placeholder="Enter your favorite thing"
        />
      </div>

      <style jsx>{`
        .input-group {
          margin-bottom: 15px;
        }
        .input-field {
          border: 1px solid #00629b;
          padding: 10px;
          width: 100%;
          border-radius: 4px;
          background-color: #aaaaaa;
        }
      `}</style>
    </div>
  );
};

export default ProfileSummary;
