import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Function to check if a user is authenticated
export async function checkUserAuth(): Promise<User | null> {
  const auth = getAuth();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // User is authenticated
      } else {
        resolve(null); // No user is logged in
      }
    });
  });
}
