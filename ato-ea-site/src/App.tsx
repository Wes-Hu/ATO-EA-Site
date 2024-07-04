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
      <header className="fixed top-0 left-0 w-screen h-28 bg-azure px-3 xl:px-0  flex flex-row justify-evenly items-center z-50">
        <a href="/" className="HomeButton flex flex-row gap-2">
          <div className="Image w-40 h-14" style={{ backgroundImage: "url('/src/assets/ATOLogo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
          <div className="h-14 flex flex-col">
            <div className="text-white text-xl font-bold font-['Arial']">Epsilon</div>
            <div className="text-white text-xl font-bold font-['Arial']">Alpha</div>
          </div>
        </a>
        <div className="MainBar h-full hidden lg:flex flex-row flex-wrap justify-center items-center">
          <a href="/about-us" className="relative h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold group">
            <p>ABOUT US</p>
            <div className="absolute top-full left-0 bg-dark-blue text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <a href="/history" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">HISTORY</a>
              <a href="/chapter-values" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">CHAPTER VALUES</a>
              <a href="/leadership" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">LEADERSHIP</a>
              <a href="/recent" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">RECENT NEWS</a>
            </div>
          </a>
          <a href="/membership" className="relative h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold group">
            <p>MEMBERSHIP</p>
            <div className="absolute top-full left-0 bg-dark-blue text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <a href="/how-to-join" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">HOW TO JOIN</a>
              <a href="/rush" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">RUSH & RECRUITMENT</a>
              <a href="/faq" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">FAQ</a>
            </div>
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
        <a href="/login" className="relative  h-1/2 cus:h-full hidden lg:flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium font-['Arial'] ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold group">
            <p>LOGIN</p>
            <div className="absolute top-full left-0 bg-dark-blue text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <a href="https://portal.ato.org/" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">MEMBER PORTAL</a>
              <a href="" className="block px-4 py-2 text-white text-lg font-medium font-['Arial'] hover:bg-azure hover:text-old-gold">ADMIN PORTAL</a>
            </div>
          </a>
        <button onClick={toggleMenu} className="Menu cursor-pointer flex lg:hidden h-6 w-8 items-center justify-center">
          <div className={`space-y-2.5 ${menuOpen ? 'open' : ''}`}>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform translate-y-3 rotate-45' : ''}`}></span>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform scale-0' : ''}`}></span>
            <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform -translate-y-3 -rotate-45' : ''}`}></span>
          </div>
        </button>

      </header>
      <div className="pt-28"> {/* Add padding to avoid content being hidden behind the fixed header */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <footer className="w-screen h-28 mt-20 flex flex-col gap-2 justify-center items-center bg-old-gold">
        <div className="CR text-nowrap text-dark-blue text-sm font-normal font-['Arial'] leading-tight">© 2024 ATO Epsilon Alpha. All rights reserved</div>
        <div className="CR text-nowrap text-dark-blue text-sm font-normal font-['Arial'] leading-tight">Website created by ATO member Wesley Hu.</div>
      </footer>
    </>
  );
}

export default App;
