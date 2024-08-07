import React from 'react'
import ReactDOM from 'react-dom/client'
import {NavigationProvider} from './components/router/navigation-context';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </React.StrictMode>,
)
