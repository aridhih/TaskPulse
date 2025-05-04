import React from 'react';
import { FaUserAlt, FaTasks, FaSearch } from 'react-icons/fa';

const SearchModel = ({ showResults, searchTerm, hasResults, filteredUsers, filteredTasks }) => {
  const noResults = filteredUsers.length === 0 && filteredTasks.length === 0;

  if (!showResults || !searchTerm || (!hasResults && !noResults)) return null;

  return (
    <div className="absolute top-[26px] left-0 right-0 mx-auto max-h-96 bg-white text-gray-800 shadow-2xl rounded-b-xl p-5 min-h-96 max-w-md overflow-y-auto z-50 transition-all duration-300 border-t-4 border-blue-500">
      {noResults ? (
        <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
          <FaSearch className="text-3xl mb-2" />
          <p className="text-sm font-medium">
            No results found for "<span className="italic">{searchTerm}</span>"
          </p>
          <p className="text-xs mt-1">Try refining your search.</p>
        </div>
      ) : (
        <div>
          {filteredUsers.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 font-semibold text-base text-blue-600 mb-3">
                <FaUserAlt className="text-sm" />
                Users
              </h2>
              {filteredUsers.map(user => (
                <div key={user.id} className="p-3 mb-2 bg-gray-50 hover:bg-blue-50 cursor-pointer rounded-lg shadow-sm transition-colors duration-200">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="mt-6">
              <h2 className="flex items-center gap-2 font-semibold text-base text-blue-600 mb-3">
                <FaTasks className="text-sm" />
                Tasks
              </h2>
              {filteredTasks.map(task => (
                <div key={task.id} className="p-3 mb-2 bg-gray-50 hover:bg-blue-50 rounded-lg shadow-sm transition-colors duration-200">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchModel;
