function HomePage() {
    return (
        <div>
            <div className="w-screen h-[80vh] bg-gray-200 flex justify-center items-center" >
                <div className="bg-azure bg-opacity-50 p-9 scale-75 md:scale-100 xl:scale-125 text-center">
                    <div className="text-white text-2xl font-bold font-['Arial'] leading-9">ALPHA TAU OMEGA<br/>AT</div>
                    <img className="w-60" src='/src/assets/CSMLogoW.png'/>
                </div>
            </div>
        </div>
        
    );
}
export default HomePage

//style={{ backgroundImage: "url('/src/assets/CSMLogoW.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}