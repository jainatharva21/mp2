import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {PokemonProvider} from './PokemonContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </BrowserRouter>
  </StrictMode>,
);
