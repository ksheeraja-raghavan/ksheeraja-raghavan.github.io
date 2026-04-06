# Ksheeraja's Personal Website

A beautiful and aesthetic personal website built with React, TypeScript, and Vite. Features sections for About Me, Art, and Blog with a modern blue-themed design.

## Features

- **About Me**: Introduction and background with charming emojis
- **Art**: Gallery of artistic creations with smooth hover animations
- **Blog**: Collection of blog posts and thoughts with elegant styling
- **Aesthetic Design**: Modern typography (Inter font), blue color scheme, glassmorphism effects, and smooth animations

## Design Highlights

- Clean, modern typography using Inter font family
- Subtle glassmorphism effects with backdrop blur
- Smooth cubic-bezier animations and hover effects
- Responsive design that works on all devices
- Blue gradient backgrounds with soft shadows

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── About.tsx
│   ├── Art.tsx
│   ├── Blog.tsx
│   ├── Home.tsx
│   └── Nav.tsx
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- ESLint
  import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
