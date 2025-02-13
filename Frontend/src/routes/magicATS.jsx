import { useState } from "react";
import { UploadCloud } from "lucide-react";

function MagicATS() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [jobRole, setJobRole] = useState("");

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
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Optimize your Resume for ATS</h1>
                </div>
            </div>

            {/* panel 2 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <div className="w-290 mx-auto bg-[#030712] rounded-lg flex flex-col items-center gap-16">
                    <h2 className="text-4xl font-semibold">
                        Get Instant ATS Score & Feedback
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
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                            <option value="fullstack">Full Stack Developer</option>
                            <option value="data-scientist">Data Scientist</option>
                            </select>
                        </div>

                        <button
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                            disabled={!selectedFile || !jobRole}
                        >
                            Upload Resume
                        </button>
                    </div>
                </div>
            </div>

            {/* panel 3 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold w-290 text-left">ATS Score & Feedback</h2>
                <div className="flex gap-16">
                    <div className="h-76 w-137 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] p-4 text-left flex flex-col justify-between">
                            <p className="text-lg font-semibold">ATS</p>
                            <div className="w-full flex justify-between">
                                <div className="w-[48%] h-56 bg-[#1e2939] rounded-md flex justify-center items-center">
                                    <div className="h-40 w-40 bg-gray-200 rounded-full flex justify-center items-center">
                                        <div className="h-32 w-32 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                            <p className="font-bold">0/100</p>
                                            <p>Your ATS Score</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] h-56 flex flex-col justify-between">
                                    <div className="h-27 bg-[#1e2939] rounded-md flex items-center gap-2 px-2">
                                        <div className="h-22 w-22 bg-gray-200 rounded-full flex justify-center items-center">
                                            <div className="h-18 w-18 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                                <p className="font-bold">0/100</p>
                                            </div>
                                        </div>
                                        <p className="w-32 h-full flex justify-center items-center">Keywords Matching Score</p>
                                    </div>
                                    <div className="h-27 bg-[#1e2939] rounded-md flex items-center gap-2 px-2">
                                        <div className="h-22 w-22 bg-gray-200 rounded-full flex justify-center items-center">
                                            <div className="h-18 w-18 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                                <p className="font-bold">0/100</p>
                                            </div>
                                        </div>
                                        <p className="w-32 h-full flex justify-center items-center">Relevance Work Experience Score</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-76 w-137 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] p-4 text-left flex flex-col justify-between">
                            <p className="text-lg font-semibold">Feedback</p>
                            <div className="w-full h-56 flex flex-col items-start gap-8">
                                <p>1.</p>
                                <p>2.</p>
                                <p>3.</p>
                                <p>4.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </> 
    );
}

export default MagicATS;