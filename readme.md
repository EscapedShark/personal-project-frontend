# Personal Project Management System (Frontend)

A modern project management system frontend implementation based on React + TypeScript.

## Technology Stack

- **Core Framework:** React 18.3.1
- **Type System:** TypeScript 5.6.3
- **State Management:** Redux Toolkit 2.5.0
- **Routing:** React Router DOM 7.1.1
- **UI Library:** Ant Design 5.22.6
- **Build Tool:** Vite 6.0.6
- **HTTP Client:** Axios 1.7.9

## Features

- 🚀 Fast development experience with Vite
- 💪 Type safety with TypeScript
- 📱 Responsive design, supporting multiple platforms
- 🎨 Beautiful interface based on Ant Design
- 🔐 Complete user authentication flow
- 📊 Visual project data presentation

## Quick Start

### Requirements

- Node.js 16.0 or higher
- npm 7.0 or higher

### Installation

```bash
# Clone the project
git clone [project-url]

# Enter project directory
cd project-name

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable components (to be created)
├── layouts/        # Layout components
├── pages/          # Page components
│   ├── auth/       # Authentication pages
│   ├── projects/   # Project management pages
│   ├── tasks/      # Task management pages
│   └── profile/    # User profile pages
├── services/       # API services (to be created)
├── store/          # Redux store (to be created)
├── types/          # TypeScript type definitions (to be created)
└── utils/          # Utility functions (to be created)
```

## Core Features

- User Authentication
  - Login/Registration
  - Personal information management
- Project Management
  - Project list viewing
  - Project details management
  - Project progress tracking
- Task Management
  - Kanban-style task management
  - Task assignment
  - Progress updates

## Development Guide

### Code Standards

This project uses ESLint for code standardization, including:
- eslint 9.17.0
- typescript-eslint 8.18.2
- eslint-plugin-react-hooks 5.1.0
- eslint-plugin-react-refresh 0.4.16

### Dependencies

- @ant-design/icons: UI icon library
- @reduxjs/toolkit: Redux state management tool
- react-redux: Redux bindings for React
- axios: HTTP request client
- antd: UI component library

## Available Commands

```bash
# Start development environment
npm run dev

# Build for production
npm run build

# Code linting
npm run lint
```

## Browser Support

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## License

GPL