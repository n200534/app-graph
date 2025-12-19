import { Github, Database, Box, Leaf, Boxes, BarChart3, Network } from 'lucide-react';

const icons = [
  { Icon: Github, color: 'text-white', label: 'GitHub' },
  { Icon: Database, color: 'text-blue-400', label: 'PostgreSQL' },
  { Icon: Box, color: 'text-red-400', label: 'Redis' },
  { Icon: Leaf, color: 'text-green-400', label: 'MongoDB' },
  { Icon: Boxes, color: 'text-white', label: 'Services' },
  { Icon: BarChart3, color: 'text-yellow-400', label: 'Analytics' },
  { Icon: Network, color: 'text-green-400', label: 'Network' },
];

export function IconRail() {
  return (
    <div className="h-full bg-neutral-950 border-r border-neutral-800 flex flex-col items-center py-4 gap-3">
      {icons.map(({ Icon, color, label }, i) => (
        <button
          key={i}
          className="h-10 w-10 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center transition-colors group relative"
          title={label}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </button>
      ))}
    </div>
  );
}
