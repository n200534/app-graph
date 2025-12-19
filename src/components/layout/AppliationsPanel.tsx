import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Search, Plus, ChevronRight } from 'lucide-react';

const appIcons: Record<string, { icon: string; bg: string }> = {
  'supertokens-golang': { icon: '🔵', bg: '#6366f1' },
  'supertokens-java': { icon: '⚙️', bg: '#f97316' },
  'supertokens-python': { icon: '🐍', bg: '#ef4444' },
  'supertokens-ruby': { icon: '💎', bg: '#ec4899' },
  'supertokens-go': { icon: '🔷', bg: '#8b5cf6' },
};

export function ApplicationsPanel() {
  const { data, isLoading, isError } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();

  if (isLoading) return <aside className="p-4 bg-black text-white">Loading...</aside>;
  if (isError) return <aside className="p-4 bg-black text-white">Error loading apps</aside>;

  return (
    <aside className="w-[280px] border-r border-neutral-800 bg-black text-white p-4 flex flex-col">
      <h2 className="text-base font-semibold mb-4">Application</h2>

      {/* Search Bar */}
      <div className="relative mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search..."
            className="w-full h-10 pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 rounded-lg focus-visible:ring-neutral-700"
          />
        </div>
        <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Applications List */}
      <ul className="space-y-2 flex-1 overflow-y-auto">
        {data!.map((app) => {
          const appIcon = appIcons[app.name] || { icon: '📦', bg: '#6366f1' };
          const isSelected = selectedAppId === app.id;

          return (
            <li
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`h-12 px-3 flex items-center rounded-lg cursor-pointer group transition-colors
                ${isSelected ? 'bg-neutral-900' : 'hover:bg-neutral-900/50'}`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-lg"
                style={{ backgroundColor: appIcon.bg }}
              >
                {appIcon.icon}
              </div>
              <span className="flex-1 text-sm font-medium text-white">{app.name}</span>
              <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
