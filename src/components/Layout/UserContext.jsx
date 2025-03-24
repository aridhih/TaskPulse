import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Step 1: Context Create Karo
const UserContext = createContext(null);

// Step 2: Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUser(userDoc.exists() ? userDoc.data() : null);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

// Step 3: Custom Hook for Easy Access
export const useUser = () => useContext(UserContext);
