import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import {  collection,  query,  orderBy,  onSnapshot,  addDoc,  serverTimestamp,} from 'firebase/firestore';
import { format } from 'date-fns';

const ChatFeed = ({ teamId, currentUser, usersMap }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!teamId) return;
    const q = query(collection(db, 'teams', teamId, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return () => unsubscribe();
  }, [teamId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await addDoc(collection(db, 'teams', teamId, 'messages'), {
      senderId: currentUser.uid,
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  const getUser = (uid) => usersMap?.[uid] || { name: 'Unknown User' };
  const formatTime = (ts) =>
    ts?.toDate ? format(ts.toDate(), 'p | MMM d, yyyy') : 'Sending...';

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-white rounded shadow p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold border-b pb-2">Team Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const user = getUser(msg.senderId);
          const isCurrentUser = msg.senderId === currentUser.uid;
          const initials = user.name?.slice(0, 2).toUpperCase();
          return (
            <div key={msg.id} className={`flex gap-2 items-start ${isCurrentUser ? 'justify-end' : ''}`}>
              {!isCurrentUser && (
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
              )}
              <div className={`p-2 rounded-lg max-w-sm ${isCurrentUser ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>
                {!isCurrentUser && <p className="text-sm font-semibold">{user.name}</p>}
                <p>{msg.text}</p>
                <p className="text-[8px] text-gray-500 mt-1">{formatTime(msg.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFeed;
