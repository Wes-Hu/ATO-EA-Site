import { motion } from "framer-motion";
import { useDataContext } from "../utils/DataContext";

function JoinUsPage() {
    const { interestFormLink } = useDataContext();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen h-[40vh] mb-20 bg-[url(src/assets/Contact.jpeg)] md:bg-cover xl:bg-bottom bg-fixed flex justify-center items-center overflow-hidden">
                <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                    <div className="text-white text-4xl font-bold leading-9">Join Us</div>
                </div>
            </div>
            <motion.div initial={{scale: 0, opacity: '0%' }} animate={{scale: 1, opacity: '100%' }} transition={{ duration: 1, ease: 'backInOut' }} className="px-3">
                <h1 className="text-black font-bold text-4xl text-center md:text-5xl mb-5">Ready To Be a Member?</h1>
                <p className="text-black font-medium text-xl text-center mb-10">Fill out our interest form or attend events during Rush Week!</p>
                <div className="flex flex-col justify-center items-center md:flex-row gap-10">
                    <a href={interestFormLink} className="h-14 flex px-5 justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                        <div className=" text-xl font-medium leading-loose">Interest Form</div>
                    </a>
                    <a href="/rush" className="h-14 flex px-5 justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                        <div className=" text-xl font-medium leading-loose">Rush Schedule</div>
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
export default JoinUsPage;