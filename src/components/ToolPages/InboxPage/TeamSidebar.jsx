import { MdGroups } from 'react-icons/md';

const TeamSidebar = ({ teams, selectedTeamId, onTeamSelect }) => {
  return (
    <div className="w-[29%] border-r overflow-y-auto">
      {teams.length === 0 ? (
        <p className="p-4 text-gray-500 italic">You are not part of any teams.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team.id}
            onClick={() => onTeamSelect(team.id)}
            className={`p-4 cursor-pointer text-black hover:bg-blue-100 ${
              selectedTeamId === team.id ? 'bg-blue-200 font-bold' : ''
            }`}
          >
            <MdGroups className="inline-block mr-2 w-5 h-5" />
            {team?.teamName || team?.name}
          </div>
        ))
      )}
    </div>
  );
};

export default TeamSidebar;
