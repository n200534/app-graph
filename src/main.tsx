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
    const { worker } = await import('./mocks/Browser.ts');
    return worker.start();
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
