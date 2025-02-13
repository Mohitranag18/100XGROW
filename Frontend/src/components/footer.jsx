function Footer() {
    return ( 
        <>
        <div className="h-full w-full text-[#ffffff] bg-[#030712] p-6 py-16 flex flex-col gap-8">
            <div className="flex justify-center items-center gap-8 border-y-2 border-[#1e2939]">
                <div className="h-76 w-86">
                    <div className="w-full h-full bg-[#030712] border-x-2 border-[#1e2939] flex flex-col gap-2 p-4">
                        <h2 className="text-lg font-semibold">Contact</h2>
                        <p>100XGROW@gmail.com</p>
                        <p>+91 1234567890</p>
                        <p>Dehradun, Uttarakhand</p>
                    </div>
                </div>
                <div className="h-76 w-86">
                    <div className="w-full h-full bg-[#030712] border-x-2 border-[#1e2939] flex flex-col gap-2 p-4">
                        <h2 className="text-lg font-semibold">Social</h2>
                        <p>Instagram</p>
                        <p>X [Twitter]</p>
                        <p>Linkedin</p>
                        <p>Discord</p>
                    </div>
                </div>
                <div className="h-76 w-86">
                    <div className="w-full h-full bg-[#030712] border-x-2 border-[#1e2939] flex flex-col gap-2 p-4">
                        <h2 className="text-lg font-semibold">Nav</h2>
                        <p>BuildResume</p>
                        <p>RateMyResume</p>
                        <p>MagicATS</p>
                        <p>FindJob</p>
                    </div>
                </div>
            </div>
            <div className="w-290 flex justify-end">
                <p className="text-[#364153] font-semibold">Copyright &copy; 2025 100XGROW</p>
            </div>
        </div>
        </>
     );
}

export default Footer;