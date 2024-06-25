import { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { Database } from "../utils/supabaseTypes";

type Images = Database['public']['Tables']['HomePage']['Row'];

function HomePage() {
    const [images, setImages] = useState<Images[]>([]);
    
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
            setImages(data);
        } catch (error) {
            console.error("Error fetching images", error);
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        console.log('Current images:', images); // This will log the updated state after changes
    }, [images]);

    return (
        <div>
            <div className="ImageCarousel w-screen h-[80vh] bg-gray-200 flex justify-center items-center">
                {images.map((image, index) => (
                    <img key={index} src={image.img_src} alt="Display Image" className="w-full h-auto" />
                ))}
            </div>
            <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 xl:scale-125 text-center">
                <div className="text-white text-2xl font-bold font-['Arial'] leading-9">ALPHA TAU OMEGA<br/>AT</div>
                <img className="w-60" src='/src/assets/CSMLogoW.png'/>
            </div>
        </div>
    );
}

export default HomePage;
