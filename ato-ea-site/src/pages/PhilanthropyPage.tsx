import { useState, useEffect, useRef} from 'react';
import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useDataContext } from '../utils/DataContext';
import { Parallax } from 'react-parallax';


function PhilanthropyPage() {
    const { exec } = useDataContext();
    const [activeSection, setActiveSection] = useState('');

   
    useEffect(() => {
        const handleScroll = () => {

            const sections = ['Habitat', 'GiftOfLife', 'WheelToHeal', 'TrashCleanup'];
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
            <div id="Image" className="w-screen h-[60vh] mb-24 md:h-[80vh] relative bg-azure group">
                <div className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center bg-[url(src/assets/philo/Philo.jpg)]">
                    <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-4xl font-bold leading-9">Philanthropy</div>
                    </div>
                </div>
            </div>
            <p className="w-screen lg:w-1/2 mb-20 text-center text-black text-xl font-medium">For the brothers of the Epsilon Alpha chapter of Alpha Tau Omega, philanthropy embodies our commitment to give back to our community. Our brothers actively engage in servicing our local communities as well as national partnerships. Every school year we are proud to partner with Habitat for Humanity, Gift of Life, and the Colon Cancer Foundation. These partnerships highlight our commitment to service and display the profound impact we can make together.</p>
            <div id="SideBar" className="w-screen 2xl:w-3/5 px-3 mt-10 md:px-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-2 mb-10">
                <div className="w-screen hidden md:w-[25%] md:flex flex-col">
                    <Sticky enabled={true} top={140}>
                        <div data-aos="fade-right" className="w-4/5 flex flex-col gap-3">
                            <ScrollSpy>
                                <ul className="nav-list flex flex-col gap-3">
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#Habitat" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'Habitat' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Habitat for Humanity</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'Habitat' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#GiftOfLife" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'GiftOfLife' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Gift of Life</motion.div>
                                        </motion.a >
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'GiftOfLife' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className={`w-full h-2 bg-old-gold origin-left`}></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#WheelToHeal" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'WheelToHeal' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Wheel to Heal</motion.div>
                                        </motion.a>
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'WheelToHeal' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <motion.a layout href="#TrashCleanup" onClick={handleSmoothScroll}>
                                            <motion.div  initial={{ scale: 1 }} animate={{ scale: activeSection === 'TrashCleanup' ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="text-2xl origin-left mb-1">Trash Cleanup</motion.div>
                                        </motion.a>
                                        <AnimatePresence mode="popLayout">
                                            {activeSection === 'TrashCleanup' && (<motion.div initial={{scaleX:0,}} animate={{scaleX:1,}} exit={{scaleX:0,}} transition={{duration:0.3}} className="w-full h-2 bg-old-gold origin-left"></motion.div>)}
                                        </AnimatePresence>
                                    </li>
                                </ul>
                            </ScrollSpy>
                            
                        </div>
                    </Sticky>
                </div>
                <div className="w-full md:w-[75%] flex flex-col gap-20">
                    <div id="Habitat" className="">
                        <Parallax bgImage='src/assets/philo/Habitat.jpg' strength={500} bgImageStyle={{ objectFit: 'cover' }}  className="w-full h-[50vh] mb-10">
                            <div className="bg-azure bg-opacity-50 w-full h-28 text-white items-center flex justify-start px-3 text-5xl font-bold">Habitat for Humanity</div>
                        </Parallax>
                        <div className="w-full flex flex-col lg:flex-row px-3 md:px-0 gap-5">
                            <Parallax bgImage='src/assets/philo/hbt.jpg' strength={300} bgImageStyle={{ objectFit: 'cover' }} className="w-full lg:w-1/2 h-[40vh]"></Parallax>
                            <div className="w-full lg:w-1/2 text-black text-xl font-medium leading-loose">Our brothers at Alpha Tau Omega actively engage with Habitat for Humanity, contributing their time and effort to build homes for families in need. Through this partnership, we provide hands-on labor, working diligently to ensure that every family has a safe, affordable place to live. By participating in these builds, our members not only learn valuable skills and teamwork but also make a lasting impact on our community, fostering a sense of service and responsibility.</div>
                        </div>
                    </div>
                    <div id="GiftOfLife" className="">
                        <Parallax bgImage='src/assets/philo/gol.jpeg' strength={500} bgImageStyle={{ objectFit: 'cover' }}  className="w-full h-[50vh] mb-10">
                            <div className="bg-azure bg-opacity-50 w-full h-28 text-white items-center flex justify-start px-3 text-5xl font-bold">Gift of Life</div>
                        </Parallax>    
                        <div className="text-black text-xl font-medium leading-loose">Through our partnership with Gift of Life, we actively encourage our fellow students at the Colorado School of Mines to join the national bone marrow registry. By signing up, they become potential lifesavers, offering hope to patients in need of bone marrow transplants. Our chapter is dedicated to raising awareness about the critical need for bone marrow donors and the life-saving potential that each registration holds. Each semester, we set up a table on campus for a week to inform and register new donors. Our brothers engage with students, explaining the simple yet impactful process of joining the registry. By sharing the importance of bone marrow donations, we hope to inspire more individuals to participate and potentially save lives</div>                
                    </div>
                    <div id="WheelToHeal" className="">
                        <Parallax bgImage='src/assets/philo/wth.jpeg' strength={500} bgImageStyle={{ objectFit: 'cover' }}  className="w-full h-[50vh] mb-10">
                            <div className="bg-azure bg-opacity-50 w-full h-28 text-white items-center flex justify-start px-3 text-5xl font-bold">Wheel to Heal</div>
                        </Parallax>  
                        <div className="w-full flex flex-col-reverse lg:flex-row gap-5">
                            <div className="w-full lg:w-1/2 flex flex-col gap-5">
                                <div className="text-black text-xl font-medium font-['Inter'] leading-loose">We raise funds for the Colon Cancer Foundation through our annual signature bikeathon event Wheel to Heal. During this event, our brothers bike nonstop on stationary bikes, day and night, in the center of the Mines campus. Every donation increases the duration of the event, capping at two weeks. This continuous effort not only raises funds but also draws significant attention to the cause, engaging the entire campus community. Our involvement with the Colon Cancer Foundation allows our chapter to support research and education that prevents colon cancer and improves the lives of those affected by it.</div>
                                <img src="src/assets/philo/wth2.jpg" className="w-full"/>
                            </div>

                            <img src="src/assets/philo/WTHLogo.jpg" className="w-full lg:w-1/2 h-1/2"/>
                        </div>
                    </div>
                    <div id="TrashCleanup" className="flex flex-col mb-20">
                        <Parallax bgImage='src/assets/philo/cleanup.jpeg' strength={500} bgImageStyle={{ objectFit: 'cover' }}  className="w-full h-[50vh] mb-10">
                            <div className="bg-azure bg-opacity-50 w-full h-28 text-white items-center flex justify-start px-3 text-5xl font-bold">Trash Cleanup</div>
                        </Parallax> 
                        <div className="text-black text-xl font-medium leading-loose">In addition to our other philanthropic efforts, we actively participate in trash cleanups on local highways, Clear Creek, and nearby hiking trails. Our brothers regularly organize and join cleanup events to help maintain the natural beauty of our community. By removing litter and debris, we contribute to a healthier environment and ensure that these public spaces remain enjoyable for everyone. Our dedication to environmental stewardship reflects our commitment to preserving the natural surroundings of the Colorado School of Mines and fostering a cleaner, greener future.</div>                 
                    </div>
                </div>
            </div>
            <div className="w-screen md:h-96 bg-old-gold flex flex-col items-center justify-start">
                <h1 className="text-black text-5xl font-bold mt-10 text-center mb-10">Make a Difference with Us</h1>
                <p className="md:w-1/2 text-center text-black text-xl font-medium leading-loose mb-10">Contact our current Philanthropy Chair {exec.find(member => member.position === 'Philanthropy Chair')?.name} at <a href={`mailto:${exec.find(member => member.position === 'Philanthropy Chair')?.email}`} className="hover:text-azure duration-300 transition-all ease-in-out">{exec.find(member => member.position === 'Philanthropy Chair')?.email}</a> or visit our contact form</p>
                <a href="/contact-us" className="w-auto px-5 h-14 mb-10 flex justify-center items-center text-black bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue hover:text-old-gold">
                    <div className="text-xl text-nowrap font-medium leading-loose">Contact Form</div>
                </a>
            </div>
        </div>
    );
}

export default PhilanthropyPage;
