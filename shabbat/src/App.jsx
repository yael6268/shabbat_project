import { useState } from 'react'
import { Home } from './components/Home'
import { CookList } from "./components/CookList";
import { EditCook } from "./components/EditCook";
// import { Cooking } from "./components/Cooking";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ShopingList } from './components/ShopingList';
import { TaskList } from "./components/taskList";
import { EditShoping } from './components/editShoping';
import { EditTask } from "./components/editTask";
import {AllShoping} from "./components/allShoping";
// import { Cooking } from "./components/Cooking";
// import { Shoping } from './components/shoping';
import './App.css'
// import './shabbat.css'
import './style.css'
import { ShabbatProvider, useShabbat } from './context/ShabbatContext';


function RoutesWithContext() {
  const { shabbatDetails } = useShabbat();

  const shopingSelect = (() => {
    if (!shabbatDetails) return undefined;
    if (shabbatDetails.place === 'מארחים') return 'guest';
    if (shabbatDetails.place === 'נוסעים') return 'stay';
    if (shabbatDetails.place === 'בבית') return 'basic';
    if (shabbatDetails.meals === '1') return 'first';
    // if (shabbatDetails.meals === '1') return 'basic';
    if (shabbatDetails.meals === '2') return 'second';
    if (shabbatDetails.meals === '3') return 'third';
    return 'stay';
  })();

  const taskSelect = (() => {
    if (!shabbatDetails) return undefined;
    if (shabbatDetails.place === 'נוסעים') return 'travel';
    if (shabbatDetails.hospitality === 'ארוח') return 'hospitality';
    return 'atHome';
  })();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cook-list" element={<CookList />} />
      <Route path="/edit-cook" element={<EditCook />} />
      <Route path="/shoping-list" element={<ShopingList selectType={shopingSelect} />} />
      <Route path="/edit-tasks" element={<TaskList selectPlace={taskSelect} />} />
      <Route path="/edit-shoping" element={<EditShoping  />} />
      <Route path="/task-list" element={<EditTask />} />
      <Route path="/all-shoping" element={<AllShoping />} />
    </Routes>
  );
}


function App() {
  return (
    <>
      <ShabbatProvider>
        <BrowserRouter>
          <div className="app">
            {/* Header יופיע בכל העמודים */}
            <Header />
            {/* התוכן משתנה לפי הנתיב */}
            <main className="main-content">
              <RoutesWithContext />
            </main>
          </div>
        </BrowserRouter>
      </ShabbatProvider>
    </>
  )
}


export default App
