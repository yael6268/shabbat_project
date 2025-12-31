import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Home } from './components/home.jsx'
// import { Shoping } from './components/shoping.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Home/>   */}
    {/* <Shoping/> */}
  </StrictMode>,

)
