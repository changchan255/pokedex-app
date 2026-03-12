import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TeamProvider } from "./context/TeamContext";
import { ThemeProvider } from "./context/ThemeContext";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TeamProvider>
        <App />
    </TeamProvider>
    </ThemeProvider>
  </StrictMode>,
)
