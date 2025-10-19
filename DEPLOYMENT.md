# Deployment Guide

## GitHub Pages Deployment

### Option 1: Automatic Deployment (GitHub Actions)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add block builder template system"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **"GitHub Actions"**
   - The workflow will automatically deploy when you push to main

3. **Your app will be available at:**
   `https://yourusername.github.io/stitchcounterv2/`

### Option 2: Manual Deployment

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Deploy using the script:**
   ```bash
   ./deploy.sh
   ```

   Or manually:
   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Select "/ (root)" folder

### Option 3: Alternative Hosting Services

#### Vercel (Recommended for React apps)
- Free tier with excellent performance
- Automatic deployments from GitHub
- Custom domains
- Better for React/SPA apps

#### Netlify
- Free tier
- Drag-and-drop deployment
- Form handling
- Good for static sites

#### Firebase Hosting
- Google's hosting service
- Free tier
- Good integration with other Google services

## Important Notes

- Make sure to update the `base` path in `vite.config.js` to match your repository name
- The app uses localStorage, so all data is stored locally in the user's browser
- Custom templates and blocks are saved locally and won't sync across devices

## Troubleshooting

### Build Errors
- Make sure you're using Node.js 20+ (Vite 7+ requirement)
- Run `npm install` to update package-lock.json
- Check that all dependencies are properly installed

### GitHub Pages Issues
- Ensure the repository is public (required for free GitHub Pages)
- Check that the base path in vite.config.js matches your repo name
- Verify that the gh-pages branch was created after deployment
