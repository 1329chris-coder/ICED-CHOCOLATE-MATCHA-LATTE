# 🚀 Deployment Guide: Iced Chocolate Matcha Latte

Your scrollytelling experience is ready for the world! This project is configured for **Static Export**, which means it generates a high-performance `/out` folder that can be hosted on any static provider.

## ⚡ Option 1: Vercel (Recommended)
Vercel is the creator of Next.js and provides the most seamless experience.

1.  **Push to GitHub**: Push your code to a GitHub repository.
2.  **Import to Vercel**: Connect your GitHub account and select this repository.
3.  **Configure Settings**:
    *   **Framework Preset**: Next.js
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `out`
4.  **Deploy**: Click "Deploy" and your site will be live!

## 💎 Option 2: Netlify
Netlify is excellent for static sites and handles the `/out` folder perfectly.

1.  **Connect Repo**: Connect your GitHub/GitLab repository.
2.  **Build Settings**:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `out`
3.  **Deploy**: Netlify will automatically build and host your site.

## 🐙 Option 3: GitHub Pages
Since we are using static export, GitHub Pages is a great free option.

1.  **Settings**: Go to `Settings > Pages` in your repo.
2.  **Source**: Select `GitHub Actions`.
3.  **Action**: Use the official "Next.js" starter workflow. It will automatically detect the static export and deploy from the `/out` directory.

---

## 🛠️ Local Production Preview
To see exactly what your users will see before you deploy:

```bash
# Install a static server
npm install -g serve

# Serve the static export
serve out
```

## 📦 What's in the `/out` folder?
*   `index.html`: The main entry point.
*   `_next/`: All optimized JavaScript and CSS.
*   `images/`: Your high-resolution 192-frame sequence and brand assets.

> [!TIP]
> **Performance**: Your image sequence is already optimized for fast loading via the HTML5 Canvas renderer we built.
