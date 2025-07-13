function Footer() {
    return (
    <>
        {/* Footer - Enhanced */}
        <div className="w-full bg-[#030712] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand section */}
                    <div className="md:col-span-1">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-[#ffffff]">100XGROW</h2>
                            <p className="text-[#9ca3af] text-sm leading-relaxed">Automating your path to career success with AI-powered resume building and job application tools.</p>
                            <div className="flex gap-3 mt-4">
                                <div className="w-10 h-10 rounded-full bg-[#1e2939] hover:bg-[#364153] transition-colors duration-300 flex items-center justify-center cursor-pointer">
                                    <span className="text-[#ffffff] text-sm">IG</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#1e2939] hover:bg-[#364153] transition-colors duration-300 flex items-center justify-center cursor-pointer">
                                    <span className="text-[#ffffff] text-sm">X</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#1e2939] hover:bg-[#364153] transition-colors duration-300 flex items-center justify-center cursor-pointer">
                                    <span className="text-[#ffffff] text-sm">LI</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#1e2939] hover:bg-[#364153] transition-colors duration-300 flex items-center justify-center cursor-pointer">
                                    <span className="text-[#ffffff] text-sm">DC</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-[#ffffff] mb-6">Services</h3>
                        <div className="space-y-3">
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">BuildResume</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">RateMyResume</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">MagicATS</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">FindJob</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Application Tracker</a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-[#ffffff] mb-6">Resources</h3>
                        <div className="space-y-3">
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Help Center</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Career Tips</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Resume Templates</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Blog</a>
                            <a href="#" className="block text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Community</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-[#ffffff] mb-6">Contact</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded bg-[#1e2939] flex items-center justify-center">
                                    <span className="text-[#ffffff] text-xs">@</span>
                                </div>
                                <span className="text-[#9ca3af] text-sm">100XGROW@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded bg-[#1e2939] flex items-center justify-center">
                                    <span className="text-[#ffffff] text-xs">☎</span>
                                </div>
                                <span className="text-[#9ca3af] text-sm">+91 1234567890</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded bg-[#1e2939] flex items-center justify-center">
                                    <span className="text-[#ffffff] text-xs">📍</span>
                                </div>
                                <span className="text-[#9ca3af] text-sm">Dehradun, Uttarakhand</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom border */}
                <div className="border-t border-[#1e2939]/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[#9ca3af] text-sm">© 2025 100XGROW. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Privacy Policy</a>
                            <a href="#" className="text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Terms of Service</a>
                            <a href="#" className="text-[#9ca3af] hover:text-[#ffffff] transition-colors duration-300 text-sm">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default Footer;