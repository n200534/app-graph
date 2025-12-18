import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/useAppStore';

export function ApplicationsPanel() {
  const { data, isLoading, isError } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();

  if (isLoading) return <aside className="p-4">Loading...</aside>;
  if (isError) return <aside className="p-4">Error loading apps</aside>;

  return (
    <aside className="w-[300px] border-r bg-neutral-900 text-white p-4">
      <h2 className="text-sm font-semibold mb-3">Application</h2>

      <ul className="space-y-2">
        {data!.map((app) => (
          <li
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={`h-10 px-3 flex items-center rounded cursor-pointer
              ${
                selectedAppId === app.id
                  ? 'bg-neutral-700'
                  : 'bg-neutral-800'
              }`}
          >
            {app.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
