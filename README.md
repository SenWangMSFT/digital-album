# 📸 Digital Photo Album

A beautiful, modern digital photo album built with React and Framer Motion. Features smooth page-turning animations, swipe gestures, and dynamic backgrounds that adapt to each photo's colors.

![Digital Album Demo](https://img.shields.io/badge/React-19.1.1-blue) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-purple) ![Vite](https://img.shields.io/badge/Vite-7.1.12-yellow)

## ✨ Features

- **📖 Physical Album Experience** - Mimics a real photo album with smooth page-turning animations
- **👆 Touch & Swipe Gestures** - Mobile-friendly swipe navigation
- **🎨 Dynamic Backgrounds** - Automatically extracts colors from each photo to create matching gradient backgrounds
- **💫 Smooth Animations** - Fluid transitions using Framer Motion
- **📱 Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- **✨ Decorative Effects** - Subtle sparkles and floating shapes for visual interest
- **🖼️ Modern UI** - Clean, elegant design with smooth borders and shadows
- **⚡ Fast Performance** - Built with Vite for optimal loading speeds

## 🚀 Live Demo

View the live album: **[https://SenWangMSFT.github.io/digital-album](https://SenWangMSFT.github.io/digital-album)**

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Framer Motion** - Animation library
- **Vite** - Build tool and dev server
- **HTML5 Canvas** - Color extraction from images
- **CSS3** - Modern styling with gradients and effects

## 📁 Project Structure

```
digital-album/
├── public/
│   └── photos/          # Your photo files go here
│       ├── front.jpg    # Album cover image
│       ├── 0.jpg        # Photo 1
│       ├── 1.jpg        # Photo 2
│       └── ...          # Photos 2-13
├── src/
│   ├── Album.jsx        # Main album component
│   ├── Album.css        # Album styles
│   ├── App.jsx          # Root component
│   ├── App.css          # App styles
│   └── index.css        # Global styles
└── package.json
```

## 🎯 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SenWangMSFT/digital-album.git
   cd digital-album
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your photos**
   - Place your photos in the `public/photos/` directory
   - Name them: `front.jpg` (cover) and `0.jpg` through `13.jpg` (14 photos total)
   - Supported formats: JPG, PNG

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the album

## 🎨 Customization

### Change Album Title

Edit the title and subtitle in `src/Album.jsx`:

```jsx
<div className="cover-overlay">
  <h1 className="album-title">Your Album Title</h1>
  <p className="album-subtitle">Your Subtitle</p>
</div>
```

### Adjust Number of Photos

Modify the array length in `src/Album.jsx`:

```jsx
// Change 14 to your desired number of photos
...Array.from({ length: 14 }, (_, i) => ({ 
  id: i, 
  src: `${basePath}photos/${i}.jpg`,
  isCover: false 
}))
```

### Customize Colors

The background colors are automatically extracted from your photos, but you can modify the extraction algorithm or fallback colors in the `extractColors` function in `Album.jsx`.

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🌐 Deploying to GitHub Pages

### One-Time Setup

1. **Create a GitHub repository** named `digital-album`

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/digital-album.git
   git branch -M main
   git push -u origin main
   ```

3. **Update `package.json`**
   
   Change the homepage URL to your GitHub username:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/digital-album"
   ```

4. **Update `vite.config.js`**
   
   Ensure the base path matches your repo name:
   ```javascript
   base: '/digital-album/'
   ```

### Deploy

Run this command whenever you want to deploy:

```bash
npm run deploy
```

This will:
- Build your app for production
- Create/update the `gh-pages` branch
- Push to GitHub Pages

Your album will be live at: `https://YOUR_USERNAME.github.io/digital-album`

### Enable GitHub Pages (First Time Only)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

Wait 1-2 minutes and your site will be live!

## 🔄 Updating Your Album

To update photos or make changes:

```bash
# Make your changes (add/replace photos, edit code, etc.)
git add .
git commit -m "Update album"
git push

# Deploy the changes
npm run deploy
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 🎭 Features in Detail

### Page Turning Animation
- Smooth 3D rotation effect
- Spring-based physics for natural movement
- Directional awareness (left/right swipe)

### Swipe Gestures
- Touch-enabled for mobile devices
- Drag-to-swipe on desktop
- Velocity-based swipe detection

### Color Extraction
- Analyzes each photo using HTML5 Canvas
- Extracts dominant colors
- Generates complementary gradients
- Lightens colors for pleasant backgrounds

### Responsive Design
- Adapts to all screen sizes
- Different layouts for mobile/tablet/desktop
- Optimized for portrait and landscape orientations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Developed with [Vite](https://vitejs.dev/)

---

Made with ❤️ by [SenWangMSFT](https://github.com/SenWangMSFT)
