import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';

function initAgentation() {
  if (document.getElementById('agentation-mount-point')) return;

  const container = document.createElement('div');
  container.id = 'agentation-mount-point';
  document.body.appendChild(container);

  // Dynamic endpoint so it works both on localhost and local network IP
  const hostname = window.location.hostname || 'localhost';
  const endpoint = `http://${hostname}:4747`;

  const root = ReactDOM.createRoot(container);
  root.render(
    React.createElement(Agentation, {
      endpoint: endpoint,
      appName: 'JIIT IMC 2026',
      enableKeyboardShortcuts: true,
      copyToClipboard: true,
    })
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAgentation);
} else {
  initAgentation();
}
