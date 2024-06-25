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
        <div className="homepage-container">
            <div className="ImageCarousel w-screen h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 xl:scale-125 text-center">
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
        </div>
    );
}

export default HomePage;
