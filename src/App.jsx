import { useState } from 'react';
import { useProjects } from './hooks/useLocalStorage';
import ProjectList from './components/ProjectList';
import Counter from './components/Counter';
import PatternEditor from './components/PatternEditor';
import TemplateBuilder from './components/TemplateBuilder';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingPattern, setEditingPattern] = useState(null);
  const { addProject, updateProject } = useProjects();

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setCurrentView('counter');
  };

  const handleStartFreestyle = () => {
    setSelectedProject(null);
    setCurrentView('counter');
  };

  const handleCreateProject = (project) => {
    addProject(project);
    setSelectedProject(project);
    setCurrentView('counter');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
    setEditingPattern(null);
  };

  const handleEditPattern = () => {
    setEditingPattern(selectedProject);
    setCurrentView('pattern-editor');
  };

  const handleSavePattern = (updatedPattern) => {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        pattern: updatedPattern
      };
      updateProject(updatedProject);
      setSelectedProject(updatedProject);
    }
    setEditingPattern(null);
    setCurrentView('counter');
  };

  const handleCancelEdit = () => {
    setEditingPattern(null);
    setCurrentView('counter');
  };

  const handleManageTemplates = () => {
    setCurrentView('template-builder');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'projects':
        return (
          <ProjectList
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onStartFreestyle={handleStartFreestyle}
            onManageTemplates={handleManageTemplates}
          />
        );
      
      case 'counter':
        return (
          <Counter
            project={selectedProject}
            onBack={handleBackToProjects}
            onEditPattern={handleEditPattern}
          />
        );
      
      case 'pattern-editor':
        return (
          <PatternEditor
            pattern={editingPattern?.pattern}
            onSave={handleSavePattern}
            onCancel={handleCancelEdit}
          />
        );
      
      case 'template-builder':
        return (
          <TemplateBuilder
            onClose={() => setCurrentView('projects')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  );
}

export default App;