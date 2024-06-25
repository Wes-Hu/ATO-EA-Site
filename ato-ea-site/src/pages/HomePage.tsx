import { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

//Define types for Images
type ImageItem = {
    img_src: string | null;
};
type ImageUrls = string[];

function HomePage() {
    //Variable to set image urls
    const [images, setImages] = useState<ImageUrls>([]);
    //Pull image url from supabase
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
        } catch (error) {
            console.error("Error fetching images", error);
        }
    }
    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="homepage-container">
            <div className="ImageCarousel w-screen h-[80vh] relative bg-azure overflow-hidden group">
                <div style={{ backgroundImage: `url(${images[0]})` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 xl:scale-125 text-center">
                        <div className="text-white text-2xl font-bold font-['Arial'] leading-9">ALPHA TAU OMEGA<br/>AT</div>
                        <img className="w-60" src='/src/assets/CSMLogoW.png'/>
                    </div>
                </div>
                {/** Left Arrow */}
                <div className="opacity-0 transform transition-all group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/50 text text-white cursor-pointer duration-300"><BsChevronCompactLeft size={30}/></div>
                {/** Right Arrow */}
                <div className="opacity-0 transform transition-all group-hover:opacity-100 absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/50 text text-white cursor-pointer duration-300"><BsChevronCompactRight size={30}/></div>
            </div>
        </div>
    );
}

export default HomePage;
