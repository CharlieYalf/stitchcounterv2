// localStorage utilities for data persistence

const STORAGE_KEY = 'stitchCounterApp';

export const storage = {
  // Get all data from localStorage
  getData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { projects: [] };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { projects: [] };
    }
  },

  // Save all data to localStorage
  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get all projects
  getProjects() {
    const data = this.getData();
    return data.projects || [];
  },

  // Save a project
  saveProject(project) {
    const data = this.getData();
    const existingIndex = data.projects.findIndex(p => p.id === project.id);
    
    if (existingIndex >= 0) {
      data.projects[existingIndex] = { ...project, lastModified: new Date().toISOString() };
    } else {
      data.projects.push({ ...project, lastModified: new Date().toISOString() });
    }
    
    return this.saveData(data);
  },

  // Delete a project
  deleteProject(projectId) {
    const data = this.getData();
    data.projects = data.projects.filter(p => p.id !== projectId);
    return this.saveData(data);
  },

  // Get a specific project
  getProject(projectId) {
    const projects = this.getProjects();
    return projects.find(p => p.id === projectId);
  },

  // Update project progress
  updateProjectProgress(projectId, currentRow, currentStitch) {
    const project = this.getProject(projectId);
    if (!project) return false;

    project.currentRow = currentRow;
    project.currentStitch = currentStitch;
    return this.saveProject(project);
  },

  // Add a save point
  addSavePoint(projectId, row, stitch) {
    const project = this.getProject(projectId);
    if (!project) return false;

    const savePoint = {
      row,
      stitch,
      timestamp: new Date().toISOString()
    };

    project.savePoints = project.savePoints || [];
    project.savePoints.push(savePoint);
    
    // Keep only the last 10 save points
    if (project.savePoints.length > 10) {
      project.savePoints = project.savePoints.slice(-10);
    }

    return this.saveProject(project);
  },

  // Get the most recent save point
  getLatestSavePoint(projectId) {
    const project = this.getProject(projectId);
    if (!project || !project.savePoints || project.savePoints.length === 0) {
      return null;
    }
    
    return project.savePoints[project.savePoints.length - 1];
  },

  // Custom blocks storage
  getCustomBlocks() {
    try {
      const stored = localStorage.getItem('stitchCounter_customBlocks');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading custom blocks:', error);
      return {};
    }
  },

  saveCustomBlocks(blocks) {
    try {
      localStorage.setItem('stitchCounter_customBlocks', JSON.stringify(blocks));
      return true;
    } catch (error) {
      console.error('Error saving custom blocks:', error);
      return false;
    }
  },

  // Custom templates storage
  getCustomTemplates() {
    try {
      const stored = localStorage.getItem('stitchCounter_customTemplates');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading custom templates:', error);
      return {};
    }
  },

  saveCustomTemplates(templates) {
    try {
      localStorage.setItem('stitchCounter_customTemplates', JSON.stringify(templates));
      return true;
    } catch (error) {
      console.error('Error saving custom templates:', error);
      return false;
    }
  }
};
