import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/hooks/useApps';
import { Share2, Moon, Sun, ChevronDown, MoreHorizontal, Plus, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const appIcons: Record<string, { icon: string; bg: string }> = {
  'supertokens-golang': { icon: '🔵', bg: '#6366f1' },
  'supertokens-java': { icon: '⚙️', bg: '#f97316' },
  'supertokens-python': { icon: '🐍', bg: '#ef4444' },
  'supertokens-ruby': { icon: '💎', bg: '#ec4899' },
  'supertokens-go': { icon: '🔷', bg: '#8b5cf6' },
};

export function TopBar() {
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const { data: apps } = useApps();

  const selectedApp = apps?.find((app) => app.id === selectedAppId);
  const selectedAppIcon = selectedApp ? appIcons[selectedApp.name] : null;

  return (
    <header className="h-12 border-b border-neutral-800 bg-black flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Logo/Icon */}
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <div className="w-5 h-5 bg-black rounded-sm" />
        </div>

        {/* App Name with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 h-8 rounded-lg hover:bg-neutral-900 transition-colors">
              {selectedApp ? (
                <>
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: selectedAppIcon?.bg }}
                  >
                    {selectedAppIcon?.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{selectedApp.name}</span>
                </>
              ) : (
                <span className="text-neutral-400 text-sm font-medium">Select Application</span>
              )}
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] bg-black border-neutral-800 text-white p-2 [&_*]:text-white">
            <DropdownMenuLabel className="text-base font-semibold px-2 py-2 text-white">
              Application
            </DropdownMenuLabel>

            {/* Search Bar */}
            <div className="relative mb-2 px-2">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search..."
                className="w-full h-9 pl-9 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 rounded-lg focus-visible:ring-neutral-700"
              />
            </div>

            <DropdownMenuSeparator className="bg-neutral-800" />

            {/* Applications List */}
            <div className="max-h-[300px] overflow-y-auto py-1">
              {apps?.map((app) => {
                const appIcon = appIcons[app.name] || { icon: '📦', bg: '#6366f1' };
                const isSelected = selectedAppId === app.id;

                return (
                  <DropdownMenuItem
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-white ${
                      isSelected ? 'bg-neutral-900' : 'hover:bg-neutral-900/50'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
                      style={{ backgroundColor: appIcon.bg }}
                    >
                      {appIcon.icon}
                    </div>
                    <span className="flex-1 text-sm font-medium text-white">{app.name}</span>
                  </DropdownMenuItem>
                );
              })}
            </div>

            <DropdownMenuSeparator className="bg-neutral-800" />

            {/* Add New App Button */}
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-900 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Add New Application</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="p-2 hover:bg-neutral-900 rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-neutral-900 rounded-lg transition-colors">
          <Share2 className="w-4 h-4 text-neutral-400" />
        </button>
        <button className="p-2 hover:bg-neutral-900 rounded-lg transition-colors">
          <Moon className="w-4 h-4 text-neutral-400" />
        </button>
        <button className="p-2 hover:bg-neutral-900 rounded-lg transition-colors">
          <Sun className="w-4 h-4 text-neutral-400" />
        </button>
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-sm font-bold">A</span>
        </button>
      </div>
    </header>
  );
}
