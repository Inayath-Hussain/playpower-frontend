import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './reset.css'
import { TimeZonesContextProvider } from './contexts/timezones.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <TimeZonesContextProvider>
      <App />
    </TimeZonesContextProvider>

  </React.StrictMode>,
)
