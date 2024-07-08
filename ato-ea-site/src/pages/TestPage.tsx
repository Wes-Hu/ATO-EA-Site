import React, { useEffect, useRef, useState } from 'react';

function TestPage() {
    const navBarRef = useRef<HTMLDivElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement | null>(null);
    const [isSticky, setIsSticky] = useState(false);
    const headerHeight = 7 * 16; // h-28 in Tailwind CSS (28 * 0.25rem = 7rem, 1rem = 16px)

    useEffect(() => {
        const handleStickyScroll = () => {
            const navBar = navBarRef.current;
            const placeholder = placeholderRef.current;
            if (navBar && placeholder) {
                const rect = navBar.getBoundingClientRect();
                const offsetTop = placeholder.offsetTop;
                const parentWidth = placeholder.parentElement?.clientWidth;

                if (rect.top <= headerHeight && !isSticky) {
                    setIsSticky(true);
                    placeholder.style.height = `${navBar.offsetHeight}px`;
                    placeholder.style.display = 'block';
                    navBar.style.position = 'fixed';
                    navBar.style.top = `${headerHeight}px`;
                    navBar.style.width = `${parentWidth}px`; // Set width to match parent
                } else if (window.scrollY < offsetTop - headerHeight) {
                    setIsSticky(false);
                    navBar.style.position = 'relative';
                    navBar.style.top = 'auto';
                    navBar.style.width = '100%';
                    placeholder.style.display = 'none';
                }
            }
        };

        window.addEventListener('scroll', handleStickyScroll);
        
        return () => {
            window.removeEventListener('scroll', handleStickyScroll);
        };
    }, [isSticky, headerHeight]);

    return (
        <div className="w-screen flex flex-col items-center justify-center gap-10">
            <div className="w-screen h-96 bg-blue-400 rounded-3xl"></div>
            <div ref={placeholderRef} style={{ height: '0' }}></div>
            <div ref={navBarRef} className="w-1/2 h-28 bg-red-400 rounded-3xl"></div>
            <div className="w-screen h-96 bg-orange-400 rounded-3xl"></div>
            <div className="w-screen h-96 bg-orange-400 rounded-3xl"></div>
        </div>
    );
}

export default TestPage;
