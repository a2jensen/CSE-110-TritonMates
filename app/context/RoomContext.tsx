// context/RoomContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

type RoomData = {
  created? : Date,
  room_code? : String,
  room_id : String,
  room_name: String,
  room_users : String[]

};

type RoomContextType = {
  roomData: RoomData | null;
  setRoomData: (data: RoomData) => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  return (
    <RoomContext.Provider value={{ roomData, setRoomData }}>
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
