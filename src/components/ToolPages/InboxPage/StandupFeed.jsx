import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../../firebase';

const StandupFeed = ({ teamId }) => {
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
    <div>
      {loading && (
        <div className="flex justify-center items-center h-[488px] ">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-500 text-base">Fetching latest updates...</span>
        </div>
      )}

      {!loading && standups.length === 0 && (
        <div className="text-center text-gray-400 text-lg h-[488px] ">No standups submitted yet.</div>
      )}

      {!loading && standups.length > 0 && (
        <div className={`flex flex-col border h-[488px] p-4 ${loading ? 'hidden' : ''} bg-white shadow-inner overflow-y-auto gap-1`}>
          {!loading &&
            standups.map(({ id, info, createdAt, today, blockers }) => (
              <div key={id} className="bg-gray-100 border border-gray-300 rounded-2xl px-6 py-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{info.name}</h3> <span className="text-sm text-gray-600">{info.email}</span>
                  </div>
                  <p className="text-xs text-gray-500">{createdAt?.seconds ? new Date(createdAt.seconds * 1000).toLocaleString() : 'Just now'}</p>
                </div>

                <div className="text-[15px] space-y-2">
                  <div className="flex gap-2">
                    <span className="text-blue-600 font-semibold">📌 Today:</span>
                    <span>{today}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-yellow-600 font-semibold">⚠️ Blockers:</span>
                    <span className={blockers ? 'text-red-700' : 'text-gray-500 italic'}>{blockers || 'No blockers reported'}</span>
                  </div>
                </div>
              </div>

            ))}
        </div>)}
    </div>
  );
};

export default StandupFeed;