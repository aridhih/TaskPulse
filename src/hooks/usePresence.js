import { useEffect } from "react";
import { auth, db } from "../firebase";
import { getDatabase, ref, onDisconnect, onValue, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const usePresence = () => {
  useEffect(() => {
    let unsubscribeAuth;
    let beforeUnloadHandler;

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const uid = user.uid;
      const dbRT = getDatabase();

      const userStatusDatabaseRef = ref(dbRT, `/status/${uid}`);
      const userStatusFirestoreRef = doc(db, "users", uid);

      const isOfflineForRTDB = {
        state: "offline",
        last_changed: Date.now(),
      };

      const isOnlineForRTDB = {
        state: "online",
        last_changed: Date.now(),
      };

      const isOfflineForFirestore = {
        isOnline: false,
        lastActive: new Date(),
      };

      const isOnlineForFirestore = {
        isOnline: true,
        lastActive: new Date(),
      };

      const connectedRef = ref(dbRT, ".info/connected");

      onValue(connectedRef, async (snap) => {
        if (snap.val() === false) return;

        await onDisconnect(userStatusDatabaseRef).set(isOfflineForRTDB);

        // Set online status
        await set(userStatusDatabaseRef, isOnlineForRTDB);
        await setDoc(userStatusFirestoreRef, isOnlineForFirestore, { merge: true });

        // Handle browser/tab close
        beforeUnloadHandler = () => {
          setDoc(userStatusFirestoreRef, isOfflineForFirestore, { merge: true });
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);
      });
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (beforeUnloadHandler) window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);
};

export default usePresence;