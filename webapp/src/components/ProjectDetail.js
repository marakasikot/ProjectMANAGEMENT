import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/ProjectDetails.css';



function ProjectDetails({ projects, setProjects, deleteProject, editProject }) {
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [taskName, setTaskName] = useState('');
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.id === projectId);

  const handleEdit = () => {
    setEditMode(true);
    setEditedProject({ ...project });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, ...editedProject } : p));
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    setProjects(projects.filter(p => p.id !== projectId));
    navigate('/projects');
  };

  const handleAddTask = () => {
    if (!taskName) return; // Не добавляем пустые задачи
    const updatedProject = {
      ...project,
      tasks: [...project.tasks, { id: Date.now(), name: taskName, status: 'Pending' }]
    };
    setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
    setTaskName(''); // Сброс поля ввода после добавления
  };

  if (!project) {
    return <p>Project not found!</p>;
  }

  return (
    <div className="project-details">
      {editMode ? (
        <div>
          <input type="text" name="name" value={editedProject.name} onChange={handleInputChange} />
          <textarea name="description" value={editedProject.description} onChange={handleInputChange} />
          <input type="date" name="startDate" value={editedProject.startDate} onChange={handleInputChange} />
          <input type="date" name="endDate" value={editedProject.endDate} onChange={handleInputChange} />
          <select name="priority" value={editedProject.priority} onChange={handleInputChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          {project.startDate && <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>}
          {project.endDate && <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>}
          <p>Priority: {project.priority}</p>
          <div>
            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="New Task Name" />
            <button class="btn-addtask"onClick={handleAddTask}>Add Task</button>
          </div>
          {project.tasks && project.tasks.length > 0 ? (
            <ul>
              {project.tasks.map(task => <li key={task.id}>{task.name}</li>)}
            </ul>
          ) : <p>No tasks added yet.</p>}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
