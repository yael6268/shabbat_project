import { useState } from 'react'
import { Home} from './components/Home'
import { CookList } from "./components/CookList";
import { TaskList } from "./components/taskList";
// import { Cooking } from "./components/Cooking";

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <CookList/>
      <TaskList/>
      {/* <Cooking/> */}
    </>
  )
}

export default App
