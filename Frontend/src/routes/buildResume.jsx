import { useNavigate } from "react-router-dom";

function BuildResume() {
    const nav = useNavigate()
    return ( 
        <>
        <div className="min-h-screen  w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <dir className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <h1 className="text-5xl font-bold">Your Professional Resume in Just 3 Steps</h1>
                <div className="w-290 flex justify-center items-center gap-8">
                    <div className="h-16 w-32 rounded-2xl bg-[#364153] p-2 flex justify-center items-center">
                        <p className="font-semibold">Select Template</p>
                    </div>
                    <div className="h-1 w-48 bg-[#364153] rounded-full"></div>
                    <div className="h-16 w-32 rounded-2xl bg-[#364153] p-2 flex justify-center items-center">
                        <p className="font-semibold">Fetch data from Linkedin</p>
                    </div>
                    <div className="h-1 w-48 bg-[#364153] rounded-full"></div>
                    <div className="h-16 w-32 rounded-2xl bg-[#364153] p-2 flex justify-center items-center">
                        <p className="font-semibold">Preview & Download</p>
                    </div>
                </div>
            </dir>

            {/* panel 2 */}
                {/* software engineers templates */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold w-290 text-left">Software Engineer Templates</h2>
                <div className="flex gap-16">
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template1')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/a8bd8a14-9ea2-40cf-af65-bf5e5b2944b5/thumbnails/616/ats-classic-hr-resume-white-modern-simple-2-1-8aa636d33184.webp" alt="Template 1" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 1</p>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template2')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/57cae682-222c-4646-9a80-c404ee5c5d7e/thumbnails/616/industry-manager-resume-blue-modern-simple-2-1-3e5fd5944310.webp" alt="Template 2" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 2</p>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template3')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/d68df550-2dce-4601-ac59-22b431043ee8/thumbnails/616/social-media-marketing-resume-blue-modern-simple-2-1-9456c8e664b6.webp" alt="Template 3" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 3</p>
                    </div>
                </div>
            </div>

                {/* Graphic designers templates */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold w-290 text-left">Graphic Designer Templates</h2>
                <div className="flex gap-16">
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template4')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/4b83e384-3f44-4f2a-a531-d077fe8afc40/thumbnails/600/cv-%2528resume%2529-orange-modern-color-block-1-1-e5335f7a8b61.webp" alt="Template 1" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 1</p>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template5')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/ce343500-4aff-4dfa-b337-57c78459c6ee/thumbnails/616/modern-nursing-resume-orange-modern-geometric-2-1-648db1446843.webp" alt="Template 2" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 2</p>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1" onClick={() => nav('template6')}>
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/d81b18ac-9be2-4733-8e23-267c8035a1ee/thumbnails/600/creative-sales-resume-yellow-modern-simple-1-1-ea1b84a95542.webp" alt="Template 3" />
                        </div>
                        <p className="text-2xl font-semibold p-2">Template 3</p>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default BuildResume;