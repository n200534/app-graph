import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /apps
  http.get('/api/apps', () => {
    return HttpResponse.json([
      { id: 'app-1', name: 'supertokens-golang' },
      { id: 'app-2', name: 'supertokens-java' },
      { id: 'app-3', name: 'supertokens-python' },
      { id: 'app-4', name: 'supertokens-ruby' },
      { id: 'app-5', name: 'supertokens-go' },
    ]);
  }),

  // GET /apps/:appId/graph
  http.get('/api/apps/:appId/graph', () => {
    return HttpResponse.json({
      nodes: [
        {
          id: 'service',
          type: 'service',
          position: { x: 100, y: 50 },
          data: {
            name: 'supertokens-golang',
            status: 'healthy',
            cpu: 2.5,
            memory: 0.05,
            disk: 10.0,
            region: 1,
            price: 0.03,
            icon: 'Go',
            iconBg: '#00ADD8',
            provider: 'aws',
          },
        },
        {
          id: 'postgres',
          type: 'service',
          position: { x: 500, y: 50 },
          data: {
            name: 'Postgres',
            status: 'healthy',
            cpu: 5.2,
            memory: 0.05,
            disk: 10.0,
            region: 1,
            price: 0.03,
            icon: 'PG',
            iconBg: '#336791',
            provider: 'aws',
          },
        },
        {
          id: 'redis',
          type: 'service',
          position: { x: 100, y: 350 },
          data: {
            name: 'Redis',
            status: 'error',
            cpu: 12.8,
            memory: 0.05,
            disk: 10.0,
            region: 1,
            price: 0.03,
            icon: 'RD',
            iconBg: '#DC382D',
            provider: 'aws',
          },
        },
        {
          id: 'mongodb',
          type: 'service',
          position: { x: 500, y: 350 },
          data: {
            name: 'Mongodb',
            status: 'error',
            cpu: 8.5,
            memory: 0.05,
            disk: 10.0,
            region: 1,
            price: 0.03,
            icon: 'MG',
            iconBg: '#47A248',
            provider: 'aws',
          },
        },
      ],
      edges: [
        { id: 'e1', source: 'service', target: 'postgres' },
        { id: 'e2', source: 'service', target: 'redis' },
        { id: 'e3', source: 'service', target: 'mongodb' },
      ],
    });
  }),
];
