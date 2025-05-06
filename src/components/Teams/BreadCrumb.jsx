const Breadcrumb = ({ selectedTeam, selectedProject, onBackToTeams, onBackToProjects }) => (
    <div className="text-gray-600 ml-2">
     
      {selectedTeam && (
        <>
         <span className="text-blue-600 cursor-pointer" onClick={onBackToTeams}>Teams</span>
          <span> &gt; </span>
          <span className="text-blue-600 cursor-pointer" onClick={onBackToProjects}>{selectedTeam.teamName}</span>
        </>
      )}
      {selectedProject && (
        <>
          <span> &gt; {selectedProject.projectName}</span>
        </>
      )}
    </div>
  );
  
  export default Breadcrumb;
  