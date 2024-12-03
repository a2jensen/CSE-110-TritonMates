import { db } from '@/firebase/firebaseConfig';
import { doc, collection, setDoc, getDoc } from "firebase/firestore";


export async function addUserToFirestore (userId: string, userName: string, userDob: string, points: number) {
    try {
      const userRef = doc(collection(db, "user"), userId);
      await setDoc(userRef, {
        name: userName,
        dateOfBirth: userDob,
        points: points,
        major: "",
        pronouns: "",
        sleepingHours: "",
        favoriteThing: "",

        room_ID: "",
        user_ID: userId,
        avatar : '/avatars/default.png'


      });
      console.log("User added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

export async function checkIfUserExists (userId: string) {
    try {
      const userDocRef = doc(db, "user", userId);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists();
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return false;
    }
  };
