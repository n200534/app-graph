import { setupWorker } from 'msw/browser';
import { handlers } from '../mocks/Handler';

export const worker = setupWorker(...handlers);
