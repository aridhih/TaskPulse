import { useState, useEffect } from 'react';
import { FaInbox } from 'react-icons/fa';
import { auth, db } from '../../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ChatFeed from './ChatFeed';
import StandupFeed from './StandupFeed';
import TeamSidebar from './TeamSidebar';
import PersonalChat from './PersonalChat';


const Inbox = () => {
  const currentUser = auth.currentUser;
  const [activeTab, setActiveTab] = useState('Personal');
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [showMembers, setShowMembers] = useState(false);
  const [copiedUid, setCopiedUid] = useState(null);

  const handleEmailClick = (email, uid) => {
    navigator.clipboard.writeText(email);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 800); // Reset after blink
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const map = {};
      snapshot.forEach((doc) => (map[doc.id] = doc.data()));
      setUsersMap(map);
    };

    const fetchTeams = async () => {
      if (!currentUser?.uid) return;
      const q = query(collection(db, 'teams'), where('members', 'array-contains', currentUser.uid));
      const snapshot = await getDocs(q);
      const teamData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeams(teamData);
    };

    fetchUsers();
    fetchTeams();
  }, [currentUser]);

  const getUser = (uid) => usersMap?.[uid] || { name: 'Unknown User' };

  const handleTeamSelect = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    setSelectedTeamId(teamId);
    setSelectedTeam(team || null);
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full border rounded-b-lg flex flex-col">
      <div className="h-[54px] w-full text-white bg-gradient-to-l from-purple-500 via-blue-500 to-navbar p-2 flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 ml-1">
            <FaInbox className="h-4 w-4" />
            <p className="text-[13px] font-[cursive] cursor-default border-textSecondary border-r-2 pr-4">Inbox</p>
          </div>
          <div className="flex gap-2 ml-2">
            {['Personal', 'Teams', 'Standups'].map((tab) => (
              <div key={tab} className={activeTab === tab ? 'border-b-2 border-textPrimary' : ''}>
                <button onClick={() => setActiveTab(tab)} className={`text-base font-semibold p-1 m-1 hover:text-textPrimary rounded ${activeTab === tab ? 'text-textPrimary' : 'text-textSecondary'}`}>{tab}</button>
              </div>
            ))}
          </div>
        </div>

        {selectedTeam && activeTab === 'Standups' && (
          <h2 className="text-lg text-center w-full font-semibold mr-[79px]">{selectedTeam.teamName?.toUpperCase() || 'Team Standups'}</h2>
        )}
        {selectedTeam && activeTab === 'Teams' && (
          <>
            <h2 className="text-lg text-center font-semibold w-full">{selectedTeam.teamName?.toUpperCase() || 'Team Chat'}</h2>
            <button onClick={() => setShowMembers((prev) => !prev)} className="text-xs underline hover:text-white text-gray-100 text-nowrap">
              {showMembers ? 'Hide Members' : 'View Members'}
            </button>
            {showMembers && (
              <div className="absolute top-16 right-4 bg-gray-50 shadow-lg rounded-lg h-32 hide-scrollbar overflow-y-auto z-10 w-fit cursor-default">
                <div className="p-2 text-sm max-h-40 overflow-y-auto shadow-inner text-black">
                  <ul className="list-disc list-inside">
                    {selectedTeam.members.map((uid) => {
                      const user = getUser(uid);
                      return (
                        <li
                          key={uid}
                          onClick={() => handleEmailClick(user.email, uid)}
                          className="flex items-center gap-2 mb-2 cursor-pointer group"
                          title="Click to copy email"
                        >
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="user" className="rounded-full object-cover w-5 h-5" />
                          ) : (
                            <div className="h-5 w-5 flex items-center justify-center text-[8px] rounded-full bg-blue-400 text-white font-semibold">
                              {user.name?.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className={`text-sm transition-colors duration-300 ${copiedUid === uid ? 'text-green-500 animate-pulse' : ''}`}>
                            {copiedUid === uid ? 'Copied!' : user.email}
                          </span>
                        </li>



                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === 'Personal' && (
          <h2 className="text-lg text-center w-full font-semibold mr-[79px]">Personal Chat</h2>
        )}
      </div>

      <div className="h-[calc(100vh-105px)] rounded-b-lg w-full flex bg-gray-50">
        {activeTab === 'Teams' ? (
          <div className="flex w-full h-full">
            <TeamSidebar teams={teams} selectedTeamId={selectedTeamId} onTeamSelect={handleTeamSelect} />
            <div className="flex-1">
              {selectedTeamId ? (
                <ChatFeed teamId={selectedTeamId} currentUser={currentUser} getUser={getUser} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">Select a team to start chatting.</div>
              )}
            </div>
          </div>
        ) : activeTab === 'Standups' ? (
          <div className="flex w-full h-full">
            <TeamSidebar teams={teams} selectedTeamId={selectedTeamId} onTeamSelect={handleTeamSelect} />
            <div className="flex-1">
              {selectedTeamId ? (
                <StandupFeed teamId={selectedTeamId} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">Select a team to view standups.</div>
              )}
            </div>
          </div>
        ) : (
          <PersonalChat />
        )}
      </div>
    </div>
  );
};

export default Inbox;
