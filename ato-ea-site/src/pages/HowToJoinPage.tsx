import { useState, useEffect, useRef} from 'react';
import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useDataContext } from '../utils/DataContext';


function HowToJoinPage() {
    const { exec } = useDataContext();
    const [activeSection, setActiveSection] = useState('');

   
    useEffect(() => {
        const handleScroll = () => {

            const sections = ['RushWeek', 'PledgeExperience', 'Initiation', 'FAQ'];
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
            
            <div id="SideBar" className="w-screen 2xl:w-3/5 px-3 mt-10 md:px-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-2 mb-10">
                <div className="w-screen hidden md:w-[25%] md:flex flex-col">
                    <Sticky enabled={true} top={140}>
                        <div data-aos="fade-right" className="w-4/5 flex flex-col gap-3">
                            <ScrollSpy>
                                <ul className="nav-list flex flex-col gap-3">
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#RushWeek" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'RushWeek' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Rush Week</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'RushWeek' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#PledgeExperience" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'PledgeExperience' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Pledge Experience</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'PledgeExperience' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className={`w-full h-2 bg-old-gold origin-left`}></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#Initiation" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'Initiation' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Initiation</motion.div>
                                        </motion.a>
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'Initiation' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#FAQ" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'FAQ' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">FAQ</motion.div>
                                        </motion.a>
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'FAQ' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                </ul>
                            </ScrollSpy>
                            
                        </div>
                    </Sticky>
                </div>
                <div className="w-full md:w-[75%] flex flex-col gap-20">
                    <div data-aos="zoom-in"  id="RushWeek" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-5xl font-bold mb-10">The Creed of Alpha Tau Omega</h1>
                        <p className=" text-white text-xl font-medium leading-loose">To bind men together in a brotherhood based upon eternal and immutable principles, with a bond as strong as right itself and as lasting as humanity; to know no North, no South, no East, no West, but to know man as man, to teach that true men the world over should stand together and contend for supremacy of good over evil; to teach, not politics, but morals; to foster, not partisanship, but the recognition of true merit wherever found; to have no narrower limits within which to work together for the elevation of man than the outlines of the world: these were the thoughts and hopes uppermost in the minds of the founders of the Alpha Tau Omega Fraternity.<br/><br/>-Otis Allan Glazebrook<br/>1880</p>
                    </div>
                    <div id="PledgeExperience" className="h-screen bg-black flex flex-col justify-center items-center md:items-start gap-5">
                        
                    </div>
                    <div data-aos="zoom-in" id="Initiation" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Diversity, Equity, Inclusion, and Accessibility Position statement</h1>
                        <div className="flex flex-col lg:flex-row justify-center text-white items-center">

                            <p className="w-full text-white text-xl font-medium leading-loose">Alpha Tau Omega is a place of acceptance, where people from all backgrounds are welcome. We strive to uphold the highest standards when it comes to all aspects of inclusion and access as well as ensuring that we provide equal opportunities to everyone. We believe that diversity is critical to the fabric of our organization and therefore, it is and will always be a top priority</p>
                        </div>
                        
                    </div>
                    <div id="FAQ" className="h-screen bg-black"></div>
                </div>
            </div>
            <div className="w-screen md:h-96 bg-old-gold flex flex-col items-center justify-start">
                <h1 className="text-black text-5xl font-bold mt-10 text-center mb-10">Have More Questions?</h1>
                <p className="md:w-1/2 text-center text-black text-xl font-medium leading-loose mb-10">Contact our current recruitment chair {exec.find(member => member.position === 'Recruitment Chair')?.name} at <a href={`mailto:${exec.find(member => member.position === 'Recruitment Chair')?.email}`} className="hover:text-azure duration-300 transition-all ease-in-out">{exec.find(member => member.position === 'Recruitment Chair')?.email}</a> or visit our contact form</p>
                <a href="/contact-us" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue hover:text-old-gold">
                    <div className="text-xl text-nowrap font-medium leading-loose">Contact Form</div>
                </a>
            </div>
        </div>
    );
}

export default HowToJoinPage;
