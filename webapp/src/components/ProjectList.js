import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ProjectList.css';

function ProjectList({ projects, setProjects }) {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="project-list-container">
      <input
        type="text"
        placeholder="Filter projects by name..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <div className="project-list">
        {filteredProjects.map(project => (
          <div key={project.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{project.name}</h5>
              <p className="card-text">{project.description}</p>
              <p className="card-text"><small className="text-muted">Priority: {project.priority}</small></p>
              <button 
                onClick={() => handleViewDetails(project.id)}
                className="btn btn-primary">
                View Details
              </button>
              {/* <button 
                onClick={() => handleDeleteProject(project.id)}
                className="btn btn-danger">
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
