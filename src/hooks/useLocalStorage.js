import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

// Custom hook for localStorage with React state synchronization
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook for managing projects
export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(storage.getProjects());
  }, []);

  const addProject = (project) => {
    const success = storage.saveProject(project);
    if (success) {
      setProjects(storage.getProjects());
    }
    return success;
  };

  const updateProject = (project) => {
    const success = storage.saveProject(project);
    if (success) {
      setProjects(storage.getProjects());
    }
    return success;
  };

  const deleteProject = (projectId) => {
    const success = storage.deleteProject(projectId);
    if (success) {
      setProjects(storage.getProjects());
    }
    return success;
  };

  const getProject = (projectId) => {
    return storage.getProject(projectId);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject
  };
}
