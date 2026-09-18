import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// scan-suspicious-ignore-next-line
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

registerSW({ immediate: true });
