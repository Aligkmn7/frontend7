import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 ile birlikte 'react-dom/client' import edilmelidir.
import './global.css'; // Global stil dosyası
import App from './App'; // Ana uygulama bileşeni

// React 18'de createRoot ile uygulama render edilir.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
