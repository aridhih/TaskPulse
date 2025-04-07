import React, { useState, useEffect } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { collection, query, where, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ImBin } from 'react-icons/im';
import { BiEdit } from 'react-icons/bi';

const NotePad = ({ toggleNotePad, user }) => {
    const [showCloseNotepad, setShowCloseNotepad] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [error, setError] = useState(null);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(true);


    const handleCreateNote = async () => {
        if (!noteContent.trim()) return;

        try {
            await addDoc(collection(db, 'notes'), {
                userId: user.uid,
                content: noteContent.trim(),
                createdAt: serverTimestamp(),
            });
            setNoteContent('');
            setNewNote(false);
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await deleteDoc(doc(db, 'notes', id));
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const startEditNote = (note) => {
        setEditingNoteId(note.id);
        setEditContent(note.content);
    };

    const handleUpdateNote = async () => {
        try {
            const docRef = doc(db, 'notes', editingNoteId);
            await updateDoc(docRef, {
                content: editContent,
            });
            setEditingNoteId(null);
            setEditContent('');
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };



    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, 'notes'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));

                const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
                    const updatedNotes = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setNotes(updatedNotes);
                    setLoading(false);
                }, (error) => {
                    console.error('Error with real-time listener:', error);
                    setError('Failed to sync notes.');
                    setLoading(false);
                });

                // 🧹 Cleanup Firestore subscription
                return () => unsubscribeSnapshot();
            } else {
                setNotes([]);
                setLoading(false);
            }
        });

        // 🧹 Cleanup Auth subscription
        return () => unsubscribeAuth();
    }, []);


    return (
        <div className="fixed inset-0 z-50 right-3 backdrop-blur-[1px]">
            <div className='absolute right-[2px] justify-between top-[50px] w-96 min-h-96 z-50 bg-white text-black border flex flex-col rounded-t-lg shadow-lg'>
                <div className="flex justify-between items-center bg-[#ffecb8] p-2 rounded-t-md">
                    <h2 className="text-md font-semibold cursor-default">Notepad</h2>
                    <div className="flex space-x-2">
                        <div className="cursor-pointer p-1 rounded hover:bg-[#ecdcaf]"
                            onMouseEnter={() => setShowCloseNotepad(true)}
                            onMouseLeave={() => setShowCloseNotepad(false)}
                        >
                            <IoMdClose onClick={toggleNotePad} className='hover:rotate-90 ease-in-out transition duration-300' />
                            {showCloseNotepad && (
                                <div className="absolute z-50 top-2 right-9 text-nowrap w-fit p-1 bg-gray-700 border text-white border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                                    <div className="w-0 h-0 border-b-4 border-b-transparent border-t-4 border-t-transparent border-l-4 border-l-gray-700 absolute top-[7px] right-[-5px]"></div>
                                    Close Notepad
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5 justify-center items-center flex flex-col gap-3 pt-8">
                    <GiNotebook className="text-5xl text-gray-400" />
                    {loading ? (
                        <p className="text-sm text-gray-400">Loading your notes...</p>
                    ) : error ? (
                        <p className="text-sm text-red-400">{error}</p>
                    ) : notes.length === 0 ? (
                        <>
                            <h3 className="text-lg font-semibold">Create personal notes</h3>
                            <div className="mb-4 flex flex-col gap-1 text-gray-400 text-xs justify-center items-center">
                                <p>Capture your thoughts or ideas and access</p>
                                <p>them anywhere in Taskpulse!</p>
                            </div>
                            <button
                                className="w-fit py-1 px-2 bg-[#fae8b6] rounded-md hover:bg-[#ffecb8] mb-10"
                                onClick={() => setNewNote(true)}
                            >
                                Create a note
                            </button>
                        </>
                    ) : (
                        <>
                            <ul className="w-full max-h-[200px] overflow-y-auto text-sm text-left text-gray-700">
                                {notes.map(note => (
                                    <li key={note.id} className="border-b p-2 hover:bg-gray-50">
                                        {editingNoteId === note.id ? (
                                            <div className="flex flex-col gap-2">
                                                <textarea
                                                    className="w-full p-1 border rounded"
                                                    rows={3}
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpdateNote}
                                                        className="px-2 py-1 text-xs bg-green-200 rounded hover:bg-green-300"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingNoteId(null)}
                                                        className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center" onClick={() => startEditNote(note)} >
                                                <p className="cursor-pointer font-semibold text-md w-24">
                                                    {note.content?.slice(0, 13) || 'Untitled Note'}
                                                </p>
                                                <p className='text-xs text-gray-400 cursor-pointer scale-90'>  {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleString() : '...'} </p>
                                                <div className="flex text-md text-gray-400 items-center justify-center">
                                                    <ImBin onClick={() => handleDeleteNote(note.id)} className="text-red-500 cursor-pointer" />
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>


                        </>
                    )}

                    {/* Create Note Form */}
                    {newNote && (
                        <div className="mt-4 w-full flex flex-col gap-2">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                                rows={4}
                                placeholder="Write your note here..."
                                value={noteContent}
                                onChange={e => setNoteContent(e.target.value)}
                            />
                            <div className="flex justify-between">
                                <button
                                    className="px-3 py-1 text-sm bg-green-200 rounded hover:bg-green-300"
                                    onClick={handleCreateNote}
                                >
                                    Save
                                </button>
                                <button
                                    className="px-3 py-1 text-sm bg-red-200 rounded hover:bg-red-300"
                                    onClick={() => {
                                        setNewNote(false);
                                        setNoteContent('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {notes.length > 0 && (
                    <button className="flex items-center justify-center py-1 px-2  bg-[#fae8b6]  hover:bg-[#ffecb8]"
                    onClick={() => setNewNote(true)}
                >
                    Create new note
                </button>
                )}
                
            </div>
        </div>
    );
};

export default NotePad;
