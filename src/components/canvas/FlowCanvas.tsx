import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  BackgroundVariant,
} from "@xyflow/react";

import type { Node, Edge, OnNodesChange, OnEdgesChange } from "@xyflow/react";
import { GraphContext } from "@/components/canvas/GraphContext";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useAppGraph } from "@/hooks/useAppGraph";
import { ServiceNode } from "@/components/canvas/nodes/ServiceNode";

export function FlowCanvas({
  nodes,
  edges,
  setNodes,
  setEdges,
}: {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}) {

  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const { data, isLoading, isError } = useAppGraph(selectedAppId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeTypes: any = {
    service: ServiceNode,
  };
  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const updateNodeData = (id: string, patch: Record<string, unknown>) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
      )
    );
  };

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const selectedNodeId = useAppStore((s) => s.selectedNodeId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't delete if user is editing an input, textarea, or contenteditable element
      const target = e.target as HTMLElement;
      const isEditing = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[contenteditable="true"]');

      if (isEditing) {
        return; // Let the input handle the backspace/delete
      }

      if ((e.key === "Delete" || e.key === "Backspace") && selectedNodeId) {
        e.preventDefault();
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
        setSelectedNodeId(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedNodeId, setSelectedNodeId, setNodes]);

  if (!selectedAppId) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-400 bg-neutral-950">
        Select an application
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-400 bg-neutral-950">
        Loading graph…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 bg-neutral-950">
        Failed to load graph
      </div>
    );
  }

  return (
    <div className="h-full bg-neutral-950">
      <GraphContext.Provider value={{ getNodeById, updateNodeData }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          nodeTypes={nodeTypes}
          fitView
          className="bg-neutral-950"
          defaultEdgeOptions={{
            style: { stroke: '#525252', strokeWidth: 2 },
            type: 'smoothstep',
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={18} size={1} className="bg-neutral-950" color="#404040" />
          <Controls className="bg-neutral-900 border border-neutral-800" />
        </ReactFlow>
      </GraphContext.Provider>
    </div>
  );
}
