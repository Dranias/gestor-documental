import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Modal from 'react-modal';
import { SearchProvider } from './SearchContext.jsx';

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </React.StrictMode>,
)
