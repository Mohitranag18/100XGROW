import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { resume_detail } from '../api/endpoints';
import { SERVER_URL } from '../api/endpoints'

function ReviewResumeDetails() {
    const location = useLocation();
    const parts = location.pathname.split("/");
    const pk = parts[parts.length - 1]; // Get the last segment

    const [loading, setLoading] = useState(false);
    const [resumeDetail, setResumeDetail] = useState([]); // Ensure it's an empty array initially
    const [username, setUsername] = useState('')
    const [avgRating, setAvgRating] = useState(0)
    const [jobRole, setJobRole] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [pdfUrl, setPdfUrl] = useState('')


    const FetchResumeReviewList = async () => {
        setLoading(true);
        try { 
            const response = await resume_detail(pk);
            console.log("API Response:", response);
            setResumeDetail(response)
            setUsername(response.user)
            setAvgRating(response.average_rating)
            setJobRole(response.job_role)
            setImageUrl(response.image)
            setPdfUrl(response.pdf)
        } catch (error) {
            console.error("Error fetching resume details", error);
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
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-8 p-6 border-b-2 border-[#1e2939]">
                <h1 className="text-5xl font-bold">Resumes {pk}</h1>
            </div>

            {/* panel 2 */}
            <div className="w-full flex flex-col flex-wrap justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                {loading && <p>Loading...</p>}
                <div className='flex gap-8'>
                  <h1>{username}</h1>
                  <h1>{jobRole}</h1>
                </div>
                <img className='h-124' src={`${SERVER_URL}${imageUrl}`} alt="Resume Image" />
                <div className='flex items-center gap-8'>
                  <p>Rating: {avgRating}</p>
                  <a href={`${SERVER_URL}${pdfUrl}`}>
                    <button className='rounded-sm bg-blue-600 p-2 cursor-pointer'>Open PDF</button>
                  </a>
                </div>
            </div>
        </div>
  )
}

export default ReviewResumeDetails