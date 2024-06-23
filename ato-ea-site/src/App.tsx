import {Route, Routes} from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
      <header className="sticky w-screen h-28 bg-azure px-3 md:px-8 flex flex-row justify-between items-center">
        <a href="/" className="HomeButton flex flex-row">
          <img className="w-40 h-14" src="src/assets/ATOLogo.png"/>
          <div className="flex flex-col">
            <div className="text-white text-xl font-medium font-['Arial']">Epsilon</div>
            <div className="text-white text-xl font-medium font-['Arial']">Alpha</div>           
          </div>
        </a>
      </header>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App
