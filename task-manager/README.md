# Task Manager Application

A modern task management application built with React, Redux Toolkit, and Material-UI.

## Features

- ✨ Create, edit, and delete tasks
- 🏷️ Organize tasks with custom categories
- 🎨 Color-coded categories for visual organization
- 📱 Responsive design for mobile and desktop
- 🔍 Filter tasks by category and status
- 💾 Persistent storage using localStorage

## Tech Stack

- React 19
- Redux Toolkit
- Material-UI (MUI)
- React Beautiful DND
- Emotion (for styled components)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/nikkvijay/Task-Manager.git

# Navigate to project directory
cd task-manager

# Install dependencies
npm install --legacy-peer-deps
```

### Development

```bash
# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```plaintext
src/
├── components/
│   ├── categories/
│   │   ├── CategoryBadge.jsx
│   │   ├── CategoryForm.jsx
│   │   └── CategoryList.jsx
│   ├─── tasks/
│   |   ├── TaskFilter.jsx
│   |   ├── TaskForm.jsx
│   |   ├── TaskItem.jsx
│   |   └── TaskList.jsx
|   ├───layout/
|   |   ├── Header.jsx
|   |   ├── Layout.jsx
├── store/
│   ├── features/
│   │   ├── categorySlice.js
│   │   └── taskSlice.js
│   └── store.js
├── assets/
│   └── styles/
│       └── categories.css
└── App.jsx
```

## Key Features Implementation

### Categories

- Custom category creation with color picker
- Category badges with automatic text contrast
- Category filtering and grouping

### Tasks

- Task creation with title, description, and category
- Task status management (Complete/Incomplete)
- Drag and drop task reordering
- Task filtering by category and status

### Storage

- Automatic state persistence using localStorage
- State recovery on page reload
