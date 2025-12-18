import { create } from 'zustand';

type InspectorTab = 'config' | 'runtime';

type AppState = {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  activeInspectorTab: InspectorTab;
  isMobilePanelOpen: boolean;

  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setMobilePanelOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  activeInspectorTab: 'config',
  isMobilePanelOpen: false,

  setSelectedAppId: (id) =>
    set({
      selectedAppId: id,
      selectedNodeId: null, // reset node when app changes
    }),

  setSelectedNodeId: (id) =>
    set({
      selectedNodeId: id,
      isMobilePanelOpen: true, // open inspector on mobile
    }),

  setActiveInspectorTab: (tab) =>
    set({
      activeInspectorTab: tab,
    }),

  setMobilePanelOpen: (open) =>
    set({
      isMobilePanelOpen: open,
    }),
}));
