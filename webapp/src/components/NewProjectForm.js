import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавляем нужный импорт
import '../style/NewProjectForm.css';

function NewProjectForm({ onAddProject }) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectPriority, setProjectPriority] = useState('Medium');
  const navigate = useNavigate(); // Убеждаемся, что navigate используется после его импорта

  const handleSubmit = (event) => {
    event.preventDefault();
    // Валидация дат 
    if (new Date(projectStartDate) > new Date(projectEndDate)) {
      alert('Start Date must be earlier than End Date.');
      return;
    }
    onAddProject({
      name: projectName,
      description: projectDesc,
      startDate: projectStartDate,
      endDate: projectEndDate,
      priority: projectPriority,
    });
    alert('Project Created Successfully'); 
    navigate('/projects'); // Редирект обратно к списку проектов
  };

  return (
    <div class="newprojform">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          className="form-control"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectDesc">Project Description</label>
        <textarea
          className="form-control"
          id="projectDesc"
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectStartDate">Start Date</label>
        <input
          type="date"
          className="form-control"
          id="projectStartDate"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectEndDate">End Date</label>
        <input
          type="date"
          className="form-control"
          id="projectEndDate"
          value={projectEndDate}
          onChange={(e) => setProjectEndDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectPriority">Priority</label>
        <select
          className="form-control"
          id="projectPriority"
          value={projectPriority}
          onChange={(e) => setProjectPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">Create Project</button>
    </form>
    </div>
  );
}

export default NewProjectForm;
