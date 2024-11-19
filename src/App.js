import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';  

import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetail';  
import NewProjectForm from './components/NewProjectForm';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/UserProfile';


function App() {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    newProject.id = uuidv4();
    newProject.tasks = [];
    setProjects([...projects, newProject]);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const editProject = (projectId, updatedProject) => {
    setProjects(projects.map(project => project.id === projectId ? updatedProject : project));
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/projects">PiMP</Link>
          <div class="btn-control">
            <Link className="btn btn-info mr-2" to="/projects">View Project List</Link>
            <Link className="btn btn-success mr-2" to="/new">Create New Project</Link>
            <Link className="btn btn-secondary mr-2" to="/profile">Profile</Link>
            <Link className="btn btn-danger mr-2" to="/">Exit</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projects" element={<ProjectList projects={projects} />} />
        <Route path="/project/:id" element={<ProjectDetails projects={projects} setProjects={setProjects} deleteProject={deleteProject} editProject={editProject} />} />
        <Route path="/new" element={<NewProjectForm onAddProject={addProject} />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<Navigate replace to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
