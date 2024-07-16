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
            <h1 className="text-center mt-10 mb-5 text-black text-5xl font-bold">Interested in Joining?</h1>
            <p className="w-screen lg:w-1/2 mb-10 text-center text-black text-xl font-medium">If you're seeking a place to belong, have fun, and grow alongside like-minded individuals in meaningful ways, Alpha Tau Omega is that place. As America’s Leadership Development Fraternity, ATO offers a unique fraternity experience and a tremendous opportunity for young men.</p>
            <a href="/join-us" className="h-14 mb-20 flex px-5 justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                <div className=" text-xl font-medium leading-loose">Join Us</div>
            </a>
            <div className="w-screen h-28 mb-28 bg-azure items-center flex justify-center text-center text-white font-bold text-4xl md:text-5xl">How To Join ATO</div>
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
                        <h1 className="text-white text-5xl font-bold mb-10">Rush Week</h1>
                        <p className=" text-white text-xl font-medium leading-loose mb-10">Each semester, ATO hosts a series of rush events designed to help you get to know our members and understand what our fraternity stands for. These events are a great opportunity to meet current brothers, ask questions, and see if ATO is the right fit for you. Our rush week always concludes with a fun invite only event as well as bid dinner where you will receive an official invitation to become a member. Bid dinner is a celebration where you will meet all of your new brothers and begin your journey with ATO.</p>
                        <a href="/rush" className="w-auto px-5 h-auto py-2 md:py-0 md:h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium text-center">View Current Rush Schedule</div>
                        </a>
                    </div>
                    <div id="PledgeExperience" className="flex flex-col justify-center items-start">
                        <div data-aos="zoom-in">
                            <h1 className="text-black mb-10 text-5xl font-bold">Pledge Experience</h1>
                            <p className="text-black text-xl font-medium leading-loose mb-10">At Alpha Tau Omega, the pledge experience is designed to introduce new members to the values, traditions, and brotherhood that define our fraternity. This journey is an opportunity for personal growth, leadership development, and forging lifelong friendships.</p>
                        </div>
                        
                    </div>
                    <div data-aos="zoom-in" id="Initiation" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Initiation and Membership Requirements</h1>
                        <p className="w-full text-white text-xl text-left font-medium leading-loose mb-5">At the end of each semester, an initiation ceremony is held, welcoming pledges as newly initiated members and marking their official entry into our brotherhood. If a pledge chooses not to initiate or does not meet the membership requirements, they will not have to repeat a pledge semester but will rather become a NIM (non-initiated member) and will be considered apart of the chapter, but are not recognized as a full initiated member.</p>
                        <div className="flex justify-center text-white items-center">
                            <div className="text-white text-2xl font-bold leading-9">Membership Requirements</div>
                            <div className="w-96 h-56"><span className="text-white text-xl font-medium font-['Inter'] leading-loose">To ensure a smooth transition and active participation in our fraternity, please note the following requirements:<br/></span><span className="text-white text-xl font-medium font-['Inter'] leading-loose">Academic Requirements: Minimum GPA of 2.5 is required for initiation and membership<br/>Financial Commitment: Membership dues are required each semester. Financial assistance is available for those in need.<br/>Active Participation: Regular attendance at chapter meetings and community service activities is expected. Ten total hours are required for initiation and 15 total hours are expected per semester.</span></div>
                        </div>
                        
                    </div>
                    <div id="FAQ" className="h-screen bg-black"></div>
                </div>
            </div>
            <div className="w-screen md:h-96 bg-old-gold flex flex-col items-center justify-start">
                <h1 className="text-black text-5xl font-bold mt-10 text-center mb-10">Have More Questions?</h1>
                <p className="md:w-1/2 text-center text-black text-xl font-medium leading-loose mb-10">Contact our current recruitment chair {exec.find(member => member.position === 'Recruitment Chair')?.name} at <a href={`mailto:${exec.find(member => member.position === 'Recruitment Chair')?.email}`} className="hover:text-azure duration-300 transition-all ease-in-out">{exec.find(member => member.position === 'Recruitment Chair')?.email}</a> or visit our contact form</p>
                <a href="/contact-us" className="w-auto px-5 h-14 mb-10 flex justify-center items-center text-black bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue hover:text-old-gold">
                    <div className="text-xl text-nowrap font-medium leading-loose">Contact Form</div>
                </a>
            </div>
        </div>
    );
}

export default HowToJoinPage;
