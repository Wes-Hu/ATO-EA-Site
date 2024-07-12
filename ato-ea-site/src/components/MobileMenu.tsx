import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronRight } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    const [currentMenu, setCurrentMenu] = useState("main"); //track menu

    //close menu when screen gets too large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                onClose();
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [onClose]);

    // Reset to main menu when the menu closes
    useEffect(() => {
        if (!open) {
            setCurrentMenu("main");
        }
    }, [open]);

    //settings for animation
    const dropIn = {
        hidden: {
            y: "-100%",
            opacity: 1,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        exit: {
            y: "-100%",
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
    };
    

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed top-28 left-0 z-40 w-screen flex justify-center items-center h-auto"
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {currentMenu === "main" && (
                        <div className="w-screen md:w-4/5 flex flex-col justify-center items-center border-2 border-old-gold bg-azure">
                            <div className="w-full px-3 flex flex-col justify-center">
                                <h1 className="mt-2 mb-2 text-center text-white text-xl font-medium">MENU </h1>
                                <hr className="border-t-2 border-old-gold" />
                            </div>                        
                            <div className="w-full mt-2 mb-2 px-3 flex flex-col gap-2">
                                <div className="flex flex-row items-center text-white justify-between">
                                    <a href="/login" className="w-4/5 text-white text-lg font-medium">LOGIN</a>
                                    <button onClick={() => setCurrentMenu("loginMenu")}><BsChevronRight size={23}/></button>
                                </div>
                                <hr className="border-t-2 border-old-gold" />
                                <div className="flex flex-row items-center text-white justify-between">
                                    <a href="/login" className="w-4/5 text-white text-lg font-medium">ABOUT US</a>
                                    <button onClick={() => setCurrentMenu("aboutMenu")}><BsChevronRight size={23}/></button>
                                </div>
                                <hr className="border-t-2 border-old-gold" />
                                <div className="flex flex-row items-center text-white justify-between">
                                    <a href="/login" className="w-4/5 text-white text-lg font-medium">MEMBERSHIP</a>
                                    <button onClick={() => setCurrentMenu("membershipMenu")}><BsChevronRight size={23}/></button>
                                </div>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/philanthropy" className="text-white text-lg font-medium">PHILANTHROPY</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/recent-news" className="text-white text-lg font-medium">RECENT NEWS</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/" className="text-white text-lg font-medium">ALUMNI</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/" className="text-white text-lg font-medium">CONTACT</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/" className="text-white text-lg font-medium">JOIN US</a>
                            </div>
                        </div>
                    )}
                    {currentMenu === "loginMenu" && (
                        <div className="w-screen md:w-4/5 flex flex-col justify-center items-center border-2 border-old-gold bg-azure">
                            <div className="w-full px-3 flex flex-col justify-center">
                                <div className="w-full flex flex-row justify-center relative">
                                    <button onClick={() => setCurrentMenu("main")} className="absolute left-0 top-2.5 text-white"><GoArrowLeft size={23}/></button>
                                    <h1 className="mt-2 mb-2 text-center text-white text-xl font-medium">LOGIN</h1>
                                </div>
                                
                                <hr className="border-t-2 border-old-gold" />
                            </div>                        
                            <div className="w-full mt-2 mb-2 px-3 flex flex-col gap-2">
                                <a href="https://portal.ato.org/" className="text-white text-lg font-medium">MEMBER PORTAL</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/admin" className="text-white text-lg font-medium">ADMIN PORTAL</a>
                            </div>
                        </div>
                    )}
                    {currentMenu === "aboutMenu" && (
                        <div className="w-screen md:w-4/5 flex flex-col justify-center items-center border-2 border-old-gold bg-azure">
                            <div className="w-full px-3 flex flex-col justify-center">
                                <div className="w-full flex flex-row justify-center relative">
                                    <button onClick={() => setCurrentMenu("main")} className="absolute left-0 top-2.5 text-white"><GoArrowLeft size={23}/></button>
                                    <h1 className="mt-2 mb-2 text-center text-white text-xl font-medium">ABOUT US</h1>
                                </div>
                                
                                <hr className="border-t-2 border-old-gold" />
                            </div>                        
                            <div className="w-full mt-2 mb-2 px-3 flex flex-col gap-2">
                                <a href="/history" className="text-white text-lg font-medium">HISTORY</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/chapter-values" className="text-white text-lg font-medium">CHAPTER VALUES</a>
                                <hr className="border-t-2 border-old-gold w-full" /> 
                                <a href="/leadership" className="text-white text-lg font-medium">LEADERSHIP</a>
                            </div>
                        </div>
                    )}
                    {currentMenu === "membershipMenu" && (
                        <div className="w-screen md:w-4/5 flex flex-col justify-center items-center border-2 border-old-gold bg-azure">
                            <div className="w-full px-3 flex flex-col justify-center">
                                <div className="w-full flex flex-row justify-center relative">
                                    <button onClick={() => setCurrentMenu("main")} className="absolute left-0 top-2.5 text-white"><GoArrowLeft size={23}/></button>
                                    <h1 className="mt-2 mb-2 text-center text-white text-xl font-medium">MEMBERSHIP</h1>
                                </div>
                                
                                <hr className="border-t-2 border-old-gold" />
                            </div>                        
                            <div className="w-full mt-2 mb-2 px-3 flex flex-col gap-2">
                                <a href="/how-to-join" className="text-white text-lg font-medium">HOW TO JOIN</a>
                                <hr className="border-t-2 border-old-gold w-full" />
                                <a href="/rush" className="text-white text-lg font-medium">RUSH & RECRUITMENT</a>
                                <hr className="border-t-2 border-old-gold w-full" /> 
                                <a href="faq" className="text-white text-lg font-medium">FAQ</a>
                                </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
