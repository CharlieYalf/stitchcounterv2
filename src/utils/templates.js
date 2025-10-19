// Pattern templates for common crochet items

export const patternTemplates = {
  grannySquare: {
    name: 'Granny Square',
    craftType: 'crochet',
    description: 'Classic granny square with increasing rounds',
    visualDescription: 'A square motif worked in rounds, typically with 4 corners and solid sides. Perfect for blankets, bags, or decorative items.',
    difficulty: 'Beginner',
    estimatedTime: '30-60 minutes',
    rows: [
      {
        rowNumber: 1,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Magic ring, 12 sc',
        repeat: 1
      },
      {
        rowNumber: 2,
        stitchCount: 24,
        stitchTypes: ['ch', 'dc'],
        colorChange: true,
        notes: '2 dc in each st, join with sl st',
        repeat: 1
      },
      {
        rowNumber: 3,
        stitchCount: 36,
        stitchTypes: ['ch', 'dc'],
        colorChange: true,
        notes: 'Corner: 3 dc, 2 ch, 3 dc. Sides: 2 dc in each st',
        repeat: 1
      },
      {
        rowNumber: 4,
        stitchCount: 48,
        stitchTypes: ['ch', 'dc'],
        colorChange: true,
        notes: 'Corner: 3 dc, 2 ch, 3 dc. Sides: 1 dc in each st',
        repeat: 1
      }
    ]
  },

  simpleBeanie: {
    name: 'Simple Beanie',
    craftType: 'crochet',
    description: 'Basic beanie worked in rounds with crown decreases',
    visualDescription: 'A fitted hat worked from the top down, starting with a magic ring and increasing to desired width, then decreasing for the crown.',
    difficulty: 'Beginner',
    estimatedTime: '2-4 hours',
    rows: [
      {
        rowNumber: 1,
        stitchCount: 6,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Magic ring, 6 sc',
        repeat: 1
      },
      {
        rowNumber: 2,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '2 sc in each st',
        repeat: 1
      },
      {
        rowNumber: 3,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 2 sc in next st, repeat',
        repeat: 6
      },
      {
        rowNumber: 4,
        stitchCount: 24,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc in each st',
        repeat: 1
      },
      {
        rowNumber: 5,
        stitchCount: 30,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 1 sc, 2 sc in next st, repeat',
        repeat: 6
      },
      {
        rowNumber: 6,
        stitchCount: 36,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc in each st',
        repeat: 1
      },
      {
        rowNumber: 7,
        stitchCount: 36,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Continue in rounds until desired length',
        repeat: 10
      },
      {
        rowNumber: 8,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Decrease: sc2tog around',
        repeat: 1
      },
      {
        rowNumber: 9,
        stitchCount: 9,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Decrease: sc2tog around',
        repeat: 1
      }
    ]
  },

  flatScarf: {
    name: 'Flat Scarf',
    craftType: 'crochet',
    description: 'Simple scarf worked in rows',
    visualDescription: 'A long, rectangular piece worked back and forth in rows. Perfect for beginners and can be customized with different stitch patterns.',
    difficulty: 'Beginner',
    estimatedTime: '4-8 hours',
    rows: [
      {
        rowNumber: 1,
        stitchCount: 20,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Chain 21, sc in 2nd ch from hook and each ch across',
        repeat: 1
      },
      {
        rowNumber: 2,
        stitchCount: 20,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Ch 1, turn, sc in each st across',
        repeat: 1
      },
      {
        rowNumber: 3,
        stitchCount: 20,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Repeat row 2 until desired length',
        repeat: 50
      }
    ]
  },

  amigurumiSphere: {
    name: 'Amigurumi Sphere',
    craftType: 'crochet',
    description: 'Basic sphere shape for amigurumi',
    visualDescription: 'A 3D ball shape worked in continuous rounds, starting with a magic ring and increasing/decreasing to form a sphere. Great for stuffed animals and decorative objects.',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 hours',
    rows: [
      {
        rowNumber: 1,
        stitchCount: 6,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Magic ring, 6 sc',
        repeat: 1
      },
      {
        rowNumber: 2,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '2 sc in each st',
        repeat: 1
      },
      {
        rowNumber: 3,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 2 sc in next st, repeat',
        repeat: 6
      },
      {
        rowNumber: 4,
        stitchCount: 24,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 1 sc, 2 sc in next st, repeat',
        repeat: 6
      },
      {
        rowNumber: 5,
        stitchCount: 30,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 1 sc, 1 sc, 2 sc in next st, repeat',
        repeat: 6
      },
      {
        rowNumber: 6,
        stitchCount: 36,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc in each st',
        repeat: 1
      },
      {
        rowNumber: 7,
        stitchCount: 36,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'Continue in rounds',
        repeat: 4
      },
      {
        rowNumber: 8,
        stitchCount: 30,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 1 sc, 1 sc, sc2tog, repeat',
        repeat: 6
      },
      {
        rowNumber: 9,
        stitchCount: 24,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, 1 sc, sc2tog, repeat',
        repeat: 6
      },
      {
        rowNumber: 10,
        stitchCount: 18,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: '1 sc, sc2tog, repeat',
        repeat: 6
      },
      {
        rowNumber: 11,
        stitchCount: 12,
        stitchTypes: ['ch', 'sc'],
        colorChange: false,
        notes: 'sc2tog around',
        repeat: 1
      }
    ]
  },

  blankTemplate: {
    name: 'Blank Template',
    craftType: 'crochet',
    description: 'Start with a blank pattern to create your own',
    visualDescription: 'A blank canvas for creating your own custom pattern. Add rows, stitch counts, and instructions as needed.',
    difficulty: 'Any',
    estimatedTime: 'Varies',
    rows: [
      {
        rowNumber: 1,
        stitchCount: 0,
        stitchTypes: [],
        colorChange: false,
        notes: 'Add your first row instructions here',
        repeat: 1
      }
    ]
  }
};

