import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { review_resume_create } from "../api/endpoints";

function RateMyResume() {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobRole, setJobRole] = useState("");

    const createResumeReviewPost = async () => {
        setLoading(true)
        try{
            const response = await review_resume_create(selectedFile, jobRole)
            alert("Resume Uploaded!");
        }catch{
            alert('error in uploading resume')
        } finally{
            setLoading(false)
            setSelectedFile(null)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) setSelectedFile(file);
    };

    return ( 
        <>
        <div className="min-h-screen  w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <dir className="h-112 w-full flex flex-col justify-center items-center text-center gap-8 p-6 border-b-2 border-[#1e2939]">
                <h1 className="text-5xl font-bold">Get your Free Resume reviews</h1>
                <h1 className="text-5xl font-bold">&</h1>
                <h1 className="text-5xl font-bold">Review Resumes to Earn Skill-Points</h1>
            </dir>

            {/* panel 2 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <div className="w-290 mx-auto bg-[#030712] rounded-lg flex flex-col items-center gap-16">
                    <h2 className="text-4xl font-semibold">
                        Upload your Resume for Review
                    </h2>

                    <div className="w-full h-78 flex flex-col gap-2">
                        <div
                            className="h-76 flex flex-col justify-center items-center border-2 border-dashed bg-[#030712] border-gray-300 p-6 text-center rounded-lg cursor-pointer hover:bg-[#1e2939]"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <label htmlFor="file-upload" className="cursor-pointer">
                            <UploadCloud className="mx-auto text-gray-500 mb-2" size={32} />
                            <p className="text-gray-500">Drag & drop your file here</p>
                            <p className="text-gray-400 text-sm">or click to browse</p>
                            </label>
                            <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            />
                        </div>
                        {selectedFile && (
                            <p className="mt-2 text-sm text-green-600 text-center">
                            {selectedFile.name} selected
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center w-full">
                        <div>
                            <label className="block text-left mb-1 font-semibold text-lg text-white">
                            Select Job Role
                            </label>
                            <select
                            className="w-full mt-1 p-2 bg-[#030712] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            >
                            <option value="">Choose a role</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            </select>
                        </div>

                        {
                            loading ?
                            <p>loading....</p>
                            :
                            <button
                                onClick={createResumeReviewPost}
                                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                                disabled={!selectedFile || !jobRole}
                            >
                                Upload Resume
                            </button>
                        }
                    </div>
                </div>
            </div>

            {/* panel 3 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold w-290 text-left">Mentors</h2>
                <div className="flex gap-16">
                    <div className="h-56 w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] flex flex-col p-4 gap-4">
                            <div className="flex items-center gap-8">
                                <img className="w-36 h-36 rounded-md object-cover object-center" src="https://images.pexels.com/photos/7641824/pexels-photo-7641824.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                                <p className="text-xl font-bold">Aarav Mehta</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">– Software Engineer</p>
                                <IoArrowForwardCircleOutline className="text-2xl"/>
                            </div>
                        </div>
                    </div>
                    <div className="h-56 w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] flex flex-col p-4 gap-4">
                            <div className="flex items-center gap-8">
                                <img className="w-36 h-36 rounded-md object-cover object-top" src="https://images.pexels.com/photos/4098346/pexels-photo-4098346.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                <p className="text-xl font-bold">Sophia Patel</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">– Graphic Designer</p>
                                <IoArrowForwardCircleOutline className="text-2xl"/>
                            </div>
                        </div>
                    </div>
                    <div className="h-56 w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] flex flex-col p-4 gap-4">
                            <div className="flex items-center gap-8">
                                <img className="w-36 h-36 rounded-md object-cover object-center" src="https://images.pexels.com/photos/7648478/pexels-photo-7648478.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                                <p className="text-xl font-bold">James Carter</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">– Data Analyst</p>
                                <IoArrowForwardCircleOutline className="text-2xl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* panel 4 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold w-290 text-left">Review Resumes</h2>
                <div className="flex gap-16">
                    <div className="h-full w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/a8bd8a14-9ea2-40cf-af65-bf5e5b2944b5/thumbnails/616/ats-classic-hr-resume-white-modern-simple-2-1-8aa636d33184.webp" alt="Template 1" />
                        </div>
                        <div className="flex justify-between items-center p-2 py-4">
                            <p className="text-xl font-semibold">Alex Carter</p>
                            <button className="bg-blue-600 hover:bg-[#030712] cursor-pointer text-white px-4 py-1 rounded-sm transition">View</button>
                        </div>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/57cae682-222c-4646-9a80-c404ee5c5d7e/thumbnails/616/industry-manager-resume-blue-modern-simple-2-1-3e5fd5944310.webp" alt="Template 2" />
                        </div>
                        <div className="flex justify-between items-center p-2 py-4">
                            <p className="text-xl font-semibold">Maya Singh</p>
                            <button className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-700 transition">View</button>
                        </div>
                    </div>
                    <div className="h-full w-86 bg-[#1e2939] p-1">
                        <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                            <img className="h-full w-full object-cover object-top" src="https://cdn.create.microsoft.com/catalog-assets/en-us/4b83e384-3f44-4f2a-a531-d077fe8afc40/thumbnails/600/cv-%2528resume%2529-orange-modern-color-block-1-1-e5335f7a8b61.webp" alt="Template 1" />
                        </div>
                        <div className="flex justify-between items-center p-2 py-4">
                            <p className="text-xl font-semibold">Olivia Bennett</p>
                            <button className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-700 transition">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default RateMyResume;