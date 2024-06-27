import { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

//Define types for Images
type ImageItem = {
    img_src: string | null;
};
type ImageUrls = string[];

function HomePage() {
    const [images, setImages] = useState<ImageUrls>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to preload images
    const preloadImages = (imageUrls: string[]) => {
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    };

    // Pull image urls from supabase
    async function fetchImages() {
        try {
            const { data, error } = await supabase
                .from("HomePage")
                .select("img_src")
                .eq("display", true);
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }

            const imageUrls = (data as ImageItem[]).map((item: ImageItem) => item.img_src).filter((src): src is string => Boolean(src));
            setImages(imageUrls);
            preloadImages(imageUrls); // Preload images
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching images", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    // Carousel functions
    const [currentIndex, setCurrentIndex] = useState(0);

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
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    if (isLoading) {
        return <div className="w-screen h-screen flex items-center justify-center"></div>;
    }

    return (
        <div id="HomepageContainer" className="flex flex-col justify-center items-center">
            <div id="Image Carousel" className="w-screen h-[60vh] mb-10 lg:mb-16 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-2xl font-bold font-['Arial'] leading-9">ALPHA TAU OMEGA<br />AT</div>
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

            <div id="ChapterValues" className="w-full h-auto lg:scale-100 px-3 mb-10 lg:mb-20 flex flex-col justify-center items-center text-center">
                <h1 className="mb-10 text-black text-4xl md:text-5xl font-bold font-['Arial'] leading-normal">Welcome to the Epsilon Alpha Chapter</h1>
                <p className=" lg:w-[65%] mb-10 text-center text-black text-xl font-medium font-['Arial'] leading-normal">The Alpha Tau Omega fraternity is a tight-knit community dedicated to fostering strong bonds of brotherhood and cultivating leadership skills among its members. With a rich history rooted in tradition and a commitment to service, ATO provides a supportive environment where young men can grow personally and professionally. Through a variety of social, philanthropic, and educational activities, ATO empowers its brothers to become confident leaders who make a positive impact in their communities and beyond. Joining ATO means joining a lifelong brotherhood built on friendship, integrity, and a shared vision for a brighter future.</p>
                <a href="/values" className="w-44 h-14 flex justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                    <div className=" text-xl font-medium font-['Arial'] leading-loose">Chapter Values</div>
                </a>
            </div>

            <div className="w-full 2xl:max-w-[80%] mb-10 lg:mb-20 h-auto px-3 md:px-10 flex flex-col-reverse lg:flex-row gap-0 lg:gap-5 relative">
                <div className="w-full lg:w-3/5 h-auto p-5 flex flex-col bg-azure rounded-br-3xl rounded-bl-3xl rounded-tl-none lg:rounded-tl-3xl rounded-tr-none lg:rounded-3xl">
                    <div className="mb-5 text-white text-3xl font-bold font-['Arial'] leading-10">Who We Are</div>
                    <div className="mb-5 text-white text-xl font-medium font-['Arial'] leading-normal">Founded on September 11, 1865, at the Virginia Military Institute, Alpha Tau Omega (ATO) was established by Otis Allan Glazebrook, Erskine Mayo Ross, and Alfred Marshall to promote unity and brotherhood after the Civil War. ATO was the first fraternity founded as a national organization, emphasizing leadership, scholarship, and service.<br/><br/>The Epsilon Alpha chapter was established in 1929 at the Colorado School of Mines. Dedicated to the fraternity's core values, the chapter has built a reputation for academic excellence, leadership, and community service. Over the years, Epsilon Alpha has actively engaged in philanthropic activities and campus involvement, fostering a strong sense of brotherhood and making a positive impact on both the university and the Golden, Colorado community.</div>
                    <div className="w-full flex justify-center lg:justify-start">
                        <a href="/history" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium font-['Arial'] leading-loose">Learn More</div>
                        </a>
                    </div>
                </div>
                <div className="w-full lg:w-2/5 h-52 md:h-96 lg:h-auto rounded-tl-3xl rounded-tr-3xl rounded-bl-none lg:rounded-bl-3xl rounded-br-none lg:rounded-br-3xl" style={{backgroundImage: `url("src/assets/ATOold.jpg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
            </div>

            <div className="w-full 2xl:max-w-[80%] mb-10 lg:mb-20 h-auto px-3 md:px-10 flex flex-col lg:flex-row gap-0 lg:gap-5 relative">
                <div className="w-full lg:w-[45%] h-52 md:h-96 lg:h-auto rounded-tl-3xl rounded-tr-3xl rounded-bl-none lg:rounded-bl-3xl rounded-br-none lg:rounded-br-3xl" style={{backgroundImage: `url("src/assets/HomepagePhilo.jpeg")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
                <div className="w-full lg:w-[55%] h-auto p-5 flex flex-col bg-azure rounded-br-3xl rounded-bl-3xl rounded-tl-none lg:rounded-tl-3xl rounded-tr-none lg:rounded-3xl">
                    <div className="mb-5 text-white text-3xl font-bold font-['Arial'] leading-10">Philanthropy and Service</div>
                    <div className="mb-5 text-white text-xl font-medium font-['Arial'] leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    <div className="w-full flex justify-center lg:justify-start">
                        <a href="/philantrophy" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium font-['Arial'] leading-loose">Learn More</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-screen lg:mb-20 flex flex-col items-center justify-center lg:gap-14 py-3 lg:py-14 lg:px-20 bg-azure">
                <div className="text-white text-center text-4xl lg:text-5xl font-bold font-['Arial'] leading-normal">Interested in Joining ?</div>
                <div className="mb-5 lg:mb-0 w-80 h-24 scale-75 lg:scale-100 bg-old-gold rounded-full flex items-center justify-center">
                    <div className="text-black text-4xl font-bold font-['Arial'] leading-10">Start Here</div>
                </div>
            </div>

            <div className="w-full 2xl:max-w-[50%] h-auto px-0 lg:px-10 flex flex-col lg:flex-row gap-0 lg:gap-5 justify-center">
                <div className="w-full p-5 rounded-none lg:rounded-3xl flex flex-col justify-center items-center bg-azure">
                    <div className="mb-6 text-white text-center text-4xl lg:text-5xl font-bold font-['Arial'] leading-normal">Get in Contact</div>

                    <div className="mb-3 w-full flex flex-col gap-3 justify-center">
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">President</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">Vice President</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">Recruitment Chair</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row justify-center items-center">
                        <div className="text-white text-xl lg:text-2xl font-medium font-['Arial'] leading-9">Contact Us Here</div>
                        <a href="/philantrophy" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium font-['Arial'] leading-loose">Contact Form</div>
                        </a>
                    </div>
                </div>

                <div className="w-full p-5 rounded-none lg:rounded-3xl flex flex-col justify-center items-center bg-azure">
                    <div className="mb-6 text-white text-center text-4xl lg:text-5xl font-bold font-['Arial'] leading-normal">Get in Contact</div>

                    <div className="mb-3 w-full flex flex-col gap-3 justify-center">
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">President</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">Vice President</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center bg-dark-blue rounded-3xl">
                            <div className="text-center text-white text-3xl font-medium font-['Arial'] leading-10">Recruitment Chair</div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">First Last</div>
                                <div className="text-center text-white text-xl md:text-3xl font-medium font-['Arial'] leading-10">email@mines.edu</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row justify-center items-center">
                        <div className="text-white text-xl lg:text-2xl font-medium font-['Arial'] leading-9">Contact Us Here</div>
                        <a href="/philantrophy" className="w-auto px-5 h-14 flex justify-center items-center text-black bg-old-gold rounded-full transition-all duration-300 hover:bg-dark-gold hover:text-neutral-700">
                            <div className="text-xl font-medium font-['Arial'] leading-loose">Contact Form</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
