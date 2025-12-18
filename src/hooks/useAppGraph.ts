import { useQuery } from '@tanstack/react-query';
import { fetchAppGraph } from '@/api/apps';

export function useAppGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchAppGraph(appId!),
    enabled: !!appId,
  });
}
