import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoArrowForwardCircleOutline } from "react-icons/io5";


import BuildResume from "../assets/BuildResume.jpeg"
import RateMyResume from "../assets/RateMyResume.jpeg"
import MagicATS from "../assets/MagicATS.jpeg"
import FindJob from "../assets/FindJob.jpeg"
import ApplicationTracker from "../assets/Application_tracker.jpeg"



function Home() {
    return ( 
        <>
        <div className="h-full w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">We Automate the Process of</h1>
                    <h1 className="text-5xl font-bold">Resume building <MdKeyboardDoubleArrowRight className="inline-block text-6xl"/> Job applying</h1>
                </div>
                <div className="flex gap-8">
                    <div className="bg-[#364153] p-2 px-4 rounded-xl">Build Resume</div>
                    <div className="bg-[#364153] p-2 px-4 rounded-xl">Check ATS Score</div>
                </div>
            </div>

            {/* panel 2 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-16 p-6 py-16 border-b-2 border-[#1e2939]">
                <div className="flex gap-16">
                    <div className="h-76 w-86 bg-gray-100 p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] bg-cover bg-center" style={{ backgroundImage: `url(${BuildResume})` }}>
                            <div className="h-full w-full rounded-lg flex flex-col justify-end gap-2 bg-[rgba(3,7,18,0.8)] p-4">
                                <p className="font-semibold">One-click resume creation using LinkedIn data and customizable templates.</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-bold">BuildResume</p>
                                    <IoArrowForwardCircleOutline className="text-4xl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-76 w-86 bg-gray-100 p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] bg-cover bg-center" style={{ backgroundImage: `url(${RateMyResume})` }}>
                            <div className="h-full w-full rounded-lg flex flex-col justify-end gap-2 bg-[rgba(3,7,18,0.8)] p-4">
                                <p className="font-semibold">Community-driven platform for resume feedback and AI-powered mentor matching for career advice.</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-bold">RateMyResume</p>
                                    <IoArrowForwardCircleOutline className="text-4xl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-76 w-86 bg-gray-100 p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] bg-cover bg-center" style={{ backgroundImage: `url(${MagicATS})` }}>
                            <div className="h-full w-full rounded-lg flex flex-col justify-end gap-2 bg-[rgba(3,7,18,0.8)] p-4">
                                <p className="font-semibold">AI-powered resume analysis to predict ATS scores and offer optimization suggestions.</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-bold">MagicATS</p>
                                    <IoArrowForwardCircleOutline className="text-4xl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-290 h-86 bg-gray-100 p-1">
                    <div className="w-full h-full rounded-lg bg-[#030712] bg-cover bg-top" style={{ backgroundImage: `url(${FindJob})` }}>
                        <div className="h-full w-full rounded-lg flex flex-col justify-end items-center gap-2 bg-[rgba(3,7,18,0.8)] p-8">
                            <p className="font-semibold w-[50%]">AI-powered job recommendations by analyzing LinkedIn profiles and user preferences.</p>
                            <div className="flex justify-between items-center w-[50%]">
                                <p className="text-xl font-bold">FindJob</p>
                                <IoArrowForwardCircleOutline className="text-4xl"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-290 h-86 bg-gray-100 p-1">
                    <div className="w-full h-full rounded-lg bg-[#030712] bg-cover bg-center" style={{ backgroundImage: `url(${ApplicationTracker})` }}>
                        <div className="h-full w-full rounded-lg flex flex-col justify-end items-center gap-2 bg-[rgba(3,7,18,0.8)] p-8">
                            <p className="font-semibold w-[50%]">Comprehensive tracking for job applications to streamline follow-ups and status updates.</p>
                            <div className="flex justify-between items-center w-[50%]">
                                <p className="text-xl font-bold">Application Tracker</p>
                                <IoArrowForwardCircleOutline className="text-4xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* panel 3 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-16 p-6 py-16 border-b-2 border-[#1e2939]">
                <p className="text-4xl font-semibold">Users love 100XGROW</p>
                <div className=" w-290 flex flex-wrap gap-8">
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">Lorem ipsum dolor sit amet, consect etur adipiscing elit - @jennifer.a</p>
                    </div>
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">I just love how these people build this system - @jamescron</p>
                    </div>
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">A must have UI kit for building my landing pages - @camerondi</p>
                    </div>
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4 ml-8">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">A must have UI kit for building my landing pages - @alexborm</p>
                    </div>
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">Lorem ipsum dolor sit amet, consect etur adipiscing elit - @martina</p>
                    </div>
                    <div className="w-88 h-20 rounded-full bg-[#1e2939] flex justify-between items-center gap-2 px-4">
                        <div className="h-12 w-12 rounded-full bg-[#292e3d]"></div>
                        <p className="w-68">Lorem ipsum dolor sit amet, consect etur adipiscing elit - @jennifer.a</p>
                    </div>
                </div>
                <p className="text-lg underline underline-offset-8">Read All 2,384 Reviews</p>
            </div>
        </div>
        </>
     );
}

export default Home;