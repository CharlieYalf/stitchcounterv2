// Block management system for template builder
// Handles default blocks, custom blocks, and block operations

// Default block library with common crochet patterns
export const defaultBlocks = {
  magicRingStart: {
    id: 'magic-ring-start',
    name: 'Magic Ring Start',
    type: 'start',
    category: 'starts',
    description: 'Begin with a magic ring for amigurumi and circular projects',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 6,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Magic ring, 6 sc',
        repeat: 1
      }
    ],
    // Future expansion fields
    formula: null,
    variables: null
  },

  basicIncreaseRound: {
    id: 'basic-increase-round',
    name: 'Basic Increase Round',
    type: 'increase',
    category: 'increases',
    description: 'Standard increase round - 2 stitches in each stitch',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '2 sc in each st',
        repeat: 1
      }
    ],
    formula: null,
    variables: null
  },

  gradualIncreaseRound: {
    id: 'gradual-increase-round',
    name: 'Gradual Increase Round',
    type: 'increase',
    category: 'increases',
    description: 'Gradual increase - 1 sc, 2 sc in next st, repeat',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 2 sc in next st, repeat',
        repeat: 6
      }
    ],
    formula: null,
    variables: null
  },

  straightRound: {
    id: 'straight-round',
    name: 'Straight Round',
    type: 'straight',
    category: 'straight',
    description: 'Work even - 1 stitch in each stitch',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc in each st',
        repeat: 1
      }
    ],
    formula: null,
    variables: null
  },

  basicDecreaseRound: {
    id: 'basic-decrease-round',
    name: 'Basic Decrease Round',
    type: 'decrease',
    category: 'decreases',
    description: 'Standard decrease round - sc2tog around',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 9,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'sc2tog around',
        repeat: 1
      }
    ],
    formula: null,
    variables: null
  },

  gradualDecreaseRound: {
    id: 'gradual-decrease-round',
    name: 'Gradual Decrease Round',
    type: 'decrease',
    category: 'decreases',
    description: 'Gradual decrease - 1 sc, sc2tog, repeat',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, sc2tog, repeat',
        repeat: 4
      }
    ],
    formula: null,
    variables: null
  },

  colorChangeRound: {
    id: 'color-change-round',
    name: 'Color Change Round',
    type: 'straight',
    category: 'specialty',
    description: 'Round with color change',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: true,
        notes: 'Change color, 1 sc in each st',
        repeat: 1
      }
    ],
    formula: null,
    variables: null
  },

  ribbingSection: {
    id: 'ribbing-section',
    name: 'Ribbing Section',
    type: 'straight',
    category: 'specialty',
    description: 'Ribbing pattern for cuffs and edges',
    isCustom: false,
    rows: [
      {
        rowNumber: 1,
        stitchCount: 20,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Back loop only sc in each st',
        repeat: 1
      },
      {
        rowNumber: 2,
        stitchCount: 20,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Back loop only sc in each st',
        repeat: 1
      }
    ],
    formula: null,
    variables: null
  }
};

// Block categories for organization
export const blockCategories = [
  { id: 'starts', name: 'Starts', description: 'Beginning techniques' },
  { id: 'increases', name: 'Increases', description: 'Increasing stitch counts' },
  { id: 'straight', name: 'Straight', description: 'Even rounds/rows' },
  { id: 'decreases', name: 'Decreases', description: 'Decreasing stitch counts' },
  { id: 'specialty', name: 'Specialty', description: 'Special techniques' },
  { id: 'custom', name: 'Custom', description: 'User-created blocks' }
];

// Block types
export const blockTypes = [
  { id: 'start', name: 'Start', description: 'Beginning of pattern' },
  { id: 'increase', name: 'Increase', description: 'Increases stitch count' },
  { id: 'straight', name: 'Straight', description: 'Maintains stitch count' },
  { id: 'decrease', name: 'Decrease', description: 'Decreases stitch count' },
  { id: 'custom', name: 'Custom', description: 'User-defined pattern' }
];

// Storage keys
const STORAGE_KEYS = {
  CUSTOM_BLOCKS: 'stitchCounter_customBlocks',
  CUSTOM_TEMPLATES: 'stitchCounter_customTemplates'
};

