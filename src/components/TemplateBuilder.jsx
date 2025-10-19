import { useState, useEffect } from 'react';
import { blockManager, templateManager } from '../utils/blocks';
import { exportTemplate, importTemplate, validateTemplate } from '../utils/templates';
import { craftTypes } from '../utils/templates';
import BlockLibrary from './BlockLibrary';
import BlockEditor from './BlockEditor';
import './TemplateBuilder.css';

export default function TemplateBuilder({ onClose }) {
  const [currentView, setCurrentView] = useState('builder'); // 'builder', 'library', 'editor'
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [templatePreview, setTemplatePreview] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [errors, setErrors] = useState([]);

  const [templateMetadata, setTemplateMetadata] = useState({
    name: '',
    craftType: 'crochet',
    description: '',
    visualDescription: '',
    difficulty: 'Beginner',
    estimatedTime: ''
  });

  useEffect(() => {
    updateTemplatePreview();
  }, [selectedBlocks]);

  const updateTemplatePreview = () => {
    if (selectedBlocks.length === 0) {
      setTemplatePreview(null);
      return;
    }

    const preview = templateManager.buildTemplateFromBlocks(selectedBlocks, {
      ...templateMetadata,
      rows: [] // Will be populated by buildTemplateFromBlocks
    });
    setTemplatePreview(preview);
  };

  const handleSelectBlock = (block) => {
    setSelectedBlocks([...selectedBlocks, block.id]);
    setShowLibrary(false);
  };

  const handleRemoveBlock = (blockIndex) => {
    const newBlocks = selectedBlocks.filter((_, index) => index !== blockIndex);
    setSelectedBlocks(newBlocks);
  };

  const handleReorderBlocks = (fromIndex, toIndex) => {
    const newBlocks = [...selectedBlocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setSelectedBlocks(newBlocks);
  };

  const handleEditBlock = (blockId) => {
    if (blockId) {
      const block = blockManager.getBlockById(blockId);
      setEditingBlock(block);
    } else {
      setEditingBlock(null);
    }
    setCurrentView('editor');
  };

  const handleSaveBlock = (blockData) => {
    if (editingBlock) {
      // Update existing block
      const updatedBlock = blockManager.updateBlock(editingBlock.id, blockData);
      if (updatedBlock) {
        // Update the block in selectedBlocks if it's being used
        const blockIndex = selectedBlocks.findIndex(id => id === editingBlock.id);
        if (blockIndex !== -1) {
          const newSelectedBlocks = [...selectedBlocks];
          newSelectedBlocks[blockIndex] = updatedBlock.id;
          setSelectedBlocks(newSelectedBlocks);
        }
      }
    } else {
      // Create new block
      const newBlock = blockManager.createBlock(blockData);
      if (newBlock) {
        setSelectedBlocks([...selectedBlocks, newBlock.id]);
      }
    }
    setCurrentView('builder');
    setEditingBlock(null);
  };

  const handleCancelEdit = () => {
    setCurrentView('builder');
    setEditingBlock(null);
  };

  const handleSaveTemplate = () => {
    if (!templateMetadata.name.trim()) {
      setErrors(['Template name is required']);
      return;
    }

    if (selectedBlocks.length === 0) {
      setErrors(['Template must have at least one block']);
      return;
    }

    const template = templateManager.buildTemplateFromBlocks(selectedBlocks, templateMetadata);
    const validation = validateTemplate(template);
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const savedTemplate = templateManager.createTemplate(template);
    if (savedTemplate) {
      alert('Template saved successfully!');
      setShowSaveForm(false);
      setTemplateMetadata({
        name: '',
        craftType: 'crochet',
        description: '',
        visualDescription: '',
        difficulty: 'Beginner',
        estimatedTime: ''
      });
      setSelectedBlocks([]);
      setErrors([]);
    } else {
      setErrors(['Failed to save template']);
    }
  };

  const handleExportTemplate = () => {
    if (!templatePreview) {
      alert('No template to export');
      return;
    }

    const filename = `${templateMetadata.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.sct`;
    exportTemplate(templatePreview, filename);
  };

  const handleImportTemplate = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    importTemplate(file)
      .then(result => {
        if (result.type === 'single') {
          // TODO: Handle single template import
          alert('Single template import coming soon!');
        } else if (result.type === 'multiple') {
          // TODO: Handle multiple templates import
          alert('Multiple templates import coming soon!');
        }
        setShowImportForm(false);
      })
      .catch(error => {
        alert(`Import failed: ${error.message}`);
      });
  };

  const getBlockInfo = (blockId) => {
    return blockManager.getBlockById(blockId);
  };

  const renderBuilder = () => (
    <div className="template-builder">
      <div className="builder-header">
        <h2>Template Builder</h2>
        <div className="builder-actions">
          <button 
            className="action-button secondary"
            onClick={() => setShowImportForm(true)}
          >
            Import Template
          </button>
          <button 
            className="action-button primary"
            onClick={() => setShowSaveForm(true)}
            disabled={selectedBlocks.length === 0}
          >
            Save Template
          </button>
          <button 
            className="action-button"
            onClick={handleExportTemplate}
            disabled={!templatePreview}
          >
            Export Template
          </button>
        </div>
      </div>

      {/* Template metadata */}
      <div className="template-metadata">
        <h3>Template Information</h3>
        <div className="metadata-form">
          <div className="form-row">
            <div className="form-group">
              <label>Template Name</label>
              <input
                type="text"
                value={templateMetadata.name}
                onChange={(e) => setTemplateMetadata({...templateMetadata, name: e.target.value})}
                placeholder="Enter template name"
              />
            </div>
            <div className="form-group">
              <label>Craft Type</label>
              <select
                value={templateMetadata.craftType}
                onChange={(e) => setTemplateMetadata({...templateMetadata, craftType: e.target.value})}
              >
                {craftTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={templateMetadata.difficulty}
                onChange={(e) => setTemplateMetadata({...templateMetadata, difficulty: e.target.value})}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Estimated Time</label>
              <input
                type="text"
                value={templateMetadata.estimatedTime}
                onChange={(e) => setTemplateMetadata({...templateMetadata, estimatedTime: e.target.value})}
                placeholder="e.g., 2-3 hours"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={templateMetadata.description}
              onChange={(e) => setTemplateMetadata({...templateMetadata, description: e.target.value})}
              placeholder="Brief description of the template"
              rows="2"
            />
          </div>
          <div className="form-group">
            <label>Visual Description</label>
            <textarea
              value={templateMetadata.visualDescription}
              onChange={(e) => setTemplateMetadata({...templateMetadata, visualDescription: e.target.value})}
              placeholder="Describe what the finished item looks like"
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* Selected blocks */}
      <div className="selected-blocks">
        <div className="blocks-header">
          <h3>Template Blocks</h3>
          <button 
            className="add-block-button"
            onClick={() => setShowLibrary(true)}
          >
            + Add Block
          </button>
        </div>

        {selectedBlocks.length === 0 ? (
          <div className="empty-blocks">
            <p>No blocks added yet</p>
            <p>Click "Add Block" to start building your template</p>
          </div>
        ) : (
          <div className="blocks-list">
            {selectedBlocks.map((blockId, index) => {
              const block = getBlockInfo(blockId);
              if (!block) return null;

              return (
                <div key={`${blockId}-${index}`} className="block-item">
                  <div className="block-info">
                    <span className="block-number">{index + 1}</span>
                    <div className="block-details">
                      <h4>{block.name}</h4>
                      <p>{block.description}</p>
                      <span className="block-type">{block.type}</span>
                    </div>
                  </div>
                  <div className="block-actions">
                    <button
                      className="edit-block-button"
                      onClick={() => handleEditBlock(blockId)}
                      title="Edit block"
                    >
                      ✏️
                    </button>
                    <button
                      className="remove-block-button"
                      onClick={() => handleRemoveBlock(index)}
                      title="Remove block"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Template preview */}
      {templatePreview && (
        <div className="template-preview">
          <h3>Template Preview</h3>
          <div className="preview-info">
            <p><strong>Total Rows:</strong> {templatePreview.rows.length}</p>
            <p><strong>Total Stitches:</strong> {templatePreview.rows.reduce((sum, row) => sum + row.stitchCount, 0)}</p>
          </div>
          <div className="preview-rows">
            {templatePreview.rows.slice(0, 5).map((row, index) => (
              <div key={index} className="preview-row">
                <span className="row-number">Row {row.rowNumber}</span>
                <span className="stitch-count">{row.stitchCount} stitches</span>
                <span className="stitch-types">{row.stitchTypes.join(', ')}</span>
              </div>
            ))}
            {templatePreview.rows.length > 5 && (
              <div className="more-rows">
                ... and {templatePreview.rows.length - 5} more rows
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (currentView === 'library') {
    return (
      <BlockLibrary
        onSelectBlock={handleSelectBlock}
        onEditBlock={handleEditBlock}
        onClose={() => setCurrentView('builder')}
      />
    );
  }

  if (currentView === 'editor') {
    return (
      <BlockEditor
        block={editingBlock}
        onSave={handleSaveBlock}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="template-builder-container">
      {renderBuilder()}

      {/* Save template modal */}
      {showSaveForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Save Template</h3>
            {errors.length > 0 && (
              <div className="error-messages">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <p>Are you sure you want to save this template?</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowSaveForm(false);
                  setErrors([]);
                }}
              >
                Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleSaveTemplate}
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import template modal */}
      {showImportForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Import Template</h3>
            <p>Select a template file (.sct) to import:</p>
            <input
              type="file"
              accept=".sct,.json"
              onChange={handleImportTemplate}
              className="file-input"
            />
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowImportForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block library modal */}
      {showLibrary && (
        <div className="modal-overlay">
          <div className="modal-content library-modal">
            <BlockLibrary
              onSelectBlock={handleSelectBlock}
              onEditBlock={handleEditBlock}
              onClose={() => setShowLibrary(false)}
            />
          </div>
        </div>
      )}

      <div className="builder-footer">
        <button 
          className="close-button"
          onClick={onClose}
        >
          Close Builder
        </button>
      </div>
    </div>
  );
}
