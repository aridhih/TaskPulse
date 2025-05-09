import { useEffect, useState, useRef } from 'react';
import { auth, db } from '../../../firebase';
import { collection, addDoc, query, where, getDocs, doc, orderBy, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

const PersonalChat = () => {
    const currentUser = auth.currentUser;
    const [chats, setChats] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [usersMap, setUsersMap] = useState({});
    const [newMessage, setNewMessage] = useState(null);
    const bottomRef = useRef(null);
    const [loadingChats, setLoadingChats] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!currentUser) return;
        const q = query(collection(db, 'chats'), where('members', 'array-contains', currentUser.uid));
        setLoadingChats(true);
        const unsub = onSnapshot(q, async (snapshot) => {
            const chatsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setChats(chatsData);
            const userIds = [...new Set(chatsData.flatMap(chat => chat.members))];
            const userSnaps = await Promise.all(userIds.map(uid => getDocs(query(collection(db, 'users'), where('uid', '==', uid)))));
            const userMap = {};
            userSnaps.flat().forEach(snap => {
                snap.docs.forEach(doc => {
                    userMap[doc.data().uid] = { ...doc.data(), id: doc.id };
                });
            });
            setUsersMap(userMap);
            setLoadingChats(false);
        });
        return () => unsub();
    }, [currentUser]);

    useEffect(() => {
        if (!selectedChat) return;
        const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));
        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages((prev) => {
                const lastMsg = msgs[msgs.length - 1];
                if (!prev.length || lastMsg?.id !== prev[prev.length - 1]?.id) setNewMessage(lastMsg);
                return msgs;
            });
        });
        return () => unsub();
    }, [selectedChat]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startNewChat = async () => {
        const q = query(collection(db, 'users'), where('email', '==', newEmail));
        const userSnap = await getDocs(q);
        if (userSnap.empty) return alert('No user found with this email');
        const user = userSnap.docs[0].data();
        const otherUid = user.uid;
        const chatQuery = query(collection(db, 'chats'), where('members', 'in', [[currentUser.uid, otherUid], [otherUid, currentUser.uid]]));
        const existingChats = await getDocs(chatQuery);
        if (!existingChats.empty) {
            setSelectedChat({ id: existingChats.docs[0].id, ...existingChats.docs[0].data() });
            return;
        }
        const newChat = await addDoc(collection(db, 'chats'), { members: [currentUser.uid, otherUid] });
        setNewEmail('');
        setSelectedChat({ id: newChat.id, members: [currentUser.uid, otherUid] });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input || !selectedChat) return;
        await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
            senderId: currentUser.uid,
            text: input,
            timestamp: serverTimestamp(),
        });
        setInput('');
        inputRef.current?.focus();
    };

    const handleDelete = async (msgId) => {
        await deleteDoc(doc(db, 'chats', selectedChat.id, 'messages', msgId));
    };

    const formatTime = (ts) => ts?.toDate ? format(ts.toDate(), 'p | MMM d, yyyy') : 'Sending...';
    const getUser = (uid) => usersMap[uid] || {};

    return (
        <div className="flex h-full w-full bg-white">
            <div className="w-[29%] border-r p-2 bg-gray-50">
                <h2 className="font-bold mb-2">Your Chats</h2>
                <input type="email" placeholder="Start chat with email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-1 text-sm rounded w-full mb-2" />
                <button onClick={startNewChat} className="bg-blue-500 text-white px-2 py-1 rounded w-full text-sm">Start Chat</button>
                <ul className="mt-4 space-y-1">
                    {loadingChats ? (
                        <div className='flex justify-center items-center h-64 border'>
                        <div className="w-8 h-8 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
                        <span className="ml-4 text-gray-500 text-base">Loading chats...</span>
                        </div>
                    ) : (
                        chats.map((chat) => {
                            const otherUserId = chat.members.find(id => id !== currentUser.uid);
                            const user = getUser(otherUserId);
                            return (
                                <li
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`p-2 cursor-pointer hover:bg-gray-200 rounded text-sm ${selectedChat?.id === chat.id ? 'bg-gray-300' : ''}`}
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="avatar" className="inline-block h-6 w-6 rounded-full mr-2" />
                                    ) : (
                                        <span className="inline-block h-6 w-6 rounded-full bg-blue-400 text-white text-xs font-bold text-center leading-6 mr-2">
                                            {user.name?.slice(0, 2).toUpperCase()}
                                        </span>
                                    )}
                                    {user.name || otherUserId}
                                </li>
                            );
                        })
                    )}
                </ul>

            </div>
            <div className="flex-1 p-4 flex flex-col bg-gray-50 border-l">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'><circle cx='1' cy='1' r='1' fill='%23cbd5e1' /></svg>")`, backgroundRepeat: 'repeat', backgroundColor: '#f9fafb' }}>
                            {messages.map((msg) => {
                                const user = getUser(msg.senderId);
                                const isCurrentUser = msg.senderId === currentUser.uid;
                                const initials = user.name?.slice(0, 2).toUpperCase();
                                return (
                                    <div key={msg.id} className={`flex gap-2 items-start relative group ${isCurrentUser ? 'justify-end' : ''}`}>
                                        {!isCurrentUser && (
                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold">
                                                {user.photoURL ? <img src={user.photoURL} alt={user.name} className="h-8 w-8 rounded-full object-cover" /> : initials}
                                            </div>
                                        )}
                                        <div className="relative">
                                            {isCurrentUser && (
                                                <button onClick={() => handleDelete(msg.id)} className="hidden group-hover:flex items-center justify-center absolute -left-7 top-4 w-6 h-6 hover:text-red-600 bg-gray-100 border rounded-full shadow-sm" title="Delete">
                                                    <FaTrash className="w-3 h-3" />
                                                </button>
                                            )}
                                            <div className={`p-2 rounded-lg max-w-sm break-words ${isCurrentUser ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>
                                                {!isCurrentUser && <p className="text-sm font-semibold">{user.name}</p>}
                                                <p>{msg.text}</p>
                                                <p className="text-[8px] text-gray-500 mt-1">{formatTime(msg.timestamp)}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={bottomRef} />
                        </div>
                        <form onSubmit={sendMessage} className="flex gap-2 p-2 border-t">
                            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." className="border rounded p-2 flex-1" />
                            <button type="submit" className="bg-blue-500 text-white px-4 rounded">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="text-gray-500 italic flex justify-center items-center h-full">Select or start a chat</div>
                )}
            </div>
        </div>
    );
};

export default PersonalChat;