export const craftTypes = [
  'crochet',
  'knitting',
  'embroidery',
  'cross-stitch',
  'tunisian crochet',
  'other'
];

export const stitchTypes = [
  'ch', 'sc', 'hdc', 'dc', 'tr', 'dtr',
  'sl st', 'sc2tog', 'dc2tog', 'hdc2tog',
  'inc', 'dec', 'bobble', 'popcorn',
  'picot', 'shell', 'cluster'
];

// Template version for export/import compatibility
export const TEMPLATE_VERSION = '1.0.0';

// Merge default templates with custom templates
export const getAllTemplates = () => {
  const { storage } = require('./storage');
  const customTemplates = storage.getCustomTemplates();
  return { ...patternTemplates, ...customTemplates };
};

// Export template to JSON file
export const exportTemplate = (template, filename) => {
  const exportData = {
    version: TEMPLATE_VERSION,
    type: 'stitch-counter-template',
    template: template,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${template.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.sct`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export multiple templates
export const exportTemplates = (templates, filename) => {
  const exportData = {
    version: TEMPLATE_VERSION,
    type: 'stitch-counter-templates',
    templates: templates,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'stitch_counter_templates.sct';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import template from file
export const importTemplate = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate file format
        if (!data.type || !data.version) {
          throw new Error('Invalid template file format');
        }
        
        if (data.type === 'stitch-counter-template') {
          resolve({ type: 'single', template: data.template });
        } else if (data.type === 'stitch-counter-templates') {
          resolve({ type: 'multiple', templates: data.templates });
        } else {
          throw new Error('Unsupported template file type');
        }
      } catch (error) {
        reject(new Error(`Failed to parse template file: ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Validate template data
export const validateTemplate = (template) => {
  const errors = [];
  
  if (!template.name || typeof template.name !== 'string') {
    errors.push('Template must have a name');
  }
  
  if (!template.craftType || typeof template.craftType !== 'string') {
    errors.push('Template must have a craft type');
  }
  
  if (!Array.isArray(template.rows) || template.rows.length === 0) {
    errors.push('Template must have at least one row');
  }
  
  // Validate each row
  template.rows?.forEach((row, index) => {
    if (!row.rowNumber || typeof row.rowNumber !== 'number') {
      errors.push(`Row ${index + 1}: Missing or invalid row number`);
    }
    if (typeof row.stitchCount !== 'number' || row.stitchCount < 0) {
      errors.push(`Row ${index + 1}: Invalid stitch count`);
    }
    if (!Array.isArray(row.stitchTypes)) {
      errors.push(`Row ${index + 1}: Stitch types must be an array`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
};
