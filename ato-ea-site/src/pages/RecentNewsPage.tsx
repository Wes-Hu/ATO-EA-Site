import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { parseISO, format } from 'date-fns';
import { useDataContext } from '../utils/DataContext';


function RecentNewsPage() {
    const { recentNews } = useDataContext();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center mt-10 mb-5 text-black text-5xl font-bold">Recent News</h1>
            <p className="w-screen md:w-1/2 mb-24 text-center text-black text-xl font-medium">Stay up-to-date with the latest news, upcoming events, and important announcements from the Epsilon Alpha chapter of Alpha Tau Omega.</p>
            <div className="flex flex-col gap-14">
                {recentNews.map((news, index) => (
                    <div key={news.id} className="w-screen relative group px-3 md:px-14 lg:px-32 2xl:px-96">
                        <div className="w-full flex flex-col">
                            <div className={`w-full h-auto md:h-44 flex flex-row bg-azure ${expandedIndex === index ? 'rounded-tl-3xl rounded-tr-3xl' : 'rounded-3xl'} py-10 pl-4 md:pl-10`}>
                                <div className="w-4/5 h-full flex flex-col justify-between">
                                    <div className="w-full flex flex-col md:flex-row justify-start md:justify-between">
                                        <div className="text-left text-white text-3xl font-medium leading-10">{news.title}</div>
                                        <div className="text-left text-white text-md text-nowrap md:text-3xl font-medium leading-10">Date Posted: {news.date ? format(parseISO(news.date), 'MM/dd/yyyy') : ''}</div>
                                    </div>
                                    <div className="text-left text-white text-xl md:text-xl font-medium leading-10">{news.brief_description}</div>
                                </div>
                                <div className="w-1/5 h-full text-white flex justify-center items-center">
                                    <button onClick={() => toggleDropdown(index)}>
                                        <BsChevronRight className={`transform transition-transform duration-500 ${expandedIndex === index ? 'rotate-90' : ''}`} size={50} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`w-full overflow-hidden transition-all duration-500 ${expandedIndex === index ? 'max-h-[1000px]' : 'max-h-0'}`}>
                            <div className={`w-full bg-old-gold text-black shadow-lg ${expandedIndex === index ? 'rounded-bl-3xl rounded-br-3xl p-3 md:p-10' : 'p-0'}`}>
                                {expandedIndex === index && (
                                    <div className="w-full bg-white rounded-3xl flex flex-col md:flex-row justify-normal p-3 md:p-10 gap-3 md:gap-14">
                                        <img className="rounded-3xl" src={news.image_src} />
                                        <div className="text-black text-xl font-medium font">{news.description}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentNewsPage;
