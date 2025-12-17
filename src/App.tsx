import { TopBar } from './components/TopBar'; // Adjusted path to relative
import { LeftRail } from './components/LeftRail';
import { RightPanel } from './components/RightPanel'; // Adjust the path as necessary

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
