import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdCastConnected } from "react-icons/md";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { auth, db } from "../../../firebase";
import {  collection,  query,  where,  doc,  getDocs,  onSnapshot,  } from "firebase/firestore";

const PulsePage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

  
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    let unsubscribes = [];

    const fetchAndSubscribe = async () => {
      setLoading(true);

      try {
        const teamsRef = collection(db, "teams");
        const teamQuery = query(teamsRef, where("createdBy", "==", uid));
        const teamSnap = await getDocs(teamQuery);

        const memberUIDs = new Set();

        teamSnap.forEach((teamDoc) => {
          const members = teamDoc.data().members || [];
          members.forEach((memberUid) => memberUIDs.add(memberUid));
        });

        const online = [];
        const offline = [];

        memberUIDs.forEach((memberUid) => {
          const userDocRef = doc(db, "users", memberUid);

          const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const userData = snapshot.data();
            if (!userData) return;

            const user = {
              name: userData.name || "Unknown",
              photoURL: userData.photoURL || null,
            };

            setOnlineUsers((prev) => {
              const filtered = prev.filter((u) => u.name !== user.name);
              return userData.isOnline ? [...filtered, user] : filtered;
            });

            setOfflineUsers((prev) => {
              const filtered = prev.filter((u) => u.name !== user.name);
              return !userData.isOnline ? [...filtered, user] : filtered;
            });
          });

          unsubscribes.push(unsubscribe);
        });
      } catch (err) {
        console.error("Error setting up real-time user listeners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSubscribe();

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, []);

  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-b-lg bg-white">
      {/* Header */}
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-1 ml-1">
          <MdCastConnected />
          <p className="text-[13px] cursor-default font-[cursive]">Pulse</p>
          <p className="text-xs cursor-default text-textSecondary ml-5">See who's online</p>
        </div>
        <div className="text-white underline underline-dotted p-2">
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full pt-8 flex flex-col gap-4 items-center bg-white overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow-md w-[80%]">
          <div className="text-md flex items-center w-fit font-semibold mb-4 text-surface">
            <GoDotFill className="text-green-500" /> <h2>People Online</h2>
          </div>
          <div className="overflow-x-scroll">
            <div className="flex space-x-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`h-32 w-8 rounded ${
                      i === new Date().getHours() ? "bg-blue-500 hover:cursor-pointer" : "bg-gray-300"
                    }`}
                    title={`${i === new Date().getHours() ? `Online: ${onlineUsers.length}`: "no record"}`}
                  ></div>
                  <p className="mt-2 text-[8px] text-textSecondary">
                    {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="m-4 p-2 w-[80%] flex flex-col gap-4">
          {/* Online Users */}
          <div className="hover:shadow-lg hover:shadow-green-500/50 hover:border-t hover:border-green-500/50 p-4 rounded-lg transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <p className="text-textPrimary">Online ({onlineUsers.length})</p>
              <FaUserCheck className="text-green-500" />
            </div>
            <ul className="text-textSecondary mt-2 flex gap-8 flex-wrap">
              {loading ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : onlineUsers.map((user, index) => (
                <li key={index} className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300 text-[10px] flex items-center justify-center font-semibold text-gray-700">
                      {getInitials(user.name)}
                    </div>
                  )}
                  {user.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Offline Users */}
          <div className="hover:shadow-lg hover:shadow-red-500/50 hover:border-t hover:border-red-500/50 p-4 rounded-lg transition-shadow duration-300">
            <div className="flex items-center gap-2">
              <p className="text-textPrimary">Offline ({offlineUsers.length})</p>
              <FaUserAltSlash className="text-red-500" />
            </div>
            <ul className="text-textSecondary mt-2 flex gap-8 flex-wrap">
              {loading ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : offlineUsers.map((user, index) => (
                <li key={index} className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300 text-[10px] flex items-center justify-center font-semibold text-gray-700">
                      {getInitials(user.name)}
                    </div>
                  )}
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulsePage;
