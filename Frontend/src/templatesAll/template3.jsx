import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { get_linkedin_profile, get_my_user_data } from "../api/endpoints";
import { UploadCloud } from "lucide-react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Template3() {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const [personalInfoVisible, setpersonalInfoVisible] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);
    const [experienceVisible, setExperienceVisible] = useState(false);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    const handleEducationAdd = () => {
        setEducation([...education, {
            institution: '', 
            degree: '', 
            field_of_study: '', 
            start_date: '', 
            end_date: ''
        }]);
    };

    const handleExperienceAdd = () => {
        setExperience([...experience, {
            company: '',
            role: '',
            start_date: '',
            end_date: '',
            description: ''
        },]);
    };

    const handleProjectAdd = () => {
        setProjects([...projects, { name: '', description: '', link: '' }]);
    };

    const handleSkillChange = (e) => {
        setSkills(e.target.value.split(",").map(skill => skill)); // Convert to array
    };

    const getLinkedinProfileData = async () => {
        setLoading(true)
        try{
            const response = await get_linkedin_profile(selectedFile)
            console.log(response)
            if(response.success){
                setName(response.data.name)
                setDescription(response.data.headline)
                setContactNum(response.data.contact.phone)
                setEmail(response.data.contact.email)
                setAddress(response.data.location)
                setEducation(response.data.education)
                setExperience(response.data.experience)
                setSkills(response.data.skills)
                alert("data fetched from linkedin");
            }
            else{
                alert(response.error)
            }
        }catch{
            alert('error in geting data from linkedin profile')
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

    // get my user detaild data
    const getMyUserData = async () => {
        try{
            const response = await get_my_user_data()
            console.log(response)
            setName(response.full_name)
            setDescription(response.short_description)
            setContactNum(response.contact_no)
            setEmail(response.email)
            setAddress(response.address)
            setEducation(response.education)
            setExperience(response.experience)
            setProjects(response.projects)
            setSkills(response.skills)
        }catch{
            alert('error in fetching users data')
        }
    }

    const downloadPDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
    
          // Calculate image size to fit in A4
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('resume.pdf');
        });
      };

    return ( 
        <>
        <div className="h-full w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Template 3</h1>
                </div>
                <div className="flex justify-center items-center gap-10">
                    <div className="w-[45%] h-40 flex flex-wrap justify-center items-center gap-x-6 py-4 border-1 border-gray-400 rounded-2xl">
                        <div className="h-fit flex flex-col gap-2">
                                <input type="file" onChange={handleFileChange}
                                accept=".pdf" placeholder="Add your Linkedin Profile PDf" className="p-2 border border-gray-500 bg-[#121826] text-white rounded"/>
                            {selectedFile && (
                                <p className="mt-2 text-sm text-green-600 text-center">
                                {selectedFile.name} selected
                                </p>
                            )}
                        </div>
                        <div className="h-fit flex justify-center items-center gap-8">
                            <div onClick={getLinkedinProfileData} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-sm cursor-pointer">Get Data From Linkedin PDF</div>
                        </div>
                        <p className="w-full text-gray-200">Don't Know how to get your Linkedin Profile PDF, <a className="text-blue-500" href="">click here</a></p>
                    </div>
                    <div className="w-[45%] h-full flex flex-col justify-center items-center gap-8 border-1 border-gray-400 rounded-2xl">
                        <div onClick={getMyUserData} className="bg-red-600 hover:bg-red-700 p-2 rounded-sm cursor-pointer">Get Data from 100XGROW profile</div>
                    </div>
                </div>
                {loading && 
                    <p>Getting Data from linkedin profile.....</p>
                }
            </div>

            {/* panel 2 */}
            <div className="flex border-b-2 border-[#364153]">
                {/* left */}
                <div className="w-[40%] text-[#ffffff] bg-[#030712] border-r-2 border-[#364153] p-8">
                <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                    <form className="flex flex-col gap-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setpersonalInfoVisible(!personalInfoVisible)}>
                            <h3 className="text-xl font-semibold">Personal Info</h3>
                            {personalInfoVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {personalInfoVisible && (
                            <div className="flex flex-col gap-6">
                                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <textarea placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Contact Number" value={contactNum} onChange={(e) => setContactNum(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Your Address (City, State, Country)" value={address} onChange={(e) => setAddress(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                            </div>
                        )}

                        {/* Education Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setEducationVisible(!educationVisible)}>
                            <h3 className="text-xl font-semibold">Education</h3>
                            {educationVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {educationVisible && (
                            <div className="flex flex-col gap-6">
                                {education.map((edu, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input type="text" placeholder="Institution" value={edu.institution}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].institution = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Start Date" value={edu.start_date}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].start_date = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="End Date" value={edu.end_date}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].end_date = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Degree" value={edu.degree}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].degree = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Field of study" value={edu.field_of_study}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].field_of_study = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handleEducationAdd} className="bg-blue-500 p-2 rounded">+ Add Education</button>
                            </div>
                        )}

                        {/* Experience Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExperienceVisible(!experienceVisible)}>
                            <h3 className="text-xl font-semibold">Experience</h3>
                            {experienceVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {experienceVisible && (
                            <div className="flex flex-col gap-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input type="text" placeholder="Company" value={exp.company}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].company = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Role" value={exp.role}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].role = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Description" value={exp.description}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].description = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Start Date" value={exp.start_date}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].start_date = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="End Date" value={exp.end_date}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].end_date = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handleExperienceAdd} className="bg-blue-500 p-2 rounded">+ Add Experience</button>
                            </div>
                        )}

                        {/* Project Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setProjectsVisible(!projectsVisible)}>
                            <h3 className="text-xl font-semibold">Projects</h3>
                            {projectsVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {projectsVisible && (
                            <div className="flex flex-col gap-6">
                                {projects.map((proj, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input type="text" placeholder="Project Name" value={proj.name}
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[index].name = e.target.value;
                                                setProjects(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Description" value={proj.description}
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[index].description = e.target.value;
                                                setProjects(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Project Link" value={proj.link}
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[index].link = e.target.value;
                                                setProjects(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handleProjectAdd} className="bg-blue-500 p-2 rounded">+ Add Project</button>
                            </div>
                        )}

                        {/* Skills Input */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setSkillsVisible(!skillsVisible)}>
                            <h3 className="text-xl font-semibold">Skills</h3>
                            {skillsVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {skillsVisible && (
                            <div className="flex flex-col gap-6">
                                <input type="text" placeholder="Enter Skills (comma separated)" value={skills} onChange={handleSkillChange}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                            </div>
                        )}
                    </form>
                </div>

                {/* right */}
                <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8">
                    <div id="pdf-content" className="h-238 w-168 bg-[#111827] text-[#ffffff] p-3">
                    {/* Header with accent */}
                    <div className="relative mb-3">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"></div>
                        <div className="pt-2">
                        <h1 className="text-xl font-bold text-[#ffffff] mb-1">{name}</h1>
                        <p className="text-[#9ca3af] text-sm mb-2">{description}</p>
                        
                        <div className="flex flex-wrap gap-3 text-xs">
                            {email && (
                            <div className="flex items-center gap-1 text-[#60a5fa]">
                                <IoIosMail className="text-sm" />
                                {email}
                            </div>
                            )}
                            {contactNum && (
                            <div className="flex items-center gap-1 text-[#60a5fa]">
                                <IoIosCall className="text-sm" />
                                {contactNum}
                            </div>
                            )}
                            {address && (
                            <div className="flex items-center gap-1 text-[#60a5fa]">
                                <FaLocationDot className="text-xs" />
                                {address}
                            </div>
                            )}
                        </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-3">
                        {/* Experience */}
                        <div>
                        <h2 className="text-lg font-bold text-[#3b82f6] mb-2 flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#3b82f6]"></div>
                            EXPERIENCE
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-2 pl-3 border-l-2 border-[#374151]">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                <h3 className="text-sm font-semibold text-[#ffffff]">{exp.role}</h3>
                                <p className="text-xs text-[#60a5fa] font-medium">{exp.company}</p>
                                </div>
                                <span className="text-xs text-[#9ca3af] bg-[#1f2937] px-1 py-0.5 rounded">
                                {exp.start_date} - {exp.end_date}
                                </span>
                            </div>
                            <p className="text-xs text-[#d1d5db] leading-tight">{exp.description}</p>
                            </div>
                        ))}
                        </div>

                        {/* Projects */}
                        <div>
                        <h2 className="text-lg font-bold text-[#8b5cf6] mb-2 flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#8b5cf6]"></div>
                            PROJECTS
                        </h2>
                        {projects.map((proj, index) => (
                            <div key={index} className="mb-2 pl-3 border-l-2 border-[#374151]">
                            <h3 className="text-sm font-semibold text-[#8b5cf6] mb-1">
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {proj.name}
                                </a>
                            </h3>
                            <p className="text-xs text-[#d1d5db] leading-tight">{proj.description}</p>
                            </div>
                        ))}
                        </div>

                        {/* Skills and Education Grid */}
                        <div className="grid grid-cols-2 gap-3">
                        {/* Skills */}
                        <div>
                            <h2 className="text-lg font-bold text-[#10b981] mb-2 flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#10b981]"></div>
                            SKILLS
                            </h2>
                            <div className="grid grid-cols-1 gap-1">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-[#10b981] rounded-full"></div>
                                <span className="text-xs text-[#e5e7eb]">{skill}</span>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <h2 className="text-lg font-bold text-[#f59e0b] mb-2 flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#f59e0b]"></div>
                            EDUCATION
                            </h2>
                            {education.map((edu, index) => (
                            <div key={index} className="mb-2">
                                <h3 className="font-semibold text-[#ffffff] text-xs">{edu.degree}</h3>
                                <p className="text-xs text-[#f59e0b]">{edu.field_of_study}</p>
                                <p className="text-xs text-[#9ca3af]">{edu.institution}</p>
                                <p className="text-xs text-[#6b7280]">
                                {edu.start_date} - {edu.end_date}
                                </p>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-16">
                <button onClick={downloadPDF} className="w-86 flex justify-center items-center gap-2 bg-blue-600 text-white py-2 mt-8 rounded-lg hover:bg-blue-700 cursor-pointer">
                    <MdOutlineFileDownload className="text-xl" />
                    Download
                </button>
                <button className="w-86 flex justify-center items-center gap-2 bg-red-600 text-white py-2 mt-8 rounded-lg hover:bg-red-700 cursor-pointer">
                    <IoBookmarkOutline className="text-xl" />
                    Save
                </button>
            </div>
        </div>
        </>
     );
}

export default Template3;