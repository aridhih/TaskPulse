import React from 'react';

const Breadcrumb = ({ selectedTeam, onBack }) => (
    <div className="mb-4 text-gray-600">
        {selectedTeam ? (
            <>
                <span className="text-blue-600 cursor-pointer" onClick={onBack}>Teams</span>
                <span> &gt; {selectedTeam.teamName}</span>
            </>
        ) : null}
    </div>
);

export default Breadcrumb;
