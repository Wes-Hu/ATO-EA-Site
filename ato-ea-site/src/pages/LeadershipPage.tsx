import { useDataContext } from '../utils/DataContext';

function LeadershipPage () {
    const { exec, leadershipImage } = useDataContext();
    
    return (
        <div className="flex flex-col justify-center items-center">
            <div id="Image" className="w-screen h-[60vh] mb-24 md:h-[80vh] relative bg-azure group">
                <div style={{ backgroundImage: `url(${leadershipImage})` }} className="w-full h-full bg-center bg-cover duration-500 flex justify-center items-end">
                    <div className="bg-azure bg-opacity-50 w-full text-center py-5">
                        <div className="text-white text-5xl font-bold leading-9">Leadership</div>
                    </div>
                </div>
            </div>
            <div className="w-screen flex flex-row flex-wrap gap-9 justify-center items-center px-3 md:px-16">
                {exec.map((member)=> (
                    <div className="w-full md:w-[413px] bg-azure flex flex-col justify-start items-center mt-10 py-5 rounded-3xl">
                        <h1 className="text-white text-4xl font-bold mb-5 text-center ">{member.position}</h1>
                        <div className="w-full h-[282px] px-16 mb-5">
                            <div className="w-full h-full bg-old-gold rounded-3xl p-2 md:p-5">
                                <div className="w-full h-full rounded-3xl" style={{ backgroundImage: `url(${member.picture})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                            </div>
                        </div>
                        <div className="text-white text-2xl font-medium mb-5">{member.name}</div>
                        <div className="w-full px-8 mt-">
                            <div className="flex flex-col justify-start items-start">
                                <p className="text-white text-xl font-medium text-left">Grade: {member.grade}</p>
                                <p className="text-white text-xl font-medium text-left">Major: {member.major}</p>
                                <p className="text-white text-xl font-medium text-left">Email: <a className="hover:text-old-gold duration-300 transition-all" href={`mailto:${member.email}`}>{member.email}</a></p>
                            </div>
                        </div>
                    </div>  
                ))}              
            </div>
            
        </div>
    );
}
export default LeadershipPage;