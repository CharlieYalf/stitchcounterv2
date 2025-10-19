// Pattern templates for common crochet items

export const patternTemplates = {
  grannySquare: {
    name: 'Granny Square',
    craftType: 'crochet',
    description: 'Classic granny square with increasing rounds',
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
