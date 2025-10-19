import { useState, useEffect } from 'react';
import { stitchTypes } from '../utils/templates';
import './PatternEditor.css';

export default function PatternEditor({ pattern, onSave, onCancel }) {
  const [editedPattern, setEditedPattern] = useState(pattern || { rows: [] });
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    if (pattern) {
      setEditedPattern(pattern);
    }
  }, [pattern]);

  const addRow = () => {
    const newRowNumber = editedPattern.rows.length + 1;
    const newRow = {
      rowNumber: newRowNumber,
      stitchCount: 0,
      stitchTypes: [],
      colorChange: false,
      notes: '',
      repeat: 1
    };
    
    setEditedPattern({
      ...editedPattern,
      rows: [...editedPattern.rows, newRow]
    });
    setEditingRow(newRowNumber);
  };

  const updateRow = (rowNumber, field, value) => {
    setEditedPattern({
      ...editedPattern,
      rows: editedPattern.rows.map(row => 
        row.rowNumber === rowNumber 
          ? { ...row, [field]: value }
          : row
      )
    });
  };

  const deleteRow = (rowNumber) => {
    if (editedPattern.rows.length <= 1) return;
    
    setEditedPattern({
      ...editedPattern,
      rows: editedPattern.rows
        .filter(row => row.rowNumber !== rowNumber)
        .map((row, index) => ({ ...row, rowNumber: index + 1 }))
    });
  };

  const addStitchType = (rowNumber, stitchType) => {
    const row = editedPattern.rows.find(r => r.rowNumber === rowNumber);
    if (row && !row.stitchTypes.includes(stitchType)) {
      updateRow(rowNumber, 'stitchTypes', [...row.stitchTypes, stitchType]);
    }
  };

  const removeStitchType = (rowNumber, stitchType) => {
    const row = editedPattern.rows.find(r => r.rowNumber === rowNumber);
    if (row) {
      updateRow(rowNumber, 'stitchTypes', row.stitchTypes.filter(st => st !== stitchType));
    }
  };

  const handleSave = () => {
    onSave(editedPattern);
  };

  return (
    <div className="pattern-editor">
      <div className="pattern-editor-header">
        <h2>Edit Pattern</h2>
        <div className="pattern-editor-actions">
          <button 
            className="add-row-button"
            onClick={addRow}
          >
            + Add Row
          </button>
        </div>
      </div>

      <div className="pattern-rows">
        {editedPattern.rows.map((row) => (
          <div key={row.rowNumber} className="pattern-row">
            <div className="row-header">
              <h3>Row {row.rowNumber}</h3>
              <div className="row-actions">
                <button 
                  className="edit-button"
                  onClick={() => setEditingRow(editingRow === row.rowNumber ? null : row.rowNumber)}
                >
                  {editingRow === row.rowNumber ? 'Done' : 'Edit'}
                </button>
                {editedPattern.rows.length > 1 && (
                  <button 
                    className="delete-button"
                    onClick={() => deleteRow(row.rowNumber)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            {editingRow === row.rowNumber ? (
              <div className="row-editor">
                <div className="form-group">
                  <label>Stitch Count</label>
                  <input
                    type="number"
                    value={row.stitchCount}
                    onChange={(e) => updateRow(row.rowNumber, 'stitchCount', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stitch Types</label>
                  <div className="stitch-types-selector">
                    {stitchTypes.map(stitchType => (
                      <button
                        key={stitchType}
                        className={`stitch-type-button ${row.stitchTypes.includes(stitchType) ? 'selected' : ''}`}
                        onClick={() => 
                          row.stitchTypes.includes(stitchType)
                            ? removeStitchType(row.rowNumber, stitchType)
                            : addStitchType(row.rowNumber, stitchType)
                        }
                      >
                        {stitchType}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={row.colorChange}
                      onChange={(e) => updateRow(row.rowNumber, 'colorChange', e.target.checked)}
                    />
                    Color Change
                  </label>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={row.notes}
                    onChange={(e) => updateRow(row.rowNumber, 'notes', e.target.value)}
                    placeholder="Add any special instructions for this row..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Repeat</label>
                  <input
                    type="number"
                    value={row.repeat}
                    onChange={(e) => updateRow(row.rowNumber, 'repeat', parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              </div>
            ) : (
              <div className="row-display">
                <div className="row-info">
                  <span className="stitch-count">{row.stitchCount} stitches</span>
                  {row.stitchTypes.length > 0 && (
                    <span className="stitch-types">
                      {row.stitchTypes.join(', ')}
                    </span>
                  )}
                  {row.colorChange && (
                    <span className="color-change">Color Change</span>
                  )}
                  {row.repeat > 1 && (
                    <span className="repeat">Repeat {row.repeat} times</span>
                  )}
                </div>
                {row.notes && (
                  <p className="row-notes">{row.notes}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pattern-editor-footer">
        <button 
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="save-button"
          onClick={handleSave}
        >
          Save Pattern
        </button>
      </div>
    </div>
  );
}
