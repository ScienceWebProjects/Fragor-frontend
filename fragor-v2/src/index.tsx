import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import MediaLook from 'components/ui/MediaLook/MediaLook';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MediaLook>
      <App />
    </MediaLook>
  </React.StrictMode>
);

reportWebVitals();
