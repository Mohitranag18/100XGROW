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

            {/* panel 2 - Enhanced */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-24 p-6 py-24 border-b border-[#1e2939]/50">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-[#ffffff]">Our Solutions</h2>
                    <p className="text-[#9ca3af] text-lg max-w-2xl">Streamline your career journey with our comprehensive suite of AI-powered tools</p>
                </div>
                
                {/* Top row - 3 cards */}
                <div className="flex gap-8 justify-center">
                    <div className="group relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundImage: `url(${BuildResume})` }}></div>
                        <div className="relative h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-[#364153] flex items-center justify-center">
                                    <IoArrowForwardCircleOutline className="text-xl text-[#ffffff]"/>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#ffffff]">BuildResume</h3>
                                <p className="text-[#9ca3af] text-sm leading-relaxed">One-click resume creation using LinkedIn data and customizable templates.</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundImage: `url(${RateMyResume})` }}></div>
                        <div className="relative h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-[#364153] flex items-center justify-center">
                                    <IoArrowForwardCircleOutline className="text-xl text-[#ffffff]"/>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#ffffff]">RateMyResume</h3>
                                <p className="text-[#9ca3af] text-sm leading-relaxed">Community-driven platform for resume feedback and AI-powered mentor matching.</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundImage: `url(${MagicATS})` }}></div>
                        <div className="relative h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-[#364153] flex items-center justify-center">
                                    <IoArrowForwardCircleOutline className="text-xl text-[#ffffff]"/>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#ffffff]">MagicATS</h3>
                                <p className="text-[#9ca3af] text-sm leading-relaxed">AI-powered resume analysis to predict ATS scores and offer optimization suggestions.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row - 2 wide cards */}
                <div className="flex gap-8 justify-center">
                    <div className="group relative w-96 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundImage: `url(${FindJob})` }}></div>
                        <div className="relative h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-[#364153] flex items-center justify-center">
                                    <IoArrowForwardCircleOutline className="text-xl text-[#ffffff]"/>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#ffffff]">FindJob</h3>
                                <p className="text-[#9ca3af] text-sm leading-relaxed">AI-powered job recommendations by analyzing LinkedIn profiles and user preferences.</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative w-96 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300" style={{ backgroundImage: `url(${ApplicationTracker})` }}></div>
                        <div className="relative h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-[#364153] flex items-center justify-center">
                                    <IoArrowForwardCircleOutline className="text-xl text-[#ffffff]"/>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[#06b6d4]"></div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#ffffff]">Application Tracker</h3>
                                <p className="text-[#9ca3af] text-sm leading-relaxed">Comprehensive tracking for job applications to streamline follow-ups and status updates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* panel 3 - Enhanced */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-16 p-6 py-24 border-b border-[#1e2939]/50">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-[#ffffff]">Trusted by thousands</h2>
                    <p className="text-[#9ca3af] text-lg">See what our users are saying about 100XGROW</p>
                </div>
                
                <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center text-white font-bold">J</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"The resume builder saved me hours of formatting. Clean, professional results every time."</p>
                                <p className="text-[#9ca3af] text-xs">@jennifer.a</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white font-bold">J</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"Amazing system! The ATS optimization feature helped me land my dream job."</p>
                                <p className="text-[#9ca3af] text-xs">@jamescron</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center text-white font-bold">C</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"Perfect tool for job seekers. The application tracker keeps me organized."</p>
                                <p className="text-[#9ca3af] text-xs">@camerondi</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center text-white font-bold">A</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"Game-changer for my career. The AI recommendations are spot-on."</p>
                                <p className="text-[#9ca3af] text-xs">@alexborm</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center text-white font-bold">M</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"Love the community feedback feature. Got great tips from other users."</p>
                                <p className="text-[#9ca3af] text-xs">@martina</p>
                            </div>
                        </div>
                    </div>

                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-[#1e2939] to-[#0f1419] border border-[#364153]/30 hover:border-[#364153] transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#84cc16] to-[#65a30d] flex items-center justify-center text-white font-bold">S</div>
                            <div className="flex-1 text-left">
                                <p className="text-[#e5e7eb] text-sm leading-relaxed mb-3">"Streamlined my entire job search process. Highly recommend to everyone."</p>
                                <p className="text-[#9ca3af] text-xs">@sarah.m</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer">
                    <span className="text-sm">Read all 2,384 reviews</span>
                    <IoArrowForwardCircleOutline className="text-lg"/>
                </div>
            </div>
        </div>
        </>
     );
}

export default Home;