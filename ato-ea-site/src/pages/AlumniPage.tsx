import { motion } from "framer-motion";

function AlumniPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen h-[50vh] mb-20 bg-alumni-home md:bg-cover bg-center md:bg-fixed flex justify-center items-center overflow-hidden">
                <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                    <div className="text-white text-4xl font-bold leading-9">Alumni Resources</div>
                </div>
            </div>
            <motion.div initial={{scale: 0, opacity: '0%' }} animate={{scale: 1, opacity: '100%' }} transition={{ duration: 1, ease: 'backInOut' }} className="px-3">
                <h1 className="text-black font-bold text-4xl text-center md:text-5xl mb-5">Stay Connected With Us</h1>
                <p className="max-w-3xl text-black font-medium text-xl text-left mb-5">Are you an ATO Alumni from Mines? We’d love to keep in touch with you! Please send us your information to stay connected with the chapter.</p>
                <p className="max-w-3xl text-black font-medium text-xl text-left mb-10">If you’re not already part of our LinkedIn page or Geneva group, let us know, and we’ll add you so you can remain an active part of our community.</p>
                <div className="flex flex-col justify-center items-center md:flex-row gap-10">

                    <a href="/rush" className="h-14 flex px-5 justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                        <div className=" text-xl font-medium leading-loose">Contact Us Here</div>
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
export default AlumniPage;