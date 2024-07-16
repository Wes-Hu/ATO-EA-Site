import { useEffect, useState } from 'react';
import { useDataContext } from '../utils/DataContext';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaInstagram } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { parseISO, format } from 'date-fns';

function HomePage() {
    const { images, exec, isLoading, recentNews } = useDataContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const mostRecentNews = recentNews.slice(0, 3);

    // Carousel functions
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); //Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            once: true, // Ensures the animation happens only once
        });
    }, []);

    if (isLoading) {
        return <div className="w-screen h-screen flex items-center justify-center"></div>;
    }

    return (
        <div id="HomepageContainer" className="flex flex-col justify-center items-center">
            <div id="Image Carousel" className="w-screen h-[60vh] mb-10 lg:mb-16 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-2xl font-bold leading-9">ALPHA TAU OMEGA<br />AT</div>
                        <img className="w-60" src='/src/assets/CSMLogoW.png' />
                    </div>
                </div>
                {/** Left Arrow */}
                <button onClick={prevSlide} className="opacity-0 transform transition-all group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/50 hover:bg-gray-800/50 text text-white cursor-pointer duration-300"><BsChevronCompactLeft size={30} /></button>
                {/** Right Arrow */}
                <button onClick={nextSlide} className="opacity-0 transform transition-all group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/50 hover:bg-gray-800/50 text text-white cursor-pointer duration-300"><BsChevronCompactRight size={30} /></button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer ${currentIndex === index ? 'text-white/50' : 'text-text-black/50'}`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <RxDotFilled size={24} />
                        </div>
                    ))}
                </div>
            </div>

            <div data-aos="fade-up" id="ChapterValues" className="w-full h-auto lg:scale-100 px-3 mb-10 lg:mb-20 flex flex-col justify-center items-center text-center">
                <h1 className="mb-10 text-black text-4xl md:text-5xl font-bold leading-normal">Welcome to the Epsilon Alpha Chapter</h1>
                <p className=" lg:w-[65%] mb-10 text-center text-black text-xl font-medium leading-normal">The Alpha Tau Omega fraternity is a tight-knit community dedicated to fostering strong bonds of brotherhood and cultivating leadership skills among its members. With a rich history rooted in tradition and a commitment to service, ATO provides a supportive environment where young men can grow personally and professionally. Through a variety of social, philanthropic, and educational activities, ATO empowers its brothers to become confident leaders who make a positive impact in their communities and beyond. Joining ATO means joining a lifelong brotherhood built on friendship, integrity, and a shared vision for a brighter future.</p>
                <a href="/chapter-values" className="w-44 h-14 flex justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                    <div className=" text-xl font-medium leading-loose">Chapter Values</div>
                </a>
            </div>

            <div data-aos="fade-up" id="AboutUs" className="w-full 2xl:max-w-[80%] mb-10 lg:mb-20 h-auto px-3 md:px-10 flex flex-col-reverse lg:flex-row gap-0 lg:gap-5 relative">
                <div className="w-full lg:w-3/5 h-auto p-5 flex flex-col bg-azure rounded-br-3xl rounded-bl-3xl rounded-tl-none lg:rounded-tl-3xl rounded-tr-none lg:rounded-3xl">
                    <div className="mb-5 text-white text-3xl font-bold leading-10">Who We Are</div>
                    <div className="mb-5 text-white text-xl font-medium leading-normal">Founded on September 11, 1865, at the Virginia Military Institute, Alpha Tau Omega (ATO) was established by Otis Allan Glazebrook, Erskine Mayo Ross, and Alfred Marshall to promote unity and brotherhood after the Civil War. ATO was the first fraternity founded as a national organization, emphasizing leadership, scholarship, and service.<br/><br/>The Epsilon Alpha chapter was established in 1929 at the Colorado School of Mines. Dedicated to the fraternity's core values, the chapter has built a reputation for academic excellence, leadership, and community service. Over the years, Epsilon Alpha has actively engaged in philanthropic activities and campus involvement, fostering a strong sense of brotherhood and making a positive impact on both the university and the Golden, Colorado community.</div>
                    <div className="w-full flex justify-center lg:justify-start">
                        <a href="/history" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium leading-loose">Learn More</div>
                        </a>
                    </div>
                </div>
                <div className="w-full lg:w-2/5 h-52 md:h-96 lg:h-auto rounded-tl-3xl rounded-tr-3xl rounded-bl-none lg:rounded-bl-3xl rounded-br-none lg:rounded-br-3xl" style={{backgroundImage: `url("src/assets/ATOold.jpeg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
            </div>

            <div data-aos="fade-up" id="Philo" className="w-full 2xl:max-w-[80%] mb-10 lg:mb-20 h-auto px-3 md:px-10 flex flex-col lg:flex-row gap-0 lg:gap-5 relative">
                <div className="w-full lg:w-[45%] h-52 md:h-96 lg:h-auto rounded-tl-3xl rounded-tr-3xl rounded-bl-none lg:rounded-bl-3xl rounded-br-none lg:rounded-br-3xl" style={{backgroundImage: `url("src/assets/HomepagePhilo.jpeg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
                <div className="w-full lg:w-[55%] h-auto p-5 flex flex-col bg-azure rounded-br-3xl rounded-bl-3xl rounded-tl-none lg:rounded-tl-3xl rounded-tr-none lg:rounded-3xl">
                    <div className="mb-5 text-white text-3xl font-bold leading-10">Philanthropy and Service</div>
                    <div className="mb-5 text-white text-xl font-medium leading-normal">At the Epsilon Alpha chapter of Alpha Tau Omega, philanthropy is a key part of our mission to support our community and make a positive difference. Our brothers are deeply involved in both local service projects and national initiatives, dedicating their time and efforts to various causes. Each year, we proudly collaborate with respected organizations such as Habitat for Humanity, Gift of Life, and the Colon Cancer Foundation, working together to create meaningful change and improve lives.</div>
                    <div className="w-full flex justify-center lg:justify-start">
                        <a href="/philanthropy" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium leading-loose">Learn More</div>
                        </a>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" id="JoinUs" className="w-screen mb-20 flex flex-col items-center justify-center lg:gap-14 py-3 lg:py-14 lg:px-20 bg-azure">
                <div className="text-white text-center text-4xl lg:text-5xl font-bold leading-normal">Interested in Joining ?</div>
                <a href="/how-to-join" className="mb-5 lg:mb-0 w-80 h-24 scale-75 lg:scale-100 bg-old-gold rounded-full flex items-center justify-center transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                    <div className="text-black text-4xl font-bold leading-10 hover:text-neutral-700">Start Here</div>
                </a>
            </div>

            <div data-aos="fade-up" id="Contact" className="w-full 2xl:max-w-[60%] h-auto px-0 lg:px-10 flex flex-col lg:flex-row gap-0 lg:gap-5 justify-center">
                <div className="w-full py-10 px-5 lg:px-20 rounded-none lg:rounded-3xl flex flex-col justify-between items-center bg-azure">
                    <div className="mb-10 text-white text-center text-nowrap text-4xl lg:text-5xl font-bold leading-normal">Get in Contact</div>

                    <div className="mb-5 w-full flex flex-col gap-3 justify-center">
                        <a href="/leadership" className="w-full p-5 flex flex-col justify-center gap-5 bg-dark-blue rounded-3xl hover:scale-110 hover:shadow-lg duration-300 ease-in-out transition-all">
                            <div className="text-center text-white text-3xl font-medium leading-10">{exec.find(member => member.position === 'President')?.position}</div>
                            <div className="flex flex-col flex-wrap md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'President')?.name}</div>
                                <a href={`mailto:${exec.find(member => member.position === 'President')?.email}`} className="text-center text-white hover:text-old-gold text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'President')?.email}</a>
                            </div>
                        </a>
                        <a href="/leadership" className="w-full p-5 flex flex-col justify-center gap-5 bg-dark-blue rounded-3xl hover:scale-110 hover:shadow-lg duration-300 ease-in-out transition-all">
                            <div className="text-center text-white text-3xl font-medium leading-10">{exec.find(member => member.position === 'Vice President')?.position}</div>
                            <div className="flex flex-col flex-wrap md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'Vice President')?.name}</div>
                                <a href={`mailto:${exec.find(member => member.position === 'Vice President')?.email}`} className="text-center text-white hover:text-old-gold text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'Vice President')?.email}</a>
                            </div>
                        </a>
                        <a href="/leadership" className="w-full p-5 flex flex-col justify-center gap-5 bg-dark-blue rounded-3xl hover:scale-110 hover:shadow-lg duration-300 ease-in-out transition-all">
                            <div className="text-center text-white text-3xl font-medium leading-10">{exec.find(member => member.position === 'Recruitment Chair')?.position}</div>
                            <div className="flex flex-col flex-wrap md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'Recruitment Chair')?.name}</div>
                                <a href={`mailto:${exec.find(member => member.position === 'Recruitment Chair')?.email}`} className="text-center text-white hover:text-old-gold text-xl md:text-2xl font-medium leading-10">{exec.find(member => member.position === 'Recruitment Chair')?.email}</a>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row flex-wrap justify-center items-center">
                        <div className="text-white text-xl lg:text-2xl text-nowrap font-medium leading-9">Contact Us Here</div>
                        <a href="/contact-us" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl text-nowrap font-medium leading-loose">Contact Form</div>
                        </a>
                    </div>
                </div>

                <div id="RecentNews" className="w-full py-10 px-5 md:px-20 rounded-none lg:rounded-3xl flex flex-col justify-between items-center bg-azure">
                    <div className="mb-10 text-white text-center text-4xl text-nowrap lg:text-5xl font-bold leading-normal">Recent News</div>

                    <div className="mb-5 w-full flex flex-col gap-3 justify-center">
                        {mostRecentNews.map((news) => (
                            <a key={news.id} href="/recent-news" className="w-full p-5 flex flex-col justify-center gap-5 bg-dark-blue rounded-3xl hover:scale-110 hover:shadow-lg duration-300 ease-in-out transition-all">
                            <div className="flex flex-col md:flex-row justify-between flex-wrap">
                                <div className="text-left text-white text-3xl font-medium leading-10">{news.title}</div>
                                <div className="text-left text-white text-xl font-medium leading-10">
                                Date Posted: {news.date ? format(parseISO(news.date), 'MM/dd/yyyy') : ''}
                                </div>
                            </div>
                            <div className="text-left text-white text-xl md:text-xl font-medium leading-10">{news.brief_description}</div>
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row flex-wrap justify-center items-center">
                        <div className="text-white text-xl lg:text-2xl text-nowrap font-medium leading-9">Follow Our Instagram</div>
                        <a href="https://www.instagram.com/ato_mines/" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="flex items-center">
                                <FaInstagram size="24" />
                                <div className="text-xl text-nowrap text-center font-medium leading-loose ml-2">@ato_mines</div>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
