import { useState, useEffect } from 'react';
import { stitchTypes } from '../utils/templates';
import { blockManager, blockTypes, blockCategories } from '../utils/blocks';
import './BlockEditor.css';

export default function BlockEditor({ block, onSave, onCancel }) {
  const [editedBlock, setEditedBlock] = useState({
    name: '',
    type: 'custom',
    category: 'custom',
    description: '',
    rows: []
  });
  const [editingRow, setEditingRow] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (block) {
      setEditedBlock(block);
    } else {
      // Initialize with default values for new block
      setEditedBlock({
        name: '',
        type: 'custom',
        category: 'custom',
        description: '',
        rows: [{
          rowNumber: 1,
          stitchCount: 0,
          stitchTypes: [],
          colorChange: false,
          notes: '',
          repeat: 1
        }]
      });
    }
  }, [block]);

  const addRow = () => {
    const newRowNumber = editedBlock.rows.length + 1;
    const newRow = {
      rowNumber: newRowNumber,
      stitchCount: 0,
      stitchTypes: [],
      colorChange: false,
      notes: '',
      repeat: 1
    };
    
    setEditedBlock({
      ...editedBlock,
      rows: [...editedBlock.rows, newRow]
    });
    setEditingRow(newRowNumber);
  };

  const updateRow = (rowNumber, field, value) => {
    setEditedBlock({
      ...editedBlock,
      rows: editedBlock.rows.map(row => 
        row.rowNumber === rowNumber 
          ? { ...row, [field]: value }
          : row
      )
    });
  };

  const deleteRow = (rowNumber) => {
    if (editedBlock.rows.length <= 1) return;
    
    setEditedBlock({
      ...editedBlock,
      rows: editedBlock.rows
        .filter(row => row.rowNumber !== rowNumber)
        .map((row, index) => ({ ...row, rowNumber: index + 1 }))
    });
  };

  const addStitchType = (rowNumber, stitchType) => {
    const row = editedBlock.rows.find(r => r.rowNumber === rowNumber);
    if (row && !row.stitchTypes.includes(stitchType)) {
      updateRow(rowNumber, 'stitchTypes', [...row.stitchTypes, stitchType]);
    }
  };

  const removeStitchType = (rowNumber, stitchType) => {
    const row = editedBlock.rows.find(r => r.rowNumber === rowNumber);
    if (row) {
      updateRow(rowNumber, 'stitchTypes', row.stitchTypes.filter(st => st !== stitchType));
    }
  };

  const handleSave = () => {
    // Validate block data
    const validation = blockManager.validateBlock(editedBlock);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors and save
    setErrors([]);
    onSave(editedBlock);
  };

  const handleFieldChange = (field, value) => {
    setEditedBlock({
      ...editedBlock,
      [field]: value
    });
  };

  return (
    <div className="block-editor">
      <div className="block-editor-header">
        <h2>{block ? 'Edit Block' : 'Create New Block'}</h2>
        <div className="block-editor-actions">
          <button 
            className="add-row-button"
            onClick={addRow}
          >
            + Add Row
          </button>
        </div>
      </div>

      {/* Error display */}
      {errors.length > 0 && (
        <div className="error-messages">
          <h4>Please fix the following errors:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Block metadata */}
      <div className="block-metadata">
        <div className="form-group">
          <label htmlFor="block-name">Block Name</label>
          <input
            id="block-name"
            type="text"
            value={editedBlock.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter block name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="block-type">Block Type</label>
          <select
            id="block-type"
            value={editedBlock.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
          >
            {blockTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="block-category">Category</label>
          <select
            id="block-category"
            value={editedBlock.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
          >
            {blockCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="block-description">Description</label>
          <textarea
            id="block-description"
            value={editedBlock.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Describe what this block does..."
            rows="3"
          />
        </div>

        {/* Future expansion placeholder */}
        <div className="future-features">
          <h4>Future Features (Coming Soon)</h4>
          <div className="disabled-features">
            <div className="form-group disabled">
              <label>Formula (Disabled)</label>
              <input
                type="text"
                disabled
                placeholder="e.g., stitchCount * 2"
              />
              <small>Formulas will allow dynamic stitch counts based on variables</small>
            </div>
            <div className="form-group disabled">
              <label>Variables (Disabled)</label>
              <input
                type="text"
                disabled
                placeholder="e.g., baseStitches, increaseRate"
              />
              <small>Variables will make blocks reusable with different parameters</small>
            </div>
          </div>
        </div>
      </div>

      {/* Block rows */}
      <div className="block-rows">
        <h3>Block Rows</h3>
        {editedBlock.rows.map((row) => (
          <div key={row.rowNumber} className="block-row">
            <div className="row-header">
              <h4>Row {row.rowNumber}</h4>
              <div className="row-actions">
                <button 
                  className="edit-button"
                  onClick={() => setEditingRow(editingRow === row.rowNumber ? null : row.rowNumber)}
                >
                  {editingRow === row.rowNumber ? 'Done' : 'Edit'}
                </button>
                {editedBlock.rows.length > 1 && (
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
                    placeholder="Add instructions for this row..."
                    rows="2"
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

      <div className="block-editor-footer">
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
          {block ? 'Update Block' : 'Create Block'}
        </button>
      </div>
    </div>
  );
}
