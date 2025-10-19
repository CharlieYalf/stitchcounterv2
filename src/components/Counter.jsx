import { useState, useEffect } from 'react';
import { useCounter } from '../hooks/useCounter';
import { storage } from '../utils/storage';
import './Counter.css';

export default function Counter({ project, onBack, onSavePoint, onJumpToRow }) {
  const {
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
  } = useCounter(project?.id, project?.currentRow || 1, project?.currentStitch || 0);

  const [showControls, setShowControls] = useState(false);
  const [showSavePoints, setShowSavePoints] = useState(false);
  const [showJumpToRow, setShowJumpToRow] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);

  // Get current row data
  const currentRowData = project?.pattern?.rows?.find(row => row.rowNumber === currentRow);
  const targetStitchCount = currentRowData?.stitchCount || 0;
  const isRowComplete = currentStitch >= targetStitchCount && targetStitchCount > 0;

  // Handle tap zones
  const handleTopTap = () => {
    if (isRowComplete && targetStitchCount > 0) {
      nextRow(targetStitchCount);
    } else {
      incrementStitch();
    }
  };

  const handleBottomTap = () => {
    decrementStitch();
  };

  // Handle long press for controls
  const handleLongPress = (action) => {
    setShowControls(true);
  };

  // Auto-advance to next row when target is reached
  useEffect(() => {
    if (isRowComplete && targetStitchCount > 0) {
      const timer = setTimeout(() => {
        nextRow(targetStitchCount);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRowComplete, targetStitchCount, nextRow]);

  // Update project progress and reload project data
  useEffect(() => {
    if (project?.id) {
      storage.updateProjectProgress(project.id, currentRow, currentStitch);
      // Reload project to get updated save points
      const updatedProject = storage.getProject(project.id);
      if (updatedProject) {
        setCurrentProject(updatedProject);
      }
    }
  }, [project?.id, currentRow, currentStitch]);

  // Handle adding save point
  const handleAddSavePoint = () => {
    addSavePoint();
    // Reload project to show new save point
    if (project?.id) {
      const updatedProject = storage.getProject(project.id);
      if (updatedProject) {
        setCurrentProject(updatedProject);
      }
    }
  };

  return (
    <div className="counter-container">
      {/* Header with project info and controls */}
      <div className="counter-header">
        <button 
          className="back-button"
          onClick={onBack}
          aria-label="Back to projects"
        >
          ← Back
        </button>
        <div className="project-info">
          <h2 className="project-name">{project?.name || 'Freestyle'}</h2>
          <p className="craft-type">{project?.craftType || 'crochet'}</p>
        </div>
        <button 
          className="controls-button"
          onClick={() => setShowControls(!showControls)}
          aria-label="Show controls"
        >
          ⋮
        </button>
      </div>

      {/* Row navigation controls */}
      <div className="row-navigation">
        <button 
          className="nav-button prev-row"
          onClick={previousRow}
          disabled={currentRow <= 1}
          aria-label="Previous row"
        >
          ← Prev Row
        </button>
        <div className="row-info">
          <span className="row-label">Row {currentRow}</span>
          {currentRowData && (
            <span className="row-target">
              / {targetStitchCount} stitches
            </span>
          )}
        </div>
        <button 
          className="nav-button next-row"
          onClick={() => nextRow(targetStitchCount)}
          aria-label="Next row"
        >
          Next Row →
        </button>
      </div>

      {/* Main counter display */}
      <div className="counter-display">
        <div className={`stitch-count ${isAnimating ? 'animating' : ''} ${isRowComplete ? 'complete' : ''}`}>
          {currentStitch}
        </div>
      </div>

      {/* Row instructions - separated from counter */}
      {currentRowData && (
        <div className="row-instructions-panel">
          <div className="stitch-types">
            {currentRowData.stitchTypes.join(', ')}
          </div>
          <div className="row-notes">{currentRowData.notes}</div>
          {currentRowData.colorChange && (
            <span className="color-change-indicator">Color Change</span>
          )}
        </div>
      )}

      {/* Progress bar */}
      {targetStitchCount > 0 && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min(100, (currentStitch / targetStitchCount) * 100)}%` 
              }}
            />
          </div>
          <span className="progress-text">
            {currentStitch} / {targetStitchCount}
          </span>
        </div>
      )}

      {/* Tap zones for one-handed operation */}
      <div className="tap-zones">
        <button 
          className="tap-zone tap-zone-top"
          onClick={handleTopTap}
          onTouchStart={(e) => {
            e.preventDefault();
            handleTopTap();
          }}
          aria-label="Increment stitch count"
        >
          <span className="tap-zone-label tap-zone-label-top">+</span>
        </button>
        
        <button 
          className="tap-zone tap-zone-bottom"
          onClick={handleBottomTap}
          onTouchStart={(e) => {
            e.preventDefault();
            handleBottomTap();
          }}
          aria-label="Decrement stitch count"
        >
          <span className="tap-zone-label tap-zone-label-bottom">-</span>
        </button>
      </div>

      {/* Controls panel */}
      {showControls && (
        <div className="controls-panel">
          <div className="controls-content">
            <h3>Controls</h3>
            
            <div className="control-group">
              <button 
                className="control-button"
                onClick={() => setShowSavePoints(!showSavePoints)}
              >
                Save Points
              </button>
              <button 
                className="control-button"
                onClick={() => setShowJumpToRow(!showJumpToRow)}
              >
                Jump to Row
              </button>
            </div>

            <div className="control-group">
              <button 
                className="control-button"
                onClick={handleAddSavePoint}
              >
                Add Save Point
              </button>
              <button 
                className="control-button"
                onClick={resetCurrentRow}
              >
                Reset Row
              </button>
            </div>

            <div className="control-group">
              <button 
                className="control-button"
                onClick={resetProject}
              >
                Reset Project
              </button>
              <button 
                className="control-button"
                onClick={() => setShowControls(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save points panel */}
      {showSavePoints && (
        <div className="save-points-panel">
          <div className="save-points-content">
            <h3>Save Points</h3>
            {currentProject?.savePoints?.length > 0 ? (
              <div className="save-points-list">
                {currentProject.savePoints.map((savePoint, index) => (
                  <button
                    key={index}
                    className="save-point-item"
                    onClick={() => {
                      loadFromSavePoint(savePoint);
                      setShowSavePoints(false);
                    }}
                  >
                    <span>Row {savePoint.row}, Stitch {savePoint.stitch}</span>
                    <span className="save-point-time">
                      {new Date(savePoint.timestamp).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p>No save points yet</p>
            )}
            <button 
              className="control-button"
              onClick={() => setShowSavePoints(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Jump to row panel */}
      {showJumpToRow && (
        <div className="jump-to-row-panel">
          <div className="jump-to-row-content">
            <h3>Jump to Row</h3>
            <div className="row-selector">
              {project?.pattern?.rows?.map((row) => (
                <button
                  key={row.rowNumber}
                  className={`row-option ${row.rowNumber === currentRow ? 'current' : ''}`}
                  onClick={() => {
                    jumpToRow(row.rowNumber);
                    setShowJumpToRow(false);
                  }}
                >
                  Row {row.rowNumber}
                </button>
              ))}
            </div>
            <button 
              className="control-button"
              onClick={() => setShowJumpToRow(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
