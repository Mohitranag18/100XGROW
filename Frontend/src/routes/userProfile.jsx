import { useState } from "react";
import UserInfoProfile from "../components/userInfoProfile"
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

function UserProfile() {
    const profileModes = ['userInfo', 'resumes', 'applicationsTracker']
    const [profileMode, setProfileMode] = useState(profileModes[0])
    const [resumeMode, setResumeMode] = useState('savedResumes')

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
                        <div className="h-36 w-36 rounded-full overflow-hidden">
                            <img className="h-36 w-36 object-center object-cover" src="https://images.unsplash.com/photo-1662492953475-3aeae94525d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2MXx8fGVufDB8fHx8fA%3D%3D" alt="profile pic" />
                        </div>
                        <div className="flex flex-col items-start justify-center w-136 gap-2 text-left">
                            <h3 className="font-semibold text-xl">Alex Carter</h3>
                            <h4>A passionate full-stack developer with a knack for crafting clean, efficient code, always eager to dive into new technologies and tackle complex problems</h4>
                            <p><strong>Social Links : </strong> <br /> <FaLinkedinIn className="inline-block"/> @alex123 | <FaInstagram className="inline-block"/> @alex123</p>
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
                </div>
                }
            </div>
        </div>
    );
}

export default UserProfile;
