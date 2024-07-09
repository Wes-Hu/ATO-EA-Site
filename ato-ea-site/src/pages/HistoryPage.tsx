function HistoryPage() {
    return (
        <div id="HistoryPageContainer" className="flex flex-col justify-center items-center">
            <div id="Image" className="w-screen h-[60vh] mb-10 lg:mb-16 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(src/assets/ATOold.jpeg)` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-center">
                    <div className="bg-azure bg-opacity-50 py-16 px-9 scale-75 md:scale-100 lg:scale-125 xl:scale-150 text-center">
                        <div className="text-white text-4xl font-bold leading-9">HISTORY</div>
                    </div>
                </div>
            </div>
            <div className="w-screen 2xl:w-3/5 px-3 md:px-16 lg:px-28 flex flex-col md:flex-row items-center gap-1 justify-between">
                <div className="md:w-[75%] flex flex-col justify-center items center gap-6">
                    <img src="src/assets/ATOFlag.jpg"/>
                    <div className="text-black text-center text-2xl font-bold">ATO Flag</div>
                </div>
                <div className="md:w-[28.8%] flex flex-col justify-center items center gap-6">
                <   img src="src\assets\ATOCrest.png"/>
                    <div className=" text-black text-center text-nowrap  text-2xl font-bold">ATO Crest</div>
                </div>
            </div>
            
        </div>
    );
}
export default HistoryPage;