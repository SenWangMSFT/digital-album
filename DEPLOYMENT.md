# Deploying Your Digital Album to GitHub Pages

## Prerequisites
- A GitHub account
- Git installed on your computer
- Your repository pushed to GitHub

## Steps to Deploy

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Digital photo album"
```

### 2. Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "+" in the top right → "New repository"
3. Name it: `digital-album`
4. Don't initialize with README (we already have files)
5. Click "Create repository"

### 3. Push to GitHub
```bash
git remote add origin https://github.com/SenWangMSFT/digital-album.git
git branch -M main
git push -u origin main
```

### 4. Deploy to GitHub Pages
```bash
npm run deploy
```

This command will:
- Build your app for production
- Create a `gh-pages` branch
- Push the built files to GitHub Pages

### 5. Enable GitHub Pages (if needed)
1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select `gh-pages` branch
5. Click "Save"

### 6. Access Your Album
Your album will be live at:
**https://SenWangMSFT.github.io/digital-album**

⏱️ Note: It may take 1-2 minutes for the site to be live after first deployment.

## Updating Your Album

Whenever you want to update your album:

```bash
# Make your changes
git add .
git commit -m "Update album"
git push

# Deploy new version
npm run deploy
```

## Troubleshooting

### Images Not Showing
Make sure your photos are in the `public/photos/` folder and committed to git.

### 404 Error
- Check that GitHub Pages is enabled in repository settings
- Verify the `gh-pages` branch exists
- Wait a few minutes for deployment to complete

### CORS Issues with Images
If you see CORS errors in the console, the color extraction might fail but your album will still work with default backgrounds.

## Custom Domain (Optional)

To use a custom domain:
1. Add a file named `CNAME` to the `public` folder
2. Put your domain name in it (e.g., `album.yourdomain.com`)
3. Configure DNS settings with your domain provider
4. Redeploy: `npm run deploy`

---

Enjoy your beautiful digital album! 📸✨
