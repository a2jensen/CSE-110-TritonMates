// context/RoomContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuth } from '../api/user';
import { checkRoom } from '../api/rooms';

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
  /** 
  useEffect(() => { 
    const fetchRoomId = async() => {
      try {
        const user = await checkUserAuth();
        if (user) {
          const userId = user.uid;
          if (userId) {
            const roomId = await checkRoom(userId);
            if (roomId) {
              console.log("ROOMID WOOOOO FETCHED IN ROOM CONTEXT", roomId)
              setRoomData({...roomData, room_id : roomId})
            }
          }
        }
      } catch (error : unknown){
        console.error("Error in roomContext in trying to fetch room id", error)
      }
      fetchRoomId();
    }
  }, []) */

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

