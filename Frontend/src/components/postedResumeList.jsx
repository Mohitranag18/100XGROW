import React, { useEffect, useState } from 'react';
import { review_resume_getlist } from '../api/endpoints';
import { SERVER_URL } from '../api/endpoints'
import { useNavigate } from 'react-router-dom';

function PostedResumeList({username}) {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);
    const [resumes, setResumes] = useState([]); // Ensure it's an empty array initially

    const FetchResumeReviewList = async () => {
        setLoading(true);
        try {
            const response = await review_resume_getlist();
            console.log("API Response:", response);
            setResumes(Array.isArray(response) ? response : response?.data || []);
        } catch (error) {
            console.error("Error fetching resumes:", error);
            alert('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchResumeReviewList();
    }, []);

    return (
        <div className="min-h-screen  w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <div className="h-36 w-full flex flex-col justify-center items-center text-center gap-8 p-6">
                <h1 className="text-4xl font-bold">Your Posted Resumes</h1>
            </div>

            {/* panel 2 */}
            <div className="w-full flex flex-wrap justify-center items-center text-center gap-8 p-6 border-b-2 border-[#1e2939]">
                {loading && <p>Loading...</p>}
                {Array.isArray(resumes) && resumes.length > 0 ? (
                    resumes.map((resume) => resume.user === username && (
                        <div key={resume.id} className="h-full w-86 bg-[#1e2939] p-1 rounded-lg">
                            <div className="w-full h-86 rounded-lg bg-[#030712] overflow-hidden">
                                <img className="h-full w-full object-cover object-top overflow-hidden" src={`${SERVER_URL}${resume.image}`} alt={`${resume.user}'s Resume Image`} />
                            </div>
                            <div className="flex justify-between items-center p-2 py-4">
                                <div className='text-white flex flex-col items-start gap-1'>
                                    <p className="text-xl font-semibold">{resume.user}</p>
                                    <p className="text-md">{resume.job_role}</p>
                                </div>
                                <a
                                    onClick={()=>nav(`/ratemyresume/${resume.id}`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-700 transition"
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No resumes available</p>
                )}
            </div>
        </div>
    );
}

export default PostedResumeList;
