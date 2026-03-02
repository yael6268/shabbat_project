import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
// Home is not rendered here; use routes inside App if needed
// import { Home } from './components/home.jsx'
// import { Shoping } from './components/shoping.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Home/>   */}
    {/* <Shoping/> */}
  </StrictMode>,

)
