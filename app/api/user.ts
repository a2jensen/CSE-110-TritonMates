import { getAuth } from "firebase/auth"

// function that checks if a user is logged in.
export async function checkUserAuth() {
    const auth = getAuth();
    const user = auth.currentUser;

    if(user){
        return user;
    } else {
        console.error("not logged in");
        return null;
    };
};