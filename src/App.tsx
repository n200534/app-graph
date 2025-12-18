import { TopBar } from './components/layout/TopBar';
import { IconRail } from './components/layout/IconRail';
import { ApplicationsPanel } from './components/layout/AppliationsPanel';

function App() {
  return (
    <div className="h-screen grid grid-rows-[48px_1fr]">
      <TopBar />

      <div className="grid grid-cols-[56px_300px_1fr]">
        <IconRail />
        <ApplicationsPanel />

        <main className="bg-muted/30">
          {/* ReactFlow canvas later */}
        </main>
      </div>
    </div>
  );
}

export default App;
