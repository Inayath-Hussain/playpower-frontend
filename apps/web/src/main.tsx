import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './reset.css'
import { TimeZonesContextProvider } from './contexts/timezones.tsx'
import { UnixContextProvider } from './contexts/unix.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <UnixContextProvider>
      <TimeZonesContextProvider>
        <App />
      </TimeZonesContextProvider>
    </UnixContextProvider>

  </React.StrictMode>,
)
