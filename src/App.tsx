import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/layout/RightPanel';

function App() {
  return (
    <div className="h-screen grid grid-rows-[48px_1fr]">
      <TopBar />

      <div className="grid grid-cols-[56px_1fr_360px]">
        <LeftRail />

        <main className="bg-muted/30">
          {/* Canvas placeholder */}
        </main>

        <RightPanel />
      </div>
    </div>
  );
}

export default App;
