import { useState } from 'react'
import { Home } from './components/Home'
import { CookList } from "./components/CookList";

import { ShopingList } from "./components/shopingList";
// import { Cooking } from "./components/Cooking";

import './App.css'
import { Shoping } from './components/shoping';

function App() {
  const [showbasics, setShowBasics] = useState(false);
  // const [showbasicShoping, setShowbasicShoping] = useState(false);

  const showbasicShoping = () => {
    setShowBasics(!showbasics);
  //  setShowBasics(false);

  }
  
  // const showbasicShoping = () => {
  //   ShopingList()

  // }
  // const [count, setCount] = useState(0)
  return (
    <>
      <Home />
      <CookList />
      <div>
       <button onClick={showbasicShoping}>{showbasics ? ' hide ' : ' show '} קניות בסיסיות </button>
      {/* <Cooking/> */}</div>
      {showbasics && <ShopingList showOnly={false} /> } 

    </>
  );
}
 export default App
