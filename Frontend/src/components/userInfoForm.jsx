import { useState } from "react";
import { PlusCircle, UploadCloud, ChevronDown } from "lucide-react";

export default function UserInfoForm() {
  const [education, setEducation] = useState([""]);
  const [experience, setExperience] = useState([""]);
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState([""]);
  const [achievements, setAchievements] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [interests, setInterests] = useState([""]);
  const [availability, setAvailability] = useState("");
  const [workPreference, setWorkPreference] = useState("");
  const [resumes, setResumes] = useState([null, null, null]);

  const addField = (setField) => {
    setField((prev) => [...prev, ""]);
  };

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file.name);
    }
  };

  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showSections, setShowSections] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const toggleSection = (section) => {
    setShowSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full mx-auto bg-[#030712] text-white shadow-lg rounded-lg flex flex-col items-start ">

      {/* Personal Info Section */}
      <div className="mb-4 w-full">
        <button
          className="w-86 bg-gray-800 text-white py-2 rounded-lg flex justify-between items-center px-4"
          onClick={() => setShowPersonalInfo(!showPersonalInfo)}
        >
          Personal Info
          <ChevronDown className={`transition-transform ${showPersonalInfo ? "rotate-180" : "rotate-0"}`} />
        </button>
        {showPersonalInfo && (
          <div className="mt-2">
            {/* Profile Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <div className="border border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700">
                <UploadCloud className="mx-auto text-gray-500 mb-2" size={32} />
                <p className="text-gray-500">Click to upload profile picture</p>
                <input type="file" className="hidden" onChange={(e) => setProfileImage(e.target.files[0]?.name)} />
              </div>
              {profileImage && <p className="text-sm text-gray-400 mt-1">Uploaded: {profileImage}</p>}
            </div>
            
            {/* Email & Contact */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full p-2 border rounded-lg bg-[#1e2939] text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <input type="text" className="w-full p-2 border rounded-lg bg-[#1e2939] text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Skills</label>
              <input type="text" className="w-full p-2 border rounded-lg bg-[#1e2939] text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Sections */}
      {["Education", "Experience", "Projects", "Achievements", "Languages", "Interests"].map((section) => (
        <div key={section} className="mb-4 w-full">
          <button className="w-86 bg-gray-800 text-white py-2 rounded-lg flex justify-between items-center px-4" onClick={() => toggleSection(section)}>
            {section}
            <ChevronDown className={`transition-transform ${showSections[section] ? "rotate-180" : "rotate-0"}`} />
          </button>
          {showSections[section] && (
            <div className="mt-2">
              {(section === "Education" ? education : section === "Experience" ? experience : section === "Projects" ? projects : section === "Achievements" ? achievements : section === "Languages" ? languages : interests).map((_, index) => (
                <input key={index} type="text" className="w-full p-2 border rounded-lg mt-2 bg-[#1e2939] text-white" placeholder={`Enter ${section.toLowerCase()} details`} />
              ))}
              <button onClick={() => addField(section === "Education" ? setEducation : section === "Experience" ? setExperience : section === "Projects" ? setProjects : section === "Achievements" ? setAchievements : section === "Languages" ? setLanguages : setInterests)} className="mt-2 flex items-center text-blue-400">
                <PlusCircle size={20} className="mr-2" /> Add More
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Availability & Work Preference */}
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium mb-2">Availability (Notice Period)</label>
        <input type="text" className="w-full p-2 border rounded-lg bg-[#1e2939] text-white" />
      </div>
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium mb-2">Work Preference</label>
        <input type="text" className="w-full p-2 border rounded-lg bg-[#1e2939] text-white" />
      </div>

      {/* Upload Resumes */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Top 3 Resumes (1 Required)</label>
        <div className="flex gap-8">
        {resumes.map((resume, index) => (
          <div key={index} className="border w-86 border-gray-300 p-4 rounded-lg mt-2 text-center cursor-pointer hover:bg-gray-700">
            <UploadCloud className="mx-auto text-gray-500 mb-2" size={32} />
            <p className="text-gray-500">Click to upload resume {index + 1}</p>
            <input type="file" className="hidden" onChange={(e) => {
              const newResumes = [...resumes];
              newResumes[index] = e.target.files[0] ? e.target.files[0].name : null;
              setResumes(newResumes);
            }} />
          </div>
        ))}
        {resumes.map((resume, index) => resume && <p key={index} className="text-sm text-gray-400 mt-1">Uploaded: {resume}</p>)}
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Submit
      </button>
    </div>
  );
}
