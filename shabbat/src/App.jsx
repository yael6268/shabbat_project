import { useState } from 'react'
import { Home } from './components/Home'
import { CookList } from "./components/CookList";
import { EditCook } from "./components/EditCook";
// import { Cooking } from "./components/Cooking";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ShopingList } from './components/ShopingList';
import { TaskList } from "./components/taskList";

import { EditTask } from "./components/editTask";

import {AllShoping} from "./components/allShoping";
// import { Cooking } from "./components/Cooking";
import { Shoping } from './components/shoping';
import './App.css'
import './shabbat.css'


function App() {
  const [showbasics, setShowBasics] = useState(false);
  // const [showbasicShoping, setShowbasicShoping] = useState(false);

  // const showbasicShoping = () => {
  //   setShowBasics(!showbasics);
  // //  setShowBasics(false);

  // }

  // const showbasicShoping = () => {
  //   ShopingList()

  // }
  // const [count, setCount] = useState(0)
  return (
    <>
      {/* <Home/>
      <CookList/>
      <EditCook/> */}
      <BrowserRouter>
        <div className="app">
          {/* Header יופיע בכל העמודים */}
          <Header />

          {/* התוכן משתנה לפי הנתיב */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cook-list" element={<CookList />} />
              <Route path="/edit-cook" element={<EditCook />} />
              <Route path="/shoping-list" element={<ShopingList />} />
              <Route path="/edit-tasks" element={<TaskList selectPlace="atHome" />} />
              <Route path="/task-list" element={<EditTask />} />
              <Route path="/all-shoping" element={<AllShoping />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      {/* <Home/> */}
      {/* <CookList/> */}
      {/* <TaskList/> */}
      {/* <Cooking/> */}
      {/* <Home /> */}
      {/* <CookList /> */}
      <div>
        {/* <button onClick={showbasicShoping}>{showbasics ? ' hide ' : ' show '} קניות בסיסיות </button> */}
        {/* <Cooking/> */}</div>
      {/* {showbasics && <ShopingList showOnly={false} /> }  */}

    </>
  )
}



export default App
