// context/RoomContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

type RoomData = {
  created?: Date,
  room_code?: string,
  room_id?: string,
  room_name?: string,
  room_users?: string[]
};

type RoomContextType = {
  roomData: RoomData | null;
  setRoomData: (data: RoomData) => void;
  updateRoomData: (data: RoomData) => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  // updates room Data
  const updateRoomData = (data: RoomData) => {
    localStorage.removeItem("roomData");
    setRoomData(data);
    localStorage.setItem("roomData", JSON.stringify(data));
  }

  useEffect(() => {
    const storedRoomData = localStorage.getItem('roomData');
    if (storedRoomData) {
      try {
        const parsedRoomData = JSON.parse(storedRoomData) as RoomData;
        setRoomData(parsedRoomData);
      } catch (error: any) {
        console.error("Error parsing room data from localStorage", error)
      }
    }
  }, [])

  return (
    <RoomContext.Provider value={{ roomData, setRoomData, updateRoomData }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

