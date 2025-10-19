# Stitch Counter

A mobile-first Progressive Web App for tracking crochet and fiber craft projects. Designed for one-handed operation with large touch targets and intuitive controls.

## Features

### 🧶 One-Handed Operation
- **Large tap zones**: Top half of screen increments, bottom half decrements
- **Mobile-first design**: Optimized for thumb reach and accessibility
- **Visual feedback**: Clear animations and progress indicators

### 📱 Project Management
- **Multiple projects**: Create and manage unlimited projects
- **Craft types**: Support for crochet, knitting, embroidery, and more
- **Progress tracking**: Visual progress bars and completion percentages

### 📋 Pattern System
- **Pre-built templates**: Granny square, beanie, scarf, amigurumi sphere
- **Custom patterns**: Create your own patterns with detailed instructions
- **Step-through mode**: Auto-advance to next row when target count reached
- **Save points**: Bookmark any row to resume later
- **Jump to row**: Pick up pattern from any point

### 💾 Data Persistence
- **Local storage**: All data saved locally (no cloud required)
- **Offline capable**: Works without internet connection
- **PWA support**: Install as native app on mobile devices

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open in browser: `http://localhost:5173`

### Production

1. Build for production:
   ```bash
   npm run build
   ```

2. Preview production build:
   ```bash
   npm run preview
   ```

## Usage

### Creating a Project

1. Tap "New Project" on the home screen
2. Enter project name and select craft type
3. Choose from pre-built templates or start blank
4. Tap "Create Project" to begin

### Using the Counter

1. **Freestyle counting**: Tap anywhere to start, top to increment, bottom to decrement
2. **Pattern-based counting**: Follow row instructions and auto-advance when complete
3. **Save points**: Long-press to access controls and add save points
4. **Jump to row**: Use controls to jump to any row in your pattern

### Pattern Editor

1. Access pattern editor from project controls
2. Add/edit rows with stitch counts, types, and notes
3. Set color changes and repeat instructions
4. Save changes to update your project

## Technical Details

### Tech Stack
- **React 18** with Vite for fast development
- **CSS Variables** for consistent theming
- **LocalStorage** for data persistence
- **Service Worker** for offline capability
- **PWA Manifest** for app-like experience

### File Structure
```
src/
├── components/          # React components
│   ├── Counter.jsx     # Main counting interface
│   ├── ProjectList.jsx # Project management
│   └── PatternEditor.jsx # Pattern creation/editing
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   └── useCounter.js
├── utils/              # Utility functions
│   ├── storage.js      # LocalStorage helpers
│   └── templates.js    # Pattern templates
└── styles/             # CSS variables and themes
    └── variables.css
```

### Browser Support
- Modern browsers with ES6+ support
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 7+)
- Progressive Web App features on supported browsers

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

MIT License - feel free to use and modify as needed.