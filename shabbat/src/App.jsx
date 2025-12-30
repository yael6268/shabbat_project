import { useState } from 'react'
import { Home} from './components/Home'
import { CookList } from "./components/CookList";
// import { Cooking } from "./components/Cooking";

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <CookList/>
      {/* <Cooking/> */}
    </>
  )
}

export default App
