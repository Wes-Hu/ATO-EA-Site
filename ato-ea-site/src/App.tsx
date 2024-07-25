import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import MobileMenu from "./components/MobileMenu";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { DataProvider } from "./utils/DataContext";
import RecentNewsPage from "./pages/RecentNewsPage";
import HistoryPage from "./pages/HistoryPage";
import ChapterValuesPage from "./pages/ChapterValuesPage";
import LeadershipPage from "./pages/LeadershipPage";
import HowToJoinPage from "./pages/HowToJoinPage";
import RushPage from "./pages/RushPage";
import ContactPage from "./pages/ContactPage";
import PhilanthropyPage from "./pages/PhilanthropyPage";
import JoinUsPage from "./pages/JoinUsPage";
import AlumniPage from "./pages/AlumniPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOnClose = () => setMenuOpen(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 w-screen h-28 bg-azure px-3 md:px-20 lg:px-3 xl:px-0 flex flex-row justify-between lg:justify-evenly items-center z-50">
          <a href="/" className="HomeButton flex flex-row gap-2">
            <div className="Image w-40 h-14" style={{ backgroundImage: "url('/src/assets/ATOLogo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
            <div className="h-14 flex flex-col">
              <div className="text-white text-xl font-bold">Epsilon</div>
              <div className="text-white text-xl font-bold">Alpha</div>
            </div>
          </a>
          <div className="MainBar h-full hidden lg:flex flex-row flex-wrap justify-center items-center">
            <div className="relative group h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <div className="relative w-full h-full flex items-center cursor-pointer">ABOUT US</div>
              <div className="absolute top-full left-0 max-h-0 overflow-hidden group-hover:max-h-96 bg-azure text-black shadow-lg transition-all duration-300 ease-in-out">
                <a href="/history" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300">HISTORY</a>
                <a href="/chapter-values" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300">CHAPTER VALUES</a>
                <a href="/leadership" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300">LEADERSHIP</a>
              </div>
            </div>
            <div className="relative group h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <div className="relative w-full h-full flex items-center cursor-pointer">MEMBERSHIP</div>
              <div className="absolute top-full left-0 max-h-0 overflow-hidden group-hover:max-h-96 bg-azure text-black shadow-lg transition-all duration-300 ease-in-out">
                <a href="/how-to-join" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300">HOW TO JOIN</a>
                <a href="/rush" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300">RUSH & RECRUITMENT</a>
              </div>
            </div>
            <a href="/philanthropy" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <p>PHILANTHROPY</p>
            </a>
            <a href="recent-news" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <p>RECENT NEWS</p>
            </a>
            <a href="/alumni" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <p>ALUMNI</p>
            </a>
            <a href="/contact-us" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <p>CONTACT</p>
            </a>
            <a href="/join-us" className="h-1/2 cus:h-full flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
              <p>JOIN US</p>
            </a>
          </div>
          <div className="relative group h-1/2 cus:h-full hidden lg:flex justify-center items-center px-4 text-nowrap text-white text-lg font-medium ease-in-out duration-300 transition-all hover:bg-dark-blue hover:text-old-gold">
            <div className="relative w-full h-full flex items-center cursor-pointer">LOGIN</div>
            <div className="absolute top-full left-0 max-h-0 overflow-hidden group-hover:max-h-96 bg-azure text-black shadow-lg transition-all duration-300 ease-in-out">
              <a href="https://portal.ato.org/" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300 text-wrap">MEMBER PORTAL</a>
              <a href="/admin" className="block px-4 py-2 text-white text-lg font-medium hover:bg-dark-blue hover:text-old-gold transition-all duration-300 text-wrap">ADMIN PORTAL</a>
            </div>
          </div>
          <button onClick={toggleMenu} className="Menu cursor-pointer flex lg:hidden h-6 w-8 items-center justify-center">
            <div className={`space-y-2.5 ${menuOpen ? 'open' : ''}`}>
              <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform translate-y-3 rotate-45' : ''}`}></span>
              <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform scale-0' : ''}`}></span>
              <span className={`menu-line block h-0.5 w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${menuOpen ? 'transform -translate-y-3 -rotate-45' : ''}`}></span>
            </div>
          </button>
        </header>
        <MobileMenu open={menuOpen} onClose={handleOnClose}/>
        <main className="flex-grow pt-28">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recent-news" element={<RecentNewsPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/chapter-values" element={<ChapterValuesPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/how-to-join" element={<HowToJoinPage />} />
            <Route path="/rush" element={<RushPage />} />
            <Route path="/philanthropy" element={<PhilanthropyPage />} />
            <Route path="/alumni" element={<AlumniPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/join-us" element={<JoinUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="w-full h-28 mt-20 flex flex-col gap-2 justify-center items-center bg-old-gold">
          <div className="CR text-nowrap text-black text-sm font-normal leading-tight hover:text-dark-blue transition-all duration-300 ease-in-out">© 2024 ATO Epsilon Alpha. All rights reserved</div>
          <div className="CR text-nowrap text-black text-sm font-normal leading-tight hover:text-dark-blue transition-all duration-300 ease-in-out">Website created by ATO member Wesley Hu.</div>
        </footer>
      </div>
    </DataProvider>
  );
}

export default App;
