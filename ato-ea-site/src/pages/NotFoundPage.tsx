import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";

const fallAndBounce = {
    initial: { y: -1000 },
    animate: { y: 0 },
    transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
        duration: 1,
        bounce: 0.3,
    },
};

function NotFoundPage() {
    const [flip, cycleFlip] = useCycle(
        { rotateY: 0 },
        { rotateY: 360 }
    );

    useEffect(() => {
        const interval = setInterval(() => {
            cycleFlip();
        }, 3000); 
        return () => clearInterval(interval);
    }, [cycleFlip]);

    return (
        <div className="flex flex-col justify-center items-center px-3">
            <motion.div
                className="mt-20 cursor-default text-9xl font-extrabold text-center bg-gradient-to-r from-azure to-old-gold inline-block text-transparent bg-clip-text"
                initial={fallAndBounce.initial}
                animate={{ ...fallAndBounce.animate, ...flip }}
                transition={fallAndBounce.transition}
            >
                404
            </motion.div>
            <div className="mt-5 text-4xl text-center">Oops! This Page Could Not Be Found.</div>
            <div className="mt-5 text-md mb-5">Sorry the requested page may not exist, have been removed, name changed, or is temporarily unavailable</div>
            <a href="/" className="h-14 flex px-5 justify-center items-center text-white bg-azure rounded-full transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold">
                <div className=" text-xl font-medium leading-loose">Return to Homepage</div>
            </a>
        </div>
    );
}

export default NotFoundPage;
