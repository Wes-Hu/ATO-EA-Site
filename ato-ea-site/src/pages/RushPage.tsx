import { useState, useEffect } from "react";
import { useDataContext } from "../utils/DataContext";
import { motion } from "framer-motion";

function RushPage() {
    const [season, setSeason] = useState('');
    const currentYear = new Date().getFullYear();
    const { rushImage } = useDataContext();
    useEffect(() =>{
        const currentMonth = new Date().getMonth();
        if (currentMonth >= 0 && currentMonth <= 5) {
            setSeason('Spring');
          } else {
            setSeason('Fall');
          }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center px-3 md:px-10 lg:px-24 xl:px-60 2xl:px-96">
            <h1 className="text-black text-center text-4xl md:text-5xl font-bold mt-10 mb-20">{season} {currentYear} Rush Schedule</h1>
            <motion.img initial={{y: '100%' ,scale: 0 }} animate={{y: '0%', scale: 1 }} transition={{ duration: 1.8, ease: 'backInOut' }} className="w-screen 2xl:w-3/5" src={rushImage}></motion.img>
            <div></div>
        </div>
    );
}
export default RushPage;