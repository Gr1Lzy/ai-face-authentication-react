import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css'; // Import the global CSS file
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
