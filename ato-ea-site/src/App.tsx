import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-screen h-28 bg-azure px-8 flex flex-row justify-evenly items-center z-50">
        <a href="/" className="HomeButton flex flex-row">
          <div className="Image w-40 h-14" style={{ backgroundImage: "url('/src/assets/ATOLogo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
          <div className="h-14 flex flex-col">
            <div className="text-white text-xl font-bold font-['Arial']">&nbsp;Epsilon</div>
            <div className="text-white text-xl font-bold font-['Arial']">&nbsp;Alpha</div>
          </div>
        </a>
        <div className="MainBar h-full hidden md:flex flex-row flex-wrap justify-center items-center">
          <a href="/" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>ABOUT US</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>MEMBERSHIP</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>PHILANTHROPY</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>GALLERY</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>ALUMNI</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>CONTACT</p>
          </a>
          <a href="/" className="h-1/2 cus:h-full  flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <p>JOIN US</p>
          </a>

        </div>
        <button onClick={toggleMenu} className="Menu cursor-pointer flex md:hidden h-6 w-8 items-center justify-center">
          <div className={`space-y-2.5 ${menuOpen ? 'open' : ''}`}>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform translate-y-3 rotate-45' : ''}`}></span>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform scale-0' : ''}`}></span>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform -translate-y-3 -rotate-45' : ''}`}></span>
          </div>
        </button>
        <div className="w-6 h-6 bg-white hidden md:flex">
        </div>
      </header>
      <div className="pt-28"> {/* Add padding to avoid content being hidden behind the fixed header */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
