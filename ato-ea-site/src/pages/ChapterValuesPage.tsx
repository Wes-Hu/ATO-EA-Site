import { useState, useEffect, useRef} from 'react';
import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MdGroups, MdHandshake } from 'react-icons/md';
import { FaBalanceScale, FaBook, FaHandsHelping, FaHeart, FaUserGraduate } from 'react-icons/fa';


function ChapterValuesPage() {
    const [activeSection, setActiveSection] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
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
    const inViews = refs.map(ref => useInView(ref, { once: true }));

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
                <div className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center bg-[url(src/assets/ATOHouse.png)]">
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
                <div className="w-full md:w-[75%] flex flex-col gap-20">
                    <div data-aos="zoom-in"  id="TheCreed" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-5xl font-bold mb-10">The Creed of Alpha Tau Omega</h1>
                        <p className=" text-white text-xl font-medium leading-loose">To bind men together in a brotherhood based upon eternal and immutable principles, with a bond as strong as right itself and as lasting as humanity; to know no North, no South, no East, no West, but to know man as man, to teach that true men the world over should stand together and contend for supremacy of good over evil; to teach, not politics, but morals; to foster, not partisanship, but the recognition of true merit wherever found; to have no narrower limits within which to work together for the elevation of man than the outlines of the world: these were the thoughts and hopes uppermost in the minds of the founders of the Alpha Tau Omega Fraternity.<br/><br/>-Otis Allan Glazebrook<br/>1880</p>
                    </div>
                    <div id="OurValues" className="md:px-0 flex flex-col justify-center items-center md:items-start gap-5">
                        <div data-aos="zoom-in">
                            <h1 className="text-5xl font-bold mb-5">Our Values</h1>
                            <p className="text-xl font-medium leading-loose">At the Epsilon Alpha chapter of Alpha Tau Omega, our core values are the foundation of our brotherhood. They guide our actions, shape our community, and inspire us to make a positive impact. Here are the values that define who we are:</p>
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-40 flex-grow py-5 flex items-center justify-center bg-old-gold rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-tr-none text-azure">
                                <MdHandshake size={100} />
                            </div>
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[0]} initial={isMobile ? { y: '-100%' } : { x: '-100%' }} animate={isMobile ? { y: inViews[0] ? '0%' : '-100%' }: { x: inViews[0] ? '0%' : '-100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tr-3xl rounded-bl-3xl md:rounded-bl-none rounded-br-3xl flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Brotherhood</h1>
                                        <p className="text-white text-left text-xl font-medium">Brotherhood is at the heart of Alpha Tau Omega. We believe in fostering strong, lasting relationships built on mutual respect, trust, and support. Our fraternity creates a sense of belonging and unity that extends beyond college life, forming lifelong friendships and a supportive network.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[1]} initial={isMobile ? { y: '-100%' } : { x: '100%' }} animate={isMobile ? { y: inViews[1] ? '0%' : '-100%' }: { x: inViews[1] ? '0%' : '100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tl-3xl rounded-bl-3xl rounded-br-3xl md:rounded-br-none flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Leadership</h1>
                                        <p className="text-white text-left text-xl font-medium">We encourage our members to take on leadership roles within the chapter, on campus, and in the wider community. Developing leadership skills prepares our brothers to become effective, ethical leaders who make a difference in the world.</p>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tr-3xl rounded-tl-3xl md:rounded-tl-none rounded-br-none md:rounded-br-3xl flex items-center justify-center text-azure">
                                    <MdGroups size={100} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-tr-none flex items-center justify-center text-azure">
                                    <FaBook size={80} />
                                </div>
                            </div>
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[2]} initial={isMobile ? { y: '-100%' } : { x: '-100%' }} animate={isMobile ? { y: inViews[2] ? '0%' : '-100%' }: { x: inViews[2] ? '0%' : '-100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tr-3xl rounded-bl-3xl md:rounded-bl-none rounded-br-3xl flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Scholarship</h1>
                                        <p className="text-white text-left text-xl font-medium">Academic excellence is a priority for Alpha Tau Omega. We strive to create an environment that promotes intellectual growth and success. Our members are dedicated to their studies, committed to achieving their educational goals, and support each other's academic endeavors.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[3]} initial={isMobile ? { y: '-100%' } : { x: '100%' }} animate={isMobile ? { y: inViews[3] ? '0%' : '-100%' }: { x: inViews[3] ? '0%' : '100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tl-3xl rounded-bl-3xl rounded-br-3xl md:rounded-br-none flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Service</h1>
                                        <p className="text-white text-left text-xl font-medium">Service to others is fundamental to our fraternity. We are committed to giving back to our communities through various philanthropic and service activities. Our brothers are dedicated to making a positive impact and improving the lives of those in need.</p>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tr-3xl rounded-tl-3xl md:rounded-tl-none rounded-br-none md:rounded-br-3xl flex items-center justify-center text-azure">
                                    <FaHandsHelping size={100} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-tr-none flex items-center justify-center text-azure">
                                    <FaBalanceScale size={80} />
                                </div>
                            </div>
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[4]} initial={isMobile ? { y: '-100%' } : { x: '-100%' }} animate={isMobile ? { y: inViews[4] ? '0%' : '-100%' }: { x: inViews[4] ? '0%' : '-100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tr-3xl rounded-bl-3xl md:rounded-bl-none rounded-br-3xl flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Integrity</h1>
                                        <p className="text-white text-left text-xl font-medium">Integrity is essential to the character of an Alpha Tau Omega brother. We hold ourselves to the highest standards of honesty, ethics, and personal responsibility. By upholding these principles, we build a fraternity that is respected and trusted.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[5]} initial={isMobile ? { y: '-100%' } : { x: '100%' }} animate={isMobile ? { y: inViews[5] ? '0%' : '-100%' }: { x: inViews[5] ? '0%' : '100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tl-3xl rounded-bl-3xl rounded-br-3xl md:rounded-br-none flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Respect</h1>
                                        <p className="text-white text-left text-xl font-medium">We embrace diversity and inclusivity, recognizing the value of different perspectives and backgrounds. By treating everyone with respect and dignity, we create a welcoming and supportive environment for all.</p>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tr-3xl rounded-tl-3xl md:rounded-tl-none rounded-br-none md:rounded-br-3xl flex items-center justify-center text-azure">
                                    <FaHeart size={80} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start">
                            <div className="w-full md:w-40 flex-grow flex items-stretch">
                                <div className="flex-grow py-5 bg-old-gold rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-tr-none flex items-center justify-center text-azure">
                                    <FaUserGraduate size={80} />
                                </div>
                            </div>
                            <div className="w-full md:w-4/5 flex-grow overflow-hidden">
                                <motion.div ref={refs[6]} initial={isMobile ? { y: '-100%' } : { x: '-100%' }} animate={isMobile ? { y: inViews[6] ? '0%' : '-100%' }: { x: inViews[6] ? '0%' : '-100%' }} transition={{ duration: 1 }} className="h-full py-5 bg-azure md:rounded-tr-3xl rounded-bl-3xl md:rounded-bl-none rounded-br-3xl flex items-center">
                                    <div className="flex flex-col justify-start items-start px-3 gap-1">
                                        <h1 className="text-white text-left text-2xl font-bold">Personal Development</h1>
                                        <p className="text-white text-left text-xl font-medium">We are dedicated to the personal development of our members, providing opportunities for growth in all areas of life, including social, emotional, and professional development. Our fraternity helps members become well-rounded individuals prepared for success in their future endeavors.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in" id="DEIA" className="bg-azure md:mb-[439px] p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Diversity, Equity, Inclusion, and Accessibility Position statement</h1>
                        <div className="flex flex-col lg:flex-row justify-center text-white items-center">

                            <p className="w-full text-white text-xl font-medium leading-loose">Alpha Tau Omega is a place of acceptance, where people from all backgrounds are welcome. We strive to uphold the highest standards when it comes to all aspects of inclusion and access as well as ensuring that we provide equal opportunities to everyone. We believe that diversity is critical to the fabric of our organization and therefore, it is and will always be a top priority</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterValuesPage;
