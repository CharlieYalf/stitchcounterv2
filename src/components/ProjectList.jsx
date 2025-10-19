import { useState } from 'react';
import { useProjects } from '../hooks/useLocalStorage';
import { patternTemplates, craftTypes } from '../utils/templates';
import './ProjectList.css';

export default function ProjectList({ onSelectProject, onCreateProject, onStartFreestyle }) {
  const { projects, deleteProject } = useProjects();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    craftType: 'crochet',
    template: 'blankTemplate'
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const project = {
      id: crypto.randomUUID(),
      name: newProject.name.trim(),
      craftType: newProject.craftType,
      pattern: patternTemplates[newProject.template],
      currentRow: 1,
      currentStitch: 0,
      savePoints: [],
      lastModified: new Date().toISOString()
    };

    onCreateProject(project);
    setShowCreateForm(false);
    setNewProject({ name: '', craftType: 'crochet', template: 'blankTemplate' });
  };

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProjectProgress = (project) => {
    if (!project.pattern?.rows?.length) return 'No pattern';
    
    const totalRows = project.pattern.rows.length;
    const currentRow = project.currentRow || 1;
    const progress = Math.round((currentRow / totalRows) * 100);
    
    return `Row ${currentRow} of ${totalRows} (${progress}%)`;
  };

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>Stitch Counter</h1>
        <p>Track your crochet and fiber craft projects</p>
      </div>

      <div className="project-actions">
        <button 
          className="action-button primary"
          onClick={() => setShowCreateForm(true)}
        >
          + New Project
        </button>
        <button 
          className="action-button secondary"
          onClick={onStartFreestyle}
        >
          Freestyle Count
        </button>
      </div>

      {/* Projects list */}
      <div className="projects-list">
        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet</p>
            <p>Create your first project to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id}
              className="project-card"
              onClick={() => onSelectProject(project)}
            >
              <div className="project-card-content">
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-craft-type">{project.craftType}</p>
                  <p className="project-progress">{getProjectProgress(project)}</p>
                  <p className="project-date">
                    Last modified: {formatDate(project.lastModified)}
                  </p>
                </div>
                <div className="project-actions">
                  <button 
                    className="delete-button"
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    aria-label="Delete project"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create project form */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input
                  id="project-name"
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="craft-type">Craft Type</label>
                <select
                  id="craft-type"
                  value={newProject.craftType}
                  onChange={(e) => setNewProject({...newProject, craftType: e.target.value})}
                >
                  {craftTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="template">Start With Template</label>
                <div className="template-selector">
                  <select
                    id="template"
                    value={newProject.template}
                    onChange={(e) => setNewProject({...newProject, template: e.target.value})}
                  >
                    {Object.entries(patternTemplates).map(([key, template]) => (
                      <option key={key} value={key}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    className="view-templates-button"
                    onClick={() => setShowTemplates(true)}
                  >
                    View Templates
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="create-button"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template preview */}
      {showTemplates && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Pattern Templates</h2>
            <div className="templates-grid">
              {Object.entries(patternTemplates).map(([key, template]) => (
                <div key={key} className="template-card">
                  <div className="template-header">
                    <h3>{template.name}</h3>
                    <div className="template-meta">
                      <span className="difficulty">{template.difficulty}</span>
                      <span className="time">{template.estimatedTime}</span>
                    </div>
                  </div>
                  <p className="template-description">{template.description}</p>
                  <p className="template-visual">{template.visualDescription}</p>
                  <div className="template-footer">
                    <span className="template-rows">
                      {template.rows.length} rows
                    </span>
                    <span className="template-craft">{template.craftType}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="close-button"
              onClick={() => setShowTemplates(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
