import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './app/Providers';
import '@xyflow/react/dist/style.css';



async function enableMocking() {
  if (import.meta.env.DEV) {
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
