import { useState } from 'react';
import type { Node, Edge } from '@xyflow/react';

import { TopBar } from '@/components/layout/TopBar';
import { IconRail } from '@/components/layout/IconRail';
import { FlowCanvas } from '@/components/canvas/FlowCanvas';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import { GraphContext } from '@/components/canvas/GraphContext';

function App() {
  // Graph state lives HERE (single source of truth)
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Graph helpers exposed via context
  const getNodeById = (id: string) => {
    return nodes.find((n) => n.id === id);
  };

  const updateNodeData = (id: string, patch: Record<string, unknown>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
      )
    );
  };

  return (
    <div className="h-screen grid grid-rows-[48px_1fr] bg-black">
      <TopBar />

      <div className="grid grid-cols-[56px_1fr_auto] lg:grid-cols-[56px_1fr_360px] h-full overflow-hidden">
        <IconRail />

        {/* Canvas + inspector */}
        <GraphContext.Provider value={{ getNodeById, updateNodeData }}>
          <div className="relative h-full bg-neutral-950">
            <FlowCanvas
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
            />
          </div>

          <NodeInspector />
        </GraphContext.Provider>
      </div>
    </div>
  );
}

export default App;
