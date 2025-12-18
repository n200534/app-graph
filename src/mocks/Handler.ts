import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /apps
  http.get('/api/apps', () => {
    return HttpResponse.json([
      { id: 'app-1', name: 'supertokens-golang' },
      { id: 'app-2', name: 'supertokens-java' },
      { id: 'app-3', name: 'supertokens-python' },
    ]);
  }),

  // GET /apps/:appId/graph
  http.get('/api/apps/:appId/graph', ({ params }) => {
    const { appId } = params;

    return HttpResponse.json({
      nodes: [
        {
          id: 'service',
          type: 'service',
          position: { x: 200, y: 100 },
          data: {
            name: `${appId}-service`,
            status: 'healthy',
            cpu: 20,
          },
        },
        {
          id: 'postgres',
          type: 'service',
          position: { x: 500, y: 80 },
          data: {
            name: 'Postgres',
            status: 'healthy',
            cpu: 10,
          },
        },
        {
          id: 'redis',
          type: 'service',
          position: { x: 500, y: 240 },
          data: {
            name: 'Redis',
            status: 'error',
            cpu: 30,
          },
        },
      ],
      edges: [
        { id: 'e1', source: 'service', target: 'postgres' },
        { id: 'e2', source: 'service', target: 'redis' },
      ],
    });
  }),
];
