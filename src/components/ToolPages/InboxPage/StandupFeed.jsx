import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../../firebase';

const StandupFeed = ({ teamId, teamName }) => {
  const [standups, setStandups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) return;
    const fetchStandups = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'standups'),
          where('teamId', '==', teamId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStandups(data);
      } catch (error) {
        console.error('Error fetching standups:', error);
        setStandups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandups();
  }, [teamId]);

  return (
    <div className="max-w-5xl mx-auto py-5 px-4 md:px-8">
      <h2 className="text-xl font-semibold text-center text-gray-800 tracking-tight">
        🌟 {teamName ? `${teamName} Standups` : 'Team Standups'}
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-500 text-base">Fetching latest updates...</span>
        </div>
      )}

      {!loading && standups.length === 0 && (
        <div className="text-center text-gray-400 text-lg mt-40">No standups submitted yet.</div>
      )}

      {!loading && standups.length > 0 && (
        <div className={`flex flex-col h-[410px] rounded-lg p-4 ${loading ? 'hidden' : ''} bg-white shadow-md overflow-y-auto gap-1 mt-2`}>
          {!loading &&
            standups.map(({ id, info, createdAt, today, blockers }) => (
              <div
                key={id}
                className="bg-white hover:border-black  border-white border-b transition-all duration-200 pb-2 w-[900px]" >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{info.name}</h3>
                    <p className="text-sm text-gray-500">{info.email}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {createdAt?.seconds
                      ? new Date(createdAt.seconds * 1000).toLocaleString()
                      : 'Just now'}
                  </p>
                </div>

                <div className="space-y-3 text-[15px]">
                  <div className="flex gap-2">
                    <span className="text-blue-600 font-medium">📌 Today:</span>
                    <span className="text-gray-700">{today}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-yellow-600 font-medium">⚠️ Blockers:</span>
                    <span className={blockers ? 'text-red-700' : 'text-gray-500 italic'}>
                      {blockers || 'No blockers reported'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>)}
    </div>
  );
};

export default StandupFeed;