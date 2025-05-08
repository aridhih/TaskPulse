import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../../firebase';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';

const ChatFeed = ({ teamId, teamName, teamMembers = [], currentUser, usersMap }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showMembers, setShowMembers] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!teamId) return;
        const q = query(collection(db, 'teams', teamId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );
        return () => unsubscribe();
    }, [teamId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
        <div className="w-full h-full flex flex-col bg-white rounded  border overflow-hidden ">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <h2 className="text-lg font-semibold">{teamName || 'Team Chat'}</h2>
                <button
                    onClick={() => setShowMembers((prev) => !prev)}
                    className="text-xs underline hover:text-gray-200"
                >
                    {showMembers ? 'Hide Members' : 'View Members'}
                </button>
            </div>

            {/* Member List */}
            {showMembers && (
                <div className="px-4 py-2 text-sm bg-gray-50 border-b max-h-40 overflow-y-auto">
                    <ul className="list-disc list-inside">
                        {teamMembers.map((uid) => {
                            const user = getUser(uid);
                            return <li key={uid}>{user.name}</li>;
                        })}
                    </ul>
                </div>
            )}

            {/* Chat Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'><circle cx='1' cy='1' r='1' fill='%23cbd5e1' /></svg>")`,
                    backgroundRepeat: 'repeat',
                    backgroundColor: '#f9fafb',
                }}

            >


                {messages.map((msg) => {
                    const user = getUser(msg.senderId);
                    const isCurrentUser = msg.senderId === currentUser.uid;
                    const initials = user.name?.slice(0, 2).toUpperCase();
                    return (
                        <div key={msg.id} className={`flex gap-2 items-start ${isCurrentUser ? 'justify-end' : ''}`}>
                            {!isCurrentUser && (
                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                    ) : (
                                        initials
                                    )}
                                </div>
                            )}
                            <div className={`p-2 rounded-lg max-w-sm break-words ${isCurrentUser ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>
                                {!isCurrentUser && <p className="text-sm font-semibold">{user.name}</p>}
                                <p>{msg.text}</p>
                                <p className="text-[8px] text-gray-500 mt-1">{formatTime(msg.timestamp)}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Input Field */}
            <form onSubmit={handleSend} className="p-2 flex border-t">
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
