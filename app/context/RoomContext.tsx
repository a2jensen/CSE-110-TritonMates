'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkUserAuth } from '../api/user'; // Mocked API to check user authentication
import { checkRoom } from '../api/rooms'; // Mocked API to fetch room data based on user ID

type RoomData = {
  created?: Date;
  room_code?: string;
  room_id?: string;
  room_name?: string;
  room_users?: string[];
};

type RoomContextType = {
  roomData: RoomData | null;
  setRoomData: (data: RoomData) => void;
  updateRoomData: (data: RoomData) => void;
  fetchRoomData: () => Promise<void>; // Explicit function to fetch room data
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  // Updates roomData and synchronizes with localStorage
  const updateRoomData = (data: RoomData) => {
    localStorage.removeItem('roomData');
    setRoomData(data);
    localStorage.setItem('roomData', JSON.stringify(data));
  };

  // Fetch room data for the authenticated user
  const fetchRoomData = async () => {
    try {
      const user = await checkUserAuth(); // Check user authentication
      if (user) {
        const userId = user.uid;
        if (userId) {
          const roomId = await checkRoom(userId); // Fetch the room data
          if (roomId) {
            console.log('Room fetched in RoomContext:', roomId);
            updateRoomData({ ...roomData, room_id: roomId }); // Update room context state
          }
        }
      }
    } catch (error: unknown) {
      console.error('Error fetching room data in RoomContext:', error);
    }
  };

  // Automatically fetch room data when RoomProvider initializes
  useEffect(() => {
    const storedData = localStorage.getItem('roomData');
    if (storedData) {
      setRoomData(JSON.parse(storedData));
    } else {
      fetchRoomData();
    }
  }, []); // Run on mount

  return (
    <RoomContext.Provider value={{ roomData, setRoomData, updateRoomData, fetchRoomData }}>
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
