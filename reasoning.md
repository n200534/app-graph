# App Graph Builder - Reasoning and Approach

## Overview
This application is a web-based tool for visualizing and managing application graphs, allowing users to view interconnected services, their metrics, and dependencies in an interactive canvas. It leverages modern React technologies to provide a responsive, user-friendly interface for exploring app architectures.



### Project Structure
- **src/components:** Organized by feature (canvas, inspector, layout, ui) for modularity.
- **src/hooks:** Custom hooks for data fetching and app state.
- **src/types:** Centralized type definitions for graph data.
- **src/mocks:** Mock handlers for API endpoints.
- **src/api:** Functions for API interactions, abstracted for easy switching between real and mock data.

## Key Features and Decisions

### Interactive Graph Canvas
- Uses React Flow to render nodes (services) and edges (dependencies). Each node displays metrics like CPU, memory, and status.
- Decision: Custom node components (e.g., ServiceNode) for rich visualizations, including icons, badges, and progress bars.

### Inspector Panel
- Dynamically shows details of selected nodes, allowing users to explore service properties.
- Decision: Context-based state management for node selection, keeping the UI reactive.

### Responsive Layout
- Icon rail, top bar, and panels adjust to screen size using Tailwind's responsive utilities.
- Decision: Flexbox and grid layouts for flexibility without complex CSS.

### Error Handling and Loading States
- React Query handles loading, error, and success states for API calls.
- Decision: Graceful fallbacks and user feedback to improve UX.

## Challenges and Solutions

### TypeScript Compilation Errors
- **Challenge:** Initial build failed due to type issues (e.g., unused imports, incorrect prop types).
- **Solution:** Fixed by using type-only imports, removing unused variables, and properly typing components.

### API 404 in Production
- **Challenge:** Deployed app hit real network for `/api/apps` since MSW wasn't enabled.
- **Solution:** Added conditional MSW startup with environment variable `VITE_ENABLE_MOCKS`, and ensured worker starts before app render to avoid race conditions.

### Service Worker Registration
- **Challenge:** MSW worker needed to be registered before network requests.
- **Solution:** Awaited MSW initialization in `main.tsx` before rendering the app.

## Future Improvements
- Add real backend integration for production use.
- Implement user authentication and data persistence.
- Enhance graph features like auto-layout, search, and export options.
- Optimize bundle size with code splitting.

