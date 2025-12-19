# App Graph Builder

A responsive ReactFlow-based application for visualizing and managing service graphs with an interactive node inspector.

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Key Decisions

- **State Management**: Zustand for UI state (selected app/node, mobile panel, active tab), TanStack Query for server state (apps, graph data)
- **Mocking**: MSW (Mock Service Worker) for API simulation - no backend required
- **UI Components**: shadcn/ui for consistent, accessible components
- **Graph Library**: ReactFlow (@xyflow/react) for node-based graph visualization
- **Responsive Design**: Fixed panel on desktop (lg+), slide-over drawer on mobile
- **Type Safety**: TypeScript strict mode enabled throughout

## Known Limitations

- **Mock Data Only**: No real backend integration (by design for this task)
- **Limited Node Types**: Currently only supports service nodes
- **Basic Validation**: Form inputs have minimal validation
- **Runtime Tab**: Runtime metrics are placeholder data
- **Search Functionality**: App search in dropdown is UI-only (not functional)
- **Node Creation**: No "Add Node" button implemented (bonus feature)
