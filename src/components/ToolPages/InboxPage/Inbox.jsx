// src/components/Inbox.js
import React, { useState, useEffect } from 'react';
import { FaInbox } from 'react-icons/fa';
import { MdMoveToInbox } from 'react-icons/md';
import { auth, db } from '../../../firebase'; // Adjust the import path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore';
import ChatFeed from './ChatFeed';
import StandupFeed from './StandupFeed';

const Inbox = () => {
  const currentUser = auth.currentUser;
  const [activeTab, setActiveTab] = useState('Personal');
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [usersMap, setUsersMap] = useState({});


  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const map = {};
      snapshot.forEach(doc => {
        map[doc.id] = doc.data(); // doc.id === uid
      });
      setUsersMap(map);
    };
  
    fetchUsers();

    const fetchTeams = async () => {
      if (!currentUser?.uid) return;
      const teamsRef = collection(db, 'teams');
      const q = query(teamsRef, where('members', 'array-contains', currentUser.uid));
      const snapshot = await getDocs(q);
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(teamsData);
    };  

    fetchTeams();
  }, [currentUser]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Channel') {
      setIsChannelOpen(true);
    } else {
      setIsChannelOpen(false);
    }
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeamId(teamId);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border rounded-b-lg flex flex-col">
      {/* Header */}
      <div className="h-[54px] w-full text-white bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 justify-between flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 ml-1">
            <FaInbox className="h-4 w-4" />
            <p className="text-[13px] font-[cursive] cursor-default border-textSecondary border-r-2 pr-4">Inbox</p>
          </div>

          <div className="flex gap-2 ml-2">
            {['Personal', 'Teams'].map((tab) => (
              <div key={tab} className={`${activeTab === tab ? 'border-b-2 border-textPrimary' : ''}`}>
                <button
                  className={`text-base font-semibold p-1 m-1 hover:text-textPrimary rounded ${
                    activeTab === tab ? 'text-textPrimary' : 'text-textSecondary'
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleTabClick('Channel')}
          className={`rounded font-semibold p-1 m-1 font-[cursive]  ${
            isChannelOpen ? 'underline' : 'hover:underline'
          }`}
        >
          Channel
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-113px)] w-full flex bg-gray-50">
        {!isChannelOpen ? (
          activeTab === 'Teams' ? (
            <div className="flex w-full h-full">
              {/* Sidebar: Team List */}
              <div className="w-1/3 border-r overflow-y-auto">
                <h3 className="p-4 font-semibold border-b">Your Teams</h3>
                {teams.length === 0 ? (
                  <p className="p-4 text-gray-500 italic">You are not part of any teams.</p>
                ) : (
                  teams.map((team) => (
                    <div
                      key={team.id}
                      onClick={() => handleTeamSelect(team.id)}
                      className={`p-4 cursor-pointer text-black hover:bg-blue-100 ${
                        selectedTeamId === team.id ? 'bg-blue-200 font-bold' : ''
                      }`}
                    >
                      {team?.teamName}
                    </div>
                  ))
                )}
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 p-4">
                {selectedTeamId ? (
                  <ChatFeed teamId={selectedTeamId} currentUser={currentUser} usersMap={usersMap} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">
                    Select a team to start chatting.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <MdMoveToInbox className="h-12 w-12 text-textSecondary" />
              <p>You don't have any notifications</p>
            </div>
          )
        ) : (
          <StandupFeed />
        )}
      </div>
    </div>
  );
};

export default Inbox;
