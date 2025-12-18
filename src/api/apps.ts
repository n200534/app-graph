export type App = {
  id: string;
  name: string;
};

export async function fetchApps(): Promise<App[]> {
  const res = await fetch('/api/apps');
  if (!res.ok) {
    throw new Error('Failed to fetch apps');
  }
  return res.json();
}

export async function fetchAppGraph(appId: string) {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) {
    throw new Error('Failed to fetch graph');
  }
  return res.json();
}
