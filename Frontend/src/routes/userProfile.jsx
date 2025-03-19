import { useEffect, useState } from "react";
import UserInfoProfile from "../components/userInfoProfile"
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { get_user_profile_info } from "../api/endpoints";
import { SERVER_URL } from "../api/endpoints";
import PostedResumeList from "../components/PostedResumeList";

function UserProfile() {
    const profileModes = ['userInfo', 'resumes', 'applicationsTracker']
    const [profileMode, setProfileMode] = useState(profileModes[0])
    const [resumeMode, setResumeMode] = useState('savedResumes')

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [linkedinId, setLinkedinId] = useState('')
    const [instaId, setInstaId] = useState('')
    const [profilePic, setProfilePic] = useState('')



    const getUserData = async () => {
        setLoading(true)
        try{
            const response = await get_user_profile_info()
            console.log(response)
            setUsername(response.username)
            setBio(response.bio)
            setLinkedinId(response.linkedinHandle)
            setInstaId(response.instaHandle)
            setProfilePic(response.profile_image)
        }catch{
            alert('error in fetching users data')
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUserData()
    },[])

    return (
        <div className="min-h-screen h-full w-full text-[#ffffff] bg-[#030712] border-b-2 border-[#1e2939] flex">
            <div className="w-56 min-w-56 border-r-2 border-[#1e2939]">
                {profileModes.map((mode, index) => (
                    <div 
                        key={index}
                        className={`flex items-center p-4 py-2 text-lg font-semibold border-b-2 border-[#1e2939] cursor-pointer ${
                            profileMode === mode ? "bg-gray-800" : ""
                        } ${profileMode != mode ? "hover:bg-gray-900" : ""}`}
                        onClick={() => setProfileMode(mode)}
                    >
                        {mode === "userInfo" && "User Info"}
                        {mode === "resumes" && "Resumes"}
                        {mode === "applicationsTracker" && "Applications Tracker"}
                    </div>
                ))}
            </div>
            <div className="h-full w-full">
                {/* Profile Info */}
                {profileMode === 'userInfo' &&
                <div className="w-full">
                    <div className="h-112 w-full flex justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                        <div className="h-36 w-36 rounded-full border-2 border-white overflow-hidden">
                            <img className="h-36 w-36 object-center object-cover" src={`${SERVER_URL}${profilePic}`} alt="profile pic" />
                        </div>
                        <div className="flex flex-col items-start justify-center w-136 gap-2 text-left">
                            <h3 className="font-semibold text-xl">{`@${username}`}</h3>
                            <h4>{bio}</h4>
                            <p><strong>Social Links : </strong> <br /> <FaLinkedinIn className="inline-block"/> {`${linkedinId} | `}<FaInstagram className="inline-block"/> {instaId}</p>
                        </div>
                    </div>
                    <div className="w-full p-8">
                        <div className="w-full flex flex-col items-center mb-8 gap-2">
                            <h2 className="text-4xl font-semibold">Your Data</h2>
                            <p className="text-gray-500">(Fill Your data Properly for Better Matches)</p>
                        </div>
                        <UserInfoProfile />
                    </div>
                </div>
                }

                {/* Resumes */}
                {profileMode === 'resumes' &&
                <div className="w-full">
                    <div className="h-14 flex">
                        <div onClick={() => setResumeMode("savedResumes")} className={`w-[50%] flex justify-center items-center border-b-2 border-r-1 border-[#1e2939] ${resumeMode === "savedResumes" ? "bg-gray-700" : ""} ${ resumeMode === "postedResumes" ? "hover:bg-gray-900" : "" }`}>
                            <p className="text-lg font-semibold">Saved Resumes</p>
                        </div>
                        <div onClick={() => setResumeMode("postedResumes")} className={`w-[50%] flex justify-center items-center border-b-2 border-r-1 border-[#1e2939] ${resumeMode === "postedResumes" ? "bg-gray-700" : ""} ${ resumeMode === "savedResumes" ? "hover:bg-gray-900" : "" }`}>
                            <p className="text-lg font-semibold">Posted Resumes</p>
                        </div>
                    </div>
                    {
                        resumeMode === "postedResumes" &&
                        <PostedResumeList username={username}/>
                    }
                </div>
                }
            </div>
        </div>
    );
}

export default UserProfile;
