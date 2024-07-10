import Sticky from 'react-stickynode';
import ScrollSpy from 'react-ui-scrollspy';

function HistoryPage() {

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
    return (
        <div id="HistoryPageContainer" className="flex flex-col justify-center items-center">
            <div id="Image" className="w-screen h-[60vh] mb-24 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(src/assets/ATOold.jpeg)` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-4xl font-bold leading-9">HISTORY</div>
                    </div>
                </div>
            </div>
            <div id="FlagCrest" className="w-screen mb-24 2xl:w-3/5 px-3 md:px-16 lg:px-28 flex flex-col md:flex-row items-center gap-1 justify-between">
                <div className="md:w-[75%] flex flex-col justify-center items-center gap-6">
                    <img src="src/assets/ATOFlag.jpg" alt="ATO Flag"/>
                    <div className="text-black text-center text-2xl font-bold">ATO Flag</div>
                </div>
                <div className="md:w-[28.8%] flex flex-col justify-center items-center gap-6">
                    <img src="src/assets/ATOCrest.png" alt="ATO Crest"/>
                    <div className="text-black text-center text-2xl font-bold">ATO Crest</div>
                </div>
            </div>
            <div id="SideBar" className="w-screen 2xl:w-3/5 px-3 md:px-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-2 mb-10">
                <div className="w-screen hidden md:w-[25%] md:flex flex-col">
                    <Sticky enabled={true} top={144}>
                        <div className="flex flex-col gap-3">
                            <ScrollSpy>
                            <ul className="nav-list flex flex-col gap-3">
                                <li className="nav-item text-center md:text-left text-2xl font-bold">
                                    <a href="#ATOFounders" onClick={handleSmoothScroll}>ATO Founders</a>
                                </li>
                                <li className="nav-item text-center md:text-left text-2xl font-bold">
                                    <a href="#ATOHistory" onClick={handleSmoothScroll}>ATO History</a>
                                </li>
                                <li className="nav-item text-center md:text-left text-2xl font-bold">
                                    <a href="#EAHistory" onClick={handleSmoothScroll}>Epsilon Alpha History</a>
                                </li>
                            </ul>
                            </ScrollSpy>
                        </div>
                    </Sticky>
                </div>
                <div className="w-screen md:w-full px-3 md:px-0 flex flex-col gap-20">
                    <div id="ATOFounders" className="flex flex-col justify-center md:justify-start items-center md:items-start">
                        <h1 className="text-black mb-5 text-5xl font-bold">Founders</h1>
                        <div className="w-full flex flex-col justify-center items-start md:flex-row gap-5 md:gap-3">
                            <div className="w-screen px-3 md:px-0 md:w-1/3 flex flex-col justify-center items-center">
                                <div className="w-full h-[564px] md:h-[40vh] xl:h-[50vh] rounded-3xl" style={{ backgroundImage: `url(src/assets/EMR.jpg)`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                <h2 className="text-black text-center text-2xl font-medium">Otis Allen Glazebrook</h2>
                            </div>
                            <div className="w-screen px-3 md:px-0 md:w-1/3 flex flex-col justify-center items-center">
                                <div className="w-full h-[564px] md:h-[40vh] xl:h-[50vh] rounded-3xl" style={{ backgroundImage: `url(src/assets/AM.jpg)`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                <h2 className="text-black text-center text-2xl font-medium">Alfred Marshall</h2>
                            </div>
                            <div className="w-screen px-3 md:px-0 md:w-1/3 flex flex-col justify-center items-center">
                                <div className="w-full h-[564px] md:h-[40vh] xl:h-[50vh] rounded-3xl" style={{ backgroundImage: `url(src/assets/OAG.jpg)`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                <h2 className="text-black text-center text-2xl font-medium">Erskine Mayo Ross</h2>
                            </div>
                        </div>
                        
                    </div>
                    <div id="ATOHistory" className="bg-azure p-3 md:p-8 lg:p-14 flex flex-col justify-center items-start rounded-3xl">
                        <h1 className="text-white text-5xl font-bold mb-10">Alpha Tau Omega History</h1>
                        <p className="text-white text-xl font-medium mb-10">Alpha Tau Omega (ATO) was founded on September 11, 1865, at the Virginia Military Institute in Lexington, Virginia. The fraternity was established by Otis Allan Glazebrook, Erskine Mayo Ross, and Alfred Marshall in the aftermath of the Civil War, with a mission to heal the wounds of the nation by fostering brotherhood and unity among young men from the North and South.<br/><br/>The founders envisioned a fraternity that was not just a social club, but a brotherhood based on Christian values, mutual respect, and a commitment to higher ideals. ATO became the first fraternity to be founded as a national organization, with chapters chartered across different states from its inception.<br/><br/>Throughout its history, Alpha Tau Omega has been dedicated to leadership, scholarship, and service. The fraternity emphasizes personal development and community involvement, encouraging its members to become leaders in their fields and active participants in their communities.<br/><br/>Today, ATO has over 250 active and inactive chapters nationwide, with more than 200,000 initiated members. The fraternity's legacy continues as it strives to instill its core values of love and respect among its members, fostering lifelong friendships and a commitment to making a positive impact on society.</p>
                        <a href="https://ato.org/home/ato-history/" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium leading-loose">Read More</div>
                        </a>
                    </div>
                    <div id="EAHistory" className="h-screen bg-gray-100 flex justify-center items-center">
                        <div>Need Joe to send me the fucking local chapter history :(</div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default HistoryPage;
