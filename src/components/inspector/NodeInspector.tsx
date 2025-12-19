import { useAppStore } from '@/store/useAppStore';
import { useGraph } from '@/components/canvas/GraphContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function NodeInspector() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setActiveTab = useAppStore((s) => s.setActiveInspectorTab);
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useAppStore((s) => s.setMobilePanelOpen);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const { getNodeById, updateNodeData } = useGraph();
  const inspectorRef = useRef<HTMLElement>(null);

  // Close inspector when clicking outside (desktop only)
  useEffect(() => {
    if (!selectedNodeId) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Don't close if clicking inside the inspector
      if (inspectorRef.current && inspectorRef.current.contains(target)) {
        return;
      }

      // Don't close if clicking on a ReactFlow node or controls
      if (
        target.closest('.react-flow__node') ||
        target.closest('.react-flow__controls') ||
        target.closest('.react-flow__panel')
      ) {
        return;
      }

      // Close inspector if clicking on the canvas background
      if (
        target.closest('.react-flow__pane') ||
        target.closest('.react-flow')
      ) {
        setSelectedNodeId(null);
      }
    };

    // Add delay to avoid immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedNodeId, setSelectedNodeId]);

  if (!selectedNodeId) {
    return null;
  }

  const node = getNodeById(selectedNodeId);
  if (!node) return null;

  const { name, status, cpu } = node.data as {
    name: string;
    status: 'healthy' | 'error' | 'degraded';
    cpu: number;
  };

  const statusColor =
    status === 'healthy'
      ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
      : status === 'error'
      ? 'bg-red-950/50 text-red-400 border-red-500/30'
      : 'bg-yellow-950/50 text-yellow-400 border-yellow-500/30';

  const statusText = status === 'healthy' ? 'Healthy' : status === 'error' ? 'Error' : 'Degraded';

  const InspectorContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Service Node</h2>
        <div className="flex items-center gap-2">
          <Badge className={`${statusColor} hover:bg-opacity-80`}>
            <span className="mr-1">●</span>
            {statusText}
          </Badge>
          <button
            className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => {
              setMobilePanelOpen(false);
              setSelectedNodeId(null);
            }}
          >
            <X className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="mb-4 w-full bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="config" className="flex-1 data-[state=active]:bg-neutral-800">
            Config
          </TabsTrigger>
          <TabsTrigger value="runtime" className="flex-1 data-[state=active]:bg-neutral-800">
            Runtime
          </TabsTrigger>
        </TabsList>

        {/* CONFIG TAB */}
        <TabsContent value="config" className="space-y-6">
          <div>
            <label className="text-sm text-neutral-400 block mb-2">Node Name</label>
            <Input
              value={name}
              onChange={(e) => updateNodeData(selectedNodeId, { name: e.target.value })}
              className="bg-neutral-900 border-neutral-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-400 block mb-2">CPU Usage (%)</label>
            <div className="space-y-3">
              <Slider
                value={[cpu]}
                min={0}
                max={100}
                step={1}
                onValueChange={([v]) => updateNodeData(selectedNodeId, { cpu: v })}
                className="w-full"
              />
              <Input
                type="number"
                className="w-full bg-neutral-900 border-neutral-800 text-white"
                value={cpu}
                min={0}
                max={100}
                onChange={(e) =>
                  updateNodeData(selectedNodeId, { cpu: Number(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-400 block mb-2">Description (Optional)</label>
            <textarea
              className="w-full min-h-[100px] rounded-lg bg-neutral-900 border border-neutral-800 text-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700"
              placeholder="Add a description for this service..."
            />
          </div>
        </TabsContent>

        {/* RUNTIME TAB */}
        <TabsContent value="runtime" className="space-y-4">
          <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-4">
            <h3 className="text-sm font-medium text-white mb-3">Runtime Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Uptime</span>
                <span className="text-white">24h 15m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Memory Usage</span>
                <span className="text-white">512 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Network I/O</span>
                <span className="text-white">1.2 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Requests/sec</span>
                <span className="text-white">450</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <>
      {/* Desktop: Fixed Panel */}
      <aside 
        ref={inspectorRef}
        className="hidden lg:block w-[360px] border-l border-neutral-800 bg-black text-white p-6 overflow-y-auto"
      >
        {InspectorContent}
      </aside>

      {/* Mobile: Slide-over Drawer */}
      {isMobilePanelOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => {
              setMobilePanelOpen(false);
              setSelectedNodeId(null);
            }}
          />
          
          {/* Drawer */}
          <aside 
            ref={inspectorRef}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-[90%] max-w-[400px] bg-black border-l border-neutral-800 z-50 p-6 overflow-y-auto"
          >
            {InspectorContent}
          </aside>
        </>
      )}
    </>
  );
}
