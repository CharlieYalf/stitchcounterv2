import { useState, useCallback } from 'react';
import { storage } from '../utils/storage';

// Custom hook for counter functionality
export function useCounter(projectId, initialRow = 1, initialStitch = 0) {
  const [currentRow, setCurrentRow] = useState(initialRow);
  const [currentStitch, setCurrentStitch] = useState(initialStitch);
  const [isAnimating, setIsAnimating] = useState(false);

  // Increment stitch count
  const incrementStitch = useCallback(() => {
    setCurrentStitch(prev => {
      const newCount = prev + 1;
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
      
      // Save progress
      if (projectId) {
        storage.updateProjectProgress(projectId, currentRow, newCount);
      }
      
      return newCount;
    });
  }, [projectId, currentRow]);

  // Decrement stitch count
  const decrementStitch = useCallback(() => {
    setCurrentStitch(prev => {
      const newCount = Math.max(0, prev - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
      
      // Save progress
      if (projectId) {
        storage.updateProjectProgress(projectId, currentRow, newCount);
      }
      
      return newCount;
    });
  }, [projectId, currentRow]);

  // Move to next row
  const nextRow = useCallback((targetStitchCount) => {
    if (currentStitch >= targetStitchCount) {
      setCurrentRow(prev => prev + 1);
      setCurrentStitch(0);
      
      // Save progress
      if (projectId) {
        storage.updateProjectProgress(projectId, currentRow + 1, 0);
      }
      
      return true;
    }
    return false;
  }, [currentStitch, currentRow, projectId]);

  // Move to previous row
  const previousRow = useCallback(() => {
    if (currentRow > 1) {
      setCurrentRow(prev => prev - 1);
      setCurrentStitch(0);
      
      // Save progress
      if (projectId) {
        storage.updateProjectProgress(projectId, currentRow - 1, 0);
      }
    }
  }, [currentRow, projectId]);

  // Jump to specific row
  const jumpToRow = useCallback((rowNumber) => {
    setCurrentRow(rowNumber);
    setCurrentStitch(0);
    
    // Save progress
    if (projectId) {
      storage.updateProjectProgress(projectId, rowNumber, 0);
    }
  }, [projectId]);

  // Reset current row
  const resetCurrentRow = useCallback(() => {
    setCurrentStitch(0);
    
    // Save progress
    if (projectId) {
      storage.updateProjectProgress(projectId, currentRow, 0);
    }
  }, [currentRow, projectId]);

  // Reset entire project
  const resetProject = useCallback(() => {
    setCurrentRow(1);
    setCurrentStitch(0);
    
    // Save progress
    if (projectId) {
      storage.updateProjectProgress(projectId, 1, 0);
    }
  }, [projectId]);

  // Add save point
  const addSavePoint = useCallback(() => {
    if (projectId) {
      storage.addSavePoint(projectId, currentRow, currentStitch);
    }
  }, [projectId, currentRow, currentStitch]);

  // Load from save point
  const loadFromSavePoint = useCallback((savePoint) => {
    setCurrentRow(savePoint.row);
    setCurrentStitch(savePoint.stitch);
    
    // Save progress
    if (projectId) {
      storage.updateProjectProgress(projectId, savePoint.row, savePoint.stitch);
    }
  }, [projectId]);

  return {
    currentRow,
    currentStitch,
    isAnimating,
    incrementStitch,
    decrementStitch,
    nextRow,
    previousRow,
    jumpToRow,
    resetCurrentRow,
    resetProject,
    addSavePoint,
    loadFromSavePoint
  };
}
