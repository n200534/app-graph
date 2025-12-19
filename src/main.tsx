import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './app/Providers';
import '@xyflow/react/dist/style.css';



async function enableMocking() {
  // Start MSW when in dev, or when VITE_ENABLE_MOCKS is set to 'true'
  const enableMocks = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';
  if (enableMocks) {
    try {
      const { worker } = await import('./mocks/Browser.ts');
      // In deployed environments, avoid noisy warnings for navigation or asset requests
      // that we don't explicitly mock by bypassing unhandled requests.
      await worker.start({ onUnhandledRequest: 'bypass' });
      console.info('MSW worker started (mocks enabled)');
    } catch (err) {
      // log the error so deployed console shows why MSW failed
      // common issue: /mockServiceWorker.js 404 because it's not deployed to site root
      console.error('Failed to start MSW worker', err);
    }
  }
}

enableMocking();


createRoot(document.getElementById('root')!).render(
  <Providers>
  <StrictMode>
    <App />
  </StrictMode>,
  </Providers>
)
