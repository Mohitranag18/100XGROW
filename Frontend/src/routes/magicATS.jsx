import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { analyze_resume_api } from "../api/endpoints";

function MagicATS() {

    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobRole, setJobRole] = useState("");
    const [atsScore, setAtsScore] = useState(0)
    const [keywordMatchScore, setKeywordMatchScore] = useState(0)
    const [relevanceWorkScore, setRelevanceWorkScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [pointFeedback, setPointFeedback] = useState([])
    const [missingKeywords, setMissingKeywords] = useState([])

    const analyzeResume = async () => {
        setLoading(true)
        try{
            const response = await analyze_resume_api(selectedFile, jobRole)
            console.log(response)
            setAtsScore(response.ats_score)
            setKeywordMatchScore(response.keywords_matching_score)
            setRelevanceWorkScore(response.relevance_work_experience_score)
            setFeedback(response.detailed_feedback)
            setPointFeedback(response.short_feedback)
            setMissingKeywords(response.missing_keywords)
        }catch{
            alert('error in analyzing resume')
        } finally{
            setLoading(false)
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
                            onClick={analyzeResume}
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
                {
                    loading && 
                    <p>Loading......</p>
                }
                <h2 className="text-4xl font-semibold w-290 text-left">ATS Score & Feedback</h2>
                <div className="flex gap-16">
                    <div className="h-76 w-137 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] p-4 text-left flex flex-col justify-between">
                            <p className="text-lg font-semibold">ATS</p>
                            <div className="w-full flex justify-between">
                                <div className="w-[48%] h-56 bg-[#1e2939] rounded-md flex justify-center items-center">
                                    <div className="h-40 w-40 bg-gray-200 rounded-full flex justify-center items-center">
                                        <div className="h-32 w-32 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                            <p className="font-bold">{atsScore}/100</p>
                                            <p>Your ATS Score</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] h-56 flex flex-col justify-between">
                                    <div className="h-27 bg-[#1e2939] rounded-md flex items-center gap-2 px-2">
                                        <div className="h-22 w-22 bg-gray-200 rounded-full flex justify-center items-center">
                                            <div className="h-18 w-18 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                                <p className="font-bold">{keywordMatchScore}/100</p>
                                            </div>
                                        </div>
                                        <p className="w-32 h-full flex justify-center items-center">Keywords Matching Score</p>
                                    </div>
                                    <div className="h-27 bg-[#1e2939] rounded-md flex items-center gap-2 px-2">
                                        <div className="h-22 w-22 bg-gray-200 rounded-full flex justify-center items-center">
                                            <div className="h-18 w-18 bg-[#1e2939] rounded-full flex flex-col justify-center items-center">
                                                <p className="font-bold">{relevanceWorkScore}/100</p>
                                            </div>
                                        </div>
                                        <p className="w-32 h-full flex justify-center items-center">Relevance Work Experience Score</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-76 h-auto w-137 bg-[#1e2939] p-1">
                        <div className="w-full h-full rounded-lg bg-[#030712] p-4 text-left flex flex-col justify-between">
                            <p className="text-lg font-semibold">Feedback</p>
                            <div className="w-full min-h-56 h-auto flex flex-col items-start gap-2">
                                {pointFeedback?.length > 0 ? (
                                    <>
                                        <p><strong>1.</strong> {pointFeedback[0]}</p>
                                        <p><strong>2.</strong> {pointFeedback[1]}</p>
                                        <p><strong>3.</strong> {pointFeedback[2]}</p>
                                        <p><strong>4.</strong> {pointFeedback[3]}</p>
                                    </>
                                ) : (
                                    <p>No feedback available</p>
                                )}
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