import { createContext, useContext } from 'react';
import type { Node } from '@xyflow/react';

type GraphCtx = {
  getNodeById: (id: string) => Node | undefined;
  updateNodeData: (id: string, patch: Record<string, unknown>) => void;
};

export const GraphContext = createContext<GraphCtx | null>(null);

export function useGraph() {
  const ctx = useContext(GraphContext);
  if (!ctx) throw new Error('useGraph must be used within GraphContext');
  return ctx;
}
