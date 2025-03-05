import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './utilities/ThemeContext.jsx'
import { Provider } from 'react-redux'
import cartStore from './store/Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={cartStore}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
