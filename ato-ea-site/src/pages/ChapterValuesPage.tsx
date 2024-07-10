import { useState, useEffect} from 'react';
import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUsers } from "react-icons/fa";

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

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.split('#')[1];
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          const headerOffset = 144;
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
            duration: 1500,
            offset: 500,
            once: true, // Ensures the animation happens only once
        });
    }, []);

    return (
        <div id="HistoryPageContainer" className="flex flex-col justify-center items-center">
            <div id="SideBar" className="w-screen 2xl:w-3/5 px-3 mt-10 md:px-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-2 mb-10">
                <div className="w-screen hidden md:w-[25%] md:flex flex-col">
                    <Sticky enabled={true} top={144}>
                        <div data-aos="fade-right" className="w-4/5 flex flex-col gap-3">
                            <ScrollSpy>
                                <ul className="nav-list flex flex-col gap-3">
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <a href="#TheCreed" onClick={handleSmoothScroll} className={`transition-all duration-500 ease-in-out ${activeSection === 'TheCreed' ? 'text-black text-3xl' : ' text-2xl'}`}>The Creed</a>
                                        <div className={`w-full h-2 bg-old-gold origin-left transition-opacity duration-500 ease-in-out ${activeSection === 'TheCreed' ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <a href="#OurValues" onClick={handleSmoothScroll} className={`transition-all duration-500 ease-in-out ${activeSection === 'OurValues' ? 'text-black text-3xl' : ' text-2xl'}`}>Our Values</a>
                                        <div className={`w-full h-2 bg-old-gold origin-left transition-opacity duration-500 ease-in-out ${activeSection === 'OurValues' ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </li>
                                    <li className="nav-item text-center md:text-left font-bold">
                                        <a href="#DEIA" onClick={handleSmoothScroll} className={`transition-all duration-500 ease-in-out ${activeSection === 'DEIA' ? 'text-black text-3xl' : ' text-2xl'}`}>DEIA Statement</a>
                                        <div className={`w-full h-2 bg-old-gold origin-left transition-opacity duration-500 ease-in-out ${activeSection === 'DEIA' ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </li>
                                </ul>
                            </ScrollSpy>
                        </div>
                    </Sticky>
                </div>
                <div className="w-screen md:w-full px-3 md:px-0 flex flex-col gap-20">
                    <div data-aos="fade-up" id="TheCreed" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-5xl font-bold mb-10">The Creed of Alpha Tau Omega</h1>
                        <p className=" text-white text-xl font-medium leading-loose">To bind men together in a brotherhood based upon eternal and immutable principles, with a bond as strong as right itself and as lasting as humanity; to know no North, no South, no East, no West, but to know man as man, to teach that true men the world over should stand together and contend for supremacy of good over evil; to teach, not politics, but morals; to foster, not partisanship, but the recognition of true merit wherever found; to have no narrower limits within which to work together for the elevation of man than the outlines of the world: these were the thoughts and hopes uppermost in the minds of the founders of the Alpha Tau Omega Fraternity.<br/><br/>-Otis Allan Glazebrook<br/>1880</p>
                    </div>
                    <div data-aos="fade-up" id="OurValues" className="flex flex-col justify-center items-start gap-5">
                        <h1 className="text-5xl font-bold mb-5">Our Values</h1>
                        <p className="text-xl font-medium leading-loose">At the Epsilon Alpha chapter of Alpha Tau Omega, our core values are the foundation of our brotherhood. They guide our actions, shape our community, and inspire us to make a positive impact. Here are the values that define who we are:</p>
                        <div className='h-screen flex flex-col md:flex-row'>
                        </div>
                    </div>
                    <div data-aos="fade-up" id="DEIA" className="bg-azure mb-96 p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Diversity, Equity, Inclusion, and Accessibility Position statement</h1>
                        <div className="flex flex-col lg:flex-row justify-center text-white items-center gap-10">
                            <FaUsers className='w-full md:w-1/4' size={100}/>
                            <p className="w-full md:w-3/4 text-white text-xl font-medium leading-loose">Alpha Tau Omega is a place of acceptance, where people from all backgrounds are welcome. We strive to uphold the highest standards when it comes to all aspects of inclusion and access as well as ensuring that we provide equal opportunities to everyone. We believe that diversity is critical to the fabric of our organization and therefore, it is and will always be a top priority</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterValuesPage;
