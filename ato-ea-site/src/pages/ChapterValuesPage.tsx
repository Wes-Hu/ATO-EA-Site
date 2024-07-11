import { useState, useEffect, useRef} from 'react';
import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUsers } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MdGroups, MdGroups3, MdHandshake } from 'react-icons/md';


function ChapterValuesPage() {
    const [activeSection, setActiveSection] = useState('');
    
    useEffect(() => {
        const handleScroll = () => {

            const sections = ['TheCreed', 'OurValues', 'DEIA'];
            let currentSection = '';

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    currentSection = section;
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const refs = Array.from({ length: 7 }, () => useRef(null));
    const inViews = refs.map(ref => useInView(ref, { once: false }));

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.split('#')[1];
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          const headerOffset = 140;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
            once: true, // Ensures the animation happens only once
        });
    }, []);

    return (
        <div id="ChapterValues" className="flex flex-col justify-center items-center">
            <div id="Image" className="w-screen h-[60vh] mb-24 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(src/assets/ATOHouse.png)` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-4xl font-bold leading-9">Chapter Values</div>
                    </div>
                </div>
            </div>
            <div id="SideBar" className="w-screen 2xl:w-3/5 px-3 mt-10 md:px-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-2 mb-10">
                <div className="w-screen hidden md:w-[25%] md:flex flex-col">
                    <Sticky enabled={true} top={140}>
                        <div data-aos="fade-right" className="w-4/5 flex flex-col gap-3">
                            <ScrollSpy>
                                <ul className="nav-list flex flex-col gap-3">
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#TheCreed" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'TheCreed' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">The Creed</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'TheCreed' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#OurValues" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'OurValues' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Our Values</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'OurValues' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className={`w-full h-2 bg-old-gold origin-left`}></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#DEIA" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'DEIA' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">DEIA Statement</motion.div>
                                        </motion.a>
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'DEIA' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                </ul>
                            </ScrollSpy>
                            
                        </div>
                    </Sticky>
                </div>
                <div className="w-[75%] md:w-full flex flex-col gap-20">
                    <div data-aos="zoom-in"  id="TheCreed" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-5xl font-bold mb-10">The Creed of Alpha Tau Omega</h1>
                        <p className=" text-white text-xl font-medium leading-loose">To bind men together in a brotherhood based upon eternal and immutable principles, with a bond as strong as right itself and as lasting as humanity; to know no North, no South, no East, no West, but to know man as man, to teach that true men the world over should stand together and contend for supremacy of good over evil; to teach, not politics, but morals; to foster, not partisanship, but the recognition of true merit wherever found; to have no narrower limits within which to work together for the elevation of man than the outlines of the world: these were the thoughts and hopes uppermost in the minds of the founders of the Alpha Tau Omega Fraternity.<br/><br/>-Otis Allan Glazebrook<br/>1880</p>
                    </div>
                    <div id="OurValues" className="flex flex-col justify-center items-start gap-5">
                        <div data-aos="zoom-in">
                            <h1 className="text-5xl font-bold mb-5">Our Values</h1>
                            <p className="text-xl font-medium leading-loose">At the Epsilon Alpha chapter of Alpha Tau Omega, our core values are the foundation of our brotherhood. They guide our actions, shape our community, and inspire us to make a positive impact. Here are the values that define who we are:</p>
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row justify-start items-start">
                            <div className="w-40 h-40 bg-old-gold rounded-tl-3xl rounded-bl-3xl flex items-center justify-center text-azure">
                                <MdHandshake size={100}/>
                            </div>
                            <motion.div ref={refs[0]} initial={{ scaleX: 0 }} animate={{ scaleX: inViews[0] ? 1 : 0 }} transition={{ duration: 1 }} className="w-4/5 h-40 bg-azure rounded-tr-3xl rounded-br-3xl origin-left">
                            </motion.div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row justify-start items-start">
                            <motion.div ref={refs[1]} initial={{ scaleX: 0 }} animate={{ scaleX: inViews[1] ? 1 : 0 }} transition={{ duration: 1 }} className="w-4/5 h-40 bg-azure rounded-tl-3xl rounded-bl-3xl origin-right">
                            </motion.div>
                            <div className="w-40 h-40 bg-old-gold rounded-tr-3xl rounded-br-3xl flex items-center justify-center text-azure">
                                <MdGroups size={100}/>
                            </div>
                        </div>
                        

                    </div>
                    <div data-aos="zoom-in" id="DEIA" className="bg-azure mb-96 p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Diversity, Equity, Inclusion, and Accessibility Position statement</h1>
                        <div className="flex flex-col lg:flex-row justify-center text-white items-center gap-10">
                            <MdGroups3 className='w-full md:w-1/4' size={200}/>
                            <p className="w-full md:w-3/4 text-white text-xl font-medium leading-loose">Alpha Tau Omega is a place of acceptance, where people from all backgrounds are welcome. We strive to uphold the highest standards when it comes to all aspects of inclusion and access as well as ensuring that we provide equal opportunities to everyone. We believe that diversity is critical to the fabric of our organization and therefore, it is and will always be a top priority</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterValuesPage;
