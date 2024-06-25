import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../supabaseClient";

function HomePage() {
    const[imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() =>{
        const fetchData = async() => {
            const fetchedImageUrls = await fetchCarouselImages();
            setImageUrls(fetchedImageUrls);
        }
        console.log(imageUrls);
        fetchData();
    },[])

    return (
        <div>
            <div className="ImageCarousel w-screen h-[80vh] bg-gray-200 flex justify-center items-center" data-carousel="slide"
                style={{backgroundImage: `url(${imageUrls[0]})`}}>
                
            </div>
                <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 xl:scale-125 text-center">
                    <div className="text-white text-2xl font-bold font-['Arial'] leading-9">ALPHA TAU OMEGA<br/>AT</div>
                    <img className="w-60" src='/src/assets/CSMLogoW.png'/>
                </div>
        </div>
        
    );
}
export default HomePage

