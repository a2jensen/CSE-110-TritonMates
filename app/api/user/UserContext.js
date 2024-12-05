import { db } from '@/firebase/firebaseConfig.ts'


import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc, Timestamp} from "firebase/firestore";
import {user} from '@/types'



export async function getAllUsers(roomID){
    const roomDocRef = doc(db, "rooms", roomID);

    const roomInfo= await getDoc(roomDocRef);
    const roomData = roomInfo.data();
  
    const user_ids = roomData.room_users;

    console.log("user_ids", user_ids);
    // Loop through documents in the collectio

   
    const users = await Promise.all(
        user_ids.map(async (user_id) => {
          const userRef = doc(db, "user", user_id);
          const userSnap = await getDoc(userRef);
    
          if (userSnap.exists()) {
            const data = userSnap.data();
    
            const userData = {
              name: data['name'],
              points: data['points'],
              major: data['major'],
              pronouns: data['pronouns'],
              sleepingHours: data['sleepingHours'],
              favoriteThing: data['favoriteThing'],
              avatar: data['avatar'],
              user_ID: data['user_ID'],
              room_ID: roomID,
            };
    
            return userData;
          }
        })
      );
    
      // Filter out any undefined results (in case some user docs do not exist)
      const filteredUsers = users.filter((user) => user !== undefined);
    
      console.log("Fetched users:", filteredUsers);
      return filteredUsers;
}
export async function addUser(roomID, name){

    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const newDocRef = await addDoc(docRef, {
        name: name,
        points: 0,
        major: "",
        pronouns: "",
        sleepingHours: "",
        favoriteThing:"",
        room_ID: roomID,
      });
    console.log("New document ID: ", newDocRef.id);
    const taskRef = doc(db, "rooms", roomID, "Tasks", newDocRef.id)
    await updateDoc(taskRef, {
        name: name,
        points: 0,
        major: "",
        pronouns: "",
        sleepingHours: "",
        favoriteThing:"",
        user_ID: newDocRef.id,
        room_ID: roomID,
        avatar: "/avatars/default.png"
    });
    return newDocRef.id;
    
}

export async function deleteUser(roomID, userID){
    const taskDocRef = doc(db, "rooms", roomID, "Users", userID);
    await deleteDoc(taskDocRef);

}


export async function updateUserProfile(roomID, userID, name, major, pronouns, sleepingHours, favoriteThing){

    const userRef = doc(db, "user", userID);
    const userSnap = await getDoc(userRef);

    const userData = userSnap.data();
    console.log("profile update");
    console.log(userData);
    
 
    await updateDoc(userRef, {
        name: name,
        points: userData['points'],
        major: major,
        pronouns: pronouns,
        sleepingHours: sleepingHours,
        favoriteThing: favoriteThing,
        avatar: userData['avatar'],
        user_ID: userID,
        room_ID: roomID,
        
    });

}

export async function updateUserPoints(userID, points){
   
    const userRef = doc(db, "user", userID);
    const userSnap = await getDoc(userRef);

    console.log("points update", points);
   
    

    const userData = userSnap.data();
    console.log(userData);
    console.log(points);
    await updateDoc(userRef, {
        name:  userData.name,
        points: userData.points + points,
        major: userData.major,
        pronouns: userData.pronouns,
        sleepingHours: userData.sleepingHours,
        favoriteThing: userData.favoriteThing,
        avatar: userData.avatar,
        user_ID: userData.user_ID,
        room_ID: userData.room_ID,
        
    });

}

export async function updateUserAvatar(userID, avatar){
   
    const userRef = doc(db, "user", userID);
    const userSnap = await getDoc(userRef);

    console.log("avatar update");
    

    const userData = userSnap.data();
    console.log(userData);
    await updateDoc(userRef, {
        name:  userData.name,
        points: userData.points,
        major: userData.major,
        pronouns: userData.pronouns,
        sleepingHours: userData.sleepingHours,
        favoriteThing: userData.favoriteThing,
        avatar: avatar,
        user_ID: userData.user_ID,
        room_ID: userData.room_ID,
        
    });

}
export async function getUser(userID){
    const userRef =  doc(db, "user", userID)
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        console.log("Document data:", userSnap.data());
        const data = userSnap.data();
        return {
            name: data['name'],
            points: data['points'],
            major: data['major'],
            pronouns: data['pronouns'],
            sleepingHours: data['sleepingHours'],
            favoriteThing: data['favoriteThing'],
            avatar: data['avatar'],
            user_ID: data['user_ID'],
            room_ID:  data['room_ID'],
       };
   
       } else {
      
       console.log("No such document!");
       }   
    
}


export async function getAllUsersinRoom(roomID){
    const docRef = collection(db, "user");
    
    const docsSnap = await getDocs(docRef);

    // Loop through documents in the collection
  //  const [tasks, updateTasks] = useState([])
    const users = [];
    const user_names = [];
    if (docsSnap.empty) {
        console.log("No documents found in the tasks collection.");
    }
    
    docsSnap.forEach((doc) => {
        const user = doc.data();
       
        if (user["room_ID"] === roomID){
       
           const userData = { 
            name: user['name'],
            points: user['points'],
            major: user['major'],
            pronouns: user['pronouns'],
            sleepingHours: user['sleepingHours'],
            favoriteThing: user['favoriteThing'],
            user_ID: user['user_ID'],
            room_ID: roomID,
            };
            users.push(userData)
            user_names.push( userData['name']);
        }
  });
  return users;
    
}