import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SearchContextProvider } from './components/context/SearchContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <SearchContextProvider>
    <App />
  </SearchContextProvider>
);
