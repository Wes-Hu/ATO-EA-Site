import { useState, useEffect } from "react";

function RushPage() {
    const [season, setSeason] = useState('');
    const currentYear = new Date().getFullYear();

    useEffect(() =>{
        const currentMonth = new Date().getMonth();
        if (currentMonth >= 0 && currentMonth <= 5) {
            setSeason('Spring');
          } else {
            setSeason('Fall');
          }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center px-3 md:px-10 lg:px-24 xl:px-60 2xl:px-96">
            <h1 className="text-black text-center text-4xl md:text-5xl font-bold my-10">{season} {currentYear} Rush Schedule</h1>
            <img className="w-screen 2xl:w-3/5" src="https://geneva.imgix.net/7cd39879-de5a-437f-ac41-5af232c806eb/3a798027-9e73-4fdf-91df-a0d4a490b18c_ImageLoader_2DC037DB-D7BE-46C1-A74A-1E53064E4DBC.jpeg"></img>
            <div></div>
        </div>
    );
}
export default RushPage;