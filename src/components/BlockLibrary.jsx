import { useState, useEffect } from 'react';
import { blockManager, blockCategories } from '../utils/blocks';
import './BlockLibrary.css';

export default function BlockLibrary({ onSelectBlock, onEditBlock, onDeleteBlock, onClose }) {
  const [blocks, setBlocks] = useState({});
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadBlocks();
  }, []);

  useEffect(() => {
    filterBlocks();
  }, [blocks, selectedCategory, searchQuery]);

  const loadBlocks = () => {
    const allBlocks = blockManager.getAllBlocks();
    setBlocks(allBlocks);
  };

  const filterBlocks = () => {
    let filtered = Object.values(blocks);

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(block => block.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(block => 
        block.name.toLowerCase().includes(query) ||
        block.description.toLowerCase().includes(query)
      );
    }

    setFilteredBlocks(filtered);
  };

  const handleCreateBlock = () => {
    setShowCreateForm(true);
  };

  const handleEditBlock = (blockId) => {
    onEditBlock(blockId);
  };

  const handleDeleteBlock = (blockId, blockName) => {
    if (confirm(`Are you sure you want to delete the block "${blockName}"?`)) {
      const success = blockManager.deleteBlock(blockId);
      if (success) {
        loadBlocks();
        onDeleteBlock && onDeleteBlock(blockId);
      }
    }
  };

  const handleDuplicateBlock = (blockId) => {
    const duplicatedBlock = blockManager.duplicateBlock(blockId);
    if (duplicatedBlock) {
      loadBlocks();
    }
  };

  const getBlockPreview = (block) => {
    if (!block.rows || block.rows.length === 0) return 'No rows';
    
    const totalStitches = block.rows.reduce((sum, row) => sum + (row.stitchCount || 0), 0);
    const rowCount = block.rows.length;
    
    return `${rowCount} row${rowCount !== 1 ? 's' : ''}, ${totalStitches} stitches`;
  };

  const getBlockTypeColor = (type) => {
    const colors = {
      start: '#4CAF50',
      increase: '#2196F3',
      straight: '#FF9800',
      decrease: '#f44336',
      custom: '#9C27B0'
    };
    return colors[type] || '#666';
  };

  return (
    <div className="block-library">
      <div className="block-library-header">
        <h2>Block Library</h2>
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close library"
        >
          ×
        </button>
      </div>

      {/* Search and filters */}
      <div className="library-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {blockCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="create-block-button"
          onClick={handleCreateBlock}
        >
          + Create New Block
        </button>
      </div>

      {/* Blocks grid */}
      <div className="blocks-grid">
        {filteredBlocks.length === 0 ? (
          <div className="empty-state">
            <p>No blocks found</p>
            <p>Try adjusting your search or create a new block</p>
          </div>
        ) : (
          filteredBlocks.map(block => (
            <div key={block.id} className="block-card">
              <div className="block-card-header">
                <div className="block-type-indicator" style={{ backgroundColor: getBlockTypeColor(block.type) }}>
                  {block.type}
                </div>
                <div className="block-actions">
                  <button
                    className="action-button edit"
                    onClick={() => handleEditBlock(block.id)}
                    title="Edit block"
                  >
                    ✏️
                  </button>
                  {block.isCustom && (
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteBlock(block.id, block.name)}
                      title="Delete block"
                    >
                      🗑️
                    </button>
                  )}
                  <button
                    className="action-button duplicate"
                    onClick={() => handleDuplicateBlock(block.id)}
                    title="Duplicate block"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="block-card-content">
                <h3 className="block-name">{block.name}</h3>
                <p className="block-description">{block.description}</p>
                <div className="block-preview">
                  {getBlockPreview(block)}
                </div>
                <div className="block-meta">
                  <span className="block-category">{blockCategories.find(c => c.id === block.category)?.name}</span>
                  {block.isCustom && <span className="custom-badge">Custom</span>}
                </div>
              </div>

              <div className="block-card-footer">
                <button 
                  className="select-block-button"
                  onClick={() => onSelectBlock(block)}
                >
                  Use Block
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create block form modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Block</h3>
            <p>Choose how you'd like to create your block:</p>
            <div className="create-options">
              <button 
                className="create-option"
                onClick={() => {
                  setShowCreateForm(false);
                  onEditBlock(null); // Pass null to create new block
                }}
              >
                <span className="option-icon">📝</span>
                <span className="option-title">Start from Scratch</span>
                <span className="option-description">Create a completely new block</span>
              </button>
              
              <button 
                className="create-option"
                onClick={() => {
                  setShowCreateForm(false);
                  // TODO: Implement template-based creation
                  alert('Template-based creation coming soon!');
                }}
              >
                <span className="option-icon">📋</span>
                <span className="option-title">Use Template</span>
                <span className="option-description">Start from a common pattern</span>
              </button>
            </div>
            <button 
              className="cancel-button"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