// Block management functions
export const blockManager = {
  // Get all blocks (default + custom)
  getAllBlocks() {
    const customBlocks = this.getCustomBlocks();
    return { ...defaultBlocks, ...customBlocks };
  },

  // Get only custom blocks
  getCustomBlocks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_BLOCKS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading custom blocks:', error);
      return {};
    }
  },

  // Save custom blocks
  saveCustomBlocks(blocks) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_BLOCKS, JSON.stringify(blocks));
      return true;
    } catch (error) {
      console.error('Error saving custom blocks:', error);
      return false;
    }
  },

  // Create a new custom block
  createBlock(blockData) {
    const customBlocks = this.getCustomBlocks();
    const newBlock = {
      ...blockData,
      id: crypto.randomUUID(),
      isCustom: true,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    customBlocks[newBlock.id] = newBlock;
    return this.saveCustomBlocks(customBlocks) ? newBlock : null;
  },

  // Update an existing custom block
  updateBlock(blockId, updates) {
    const customBlocks = this.getCustomBlocks();
    if (!customBlocks[blockId]) return null;

    const updatedBlock = {
      ...customBlocks[blockId],
      ...updates,
      lastModified: new Date().toISOString()
    };

    customBlocks[blockId] = updatedBlock;
    return this.saveCustomBlocks(customBlocks) ? updatedBlock : null;
  },

  // Delete a custom block
  deleteBlock(blockId) {
    const customBlocks = this.getCustomBlocks();
    if (!customBlocks[blockId]) return false;

    delete customBlocks[blockId];
    return this.saveCustomBlocks(customBlocks);
  },

  // Duplicate a block (default or custom)
  duplicateBlock(blockId) {
    const allBlocks = this.getAllBlocks();
    const originalBlock = allBlocks[blockId];
    if (!originalBlock) return null;

    const duplicatedBlock = {
      ...originalBlock,
      id: crypto.randomUUID(),
      name: `${originalBlock.name} (Copy)`,
      isCustom: true,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const customBlocks = this.getCustomBlocks();
    customBlocks[duplicatedBlock.id] = duplicatedBlock;
    return this.saveCustomBlocks(customBlocks) ? duplicatedBlock : null;
  },

  // Get blocks by category
  getBlocksByCategory(category) {
    const allBlocks = this.getAllBlocks();
    return Object.values(allBlocks).filter(block => block.category === category);
  },

  // Search blocks by name or description
  searchBlocks(query) {
    const allBlocks = this.getAllBlocks();
    const lowercaseQuery = query.toLowerCase();
    
    return Object.values(allBlocks).filter(block => 
      block.name.toLowerCase().includes(lowercaseQuery) ||
      block.description.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Get block by ID
  getBlockById(blockId) {
    const allBlocks = this.getAllBlocks();
    return allBlocks[blockId] || null;
  },

  // Validate block data
  validateBlock(blockData) {
    const required = ['name', 'type', 'category', 'rows'];
    const missing = required.filter(field => !blockData[field]);
    
    if (missing.length > 0) {
      return { valid: false, errors: [`Missing required fields: ${missing.join(', ')}`] };
    }

    if (!Array.isArray(blockData.rows) || blockData.rows.length === 0) {
      return { valid: false, errors: ['Block must have at least one row'] };
    }

    // Validate each row
    const rowErrors = [];
    blockData.rows.forEach((row, index) => {
      if (!row.stitchCount || row.stitchCount < 0) {
        rowErrors.push(`Row ${index + 1}: Invalid stitch count`);
      }
      if (!Array.isArray(row.stitchTypes)) {
        rowErrors.push(`Row ${index + 1}: Stitch types must be an array`);
      }
    });

    if (rowErrors.length > 0) {
      return { valid: false, errors: rowErrors };
    }

    return { valid: true, errors: [] };
  }
};

// Template management functions
export const templateManager = {
  // Get all custom templates
  getCustomTemplates() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_TEMPLATES);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading custom templates:', error);
      return {};
    }
  },

  // Save custom templates
  saveCustomTemplates(templates) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TEMPLATES, JSON.stringify(templates));
      return true;
    } catch (error) {
      console.error('Error saving custom templates:', error);
      return false;
    }
  },

  // Create a new custom template
  createTemplate(templateData) {
    const customTemplates = this.getCustomTemplates();
    const newTemplate = {
      ...templateData,
      id: crypto.randomUUID(),
      isCustom: true,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    customTemplates[newTemplate.id] = newTemplate;
    return this.saveCustomTemplates(customTemplates) ? newTemplate : null;
  },

  // Update an existing custom template
  updateTemplate(templateId, updates) {
    const customTemplates = this.getCustomTemplates();
    if (!customTemplates[templateId]) return null;

    const updatedTemplate = {
      ...customTemplates[templateId],
      ...updates,
      lastModified: new Date().toISOString()
    };

    customTemplates[templateId] = updatedTemplate;
    return this.saveCustomTemplates(customTemplates) ? updatedTemplate : null;
  },

  // Delete a custom template
  deleteTemplate(templateId) {
    const customTemplates = this.getCustomTemplates();
    if (!customTemplates[templateId]) return false;

    delete customTemplates[templateId];
    return this.saveCustomTemplates(customTemplates);
  },

  // Get template by ID
  getTemplateById(templateId) {
    const customTemplates = this.getCustomTemplates();
    return customTemplates[templateId] || null;
  },

  // Build template from blocks
  buildTemplateFromBlocks(blocks, templateMetadata) {
    const allBlocks = blockManager.getAllBlocks();
    const flattenedRows = [];
    let currentRowNumber = 1;

    blocks.forEach(blockId => {
      const block = allBlocks[blockId];
      if (!block) return;

      block.rows.forEach(blockRow => {
        flattenedRows.push({
          ...blockRow,
          rowNumber: currentRowNumber,
          blockId: blockId,
          blockName: block.name
        });
        currentRowNumber++;
      });
    });

    return {
      ...templateMetadata,
      blocks: blocks,
      rows: flattenedRows
    };
  }
};
