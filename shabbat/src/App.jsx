import { useState } from 'react'
import { Home } from './components/Home'
import { CookList } from "./components/CookList";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ShopingList } from './components/ShopingList';
import { TaskList } from "./components/taskList";
// import { Cooking } from "./components/Cooking";

import './App.css'
import './shabbat.css'
import { Shoping } from './components/shoping';

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
 <BrowserRouter>
      <div className="app">
        {/* Header יופיע בכל העמודים */}
        <Header />
        
        {/* התוכן משתנה לפי הנתיב */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cook-list" element={<CookList />} />
            <Route path="/shopping-list" element={<ShopingList  />} />
            <Route path="/task-list" element={<TaskList  />} />

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
