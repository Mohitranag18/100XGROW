import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { UploadCloud } from "lucide-react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaGlobe, FaBehance, FaDribbble, FaLinkedin } from "react-icons/fa";

function Template4() {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const [personalInfoVisible, setPersonalInfoVisible] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);
    const [experienceVisible, setExperienceVisible] = useState(false);
    const [portfolioVisible, setPortfolioVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [certificationsVisible, setCertificationsVisible] = useState(false);
    
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [behance, setBehance] = useState('');
    const [dribbble, setDribbble] = useState('');
    const [linkedin, setLinkedin] = useState('');

    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [designTools, setDesignTools] = useState([]);
    const [designSkills, setDesignSkills] = useState([]);
    const [certifications, setCertifications] = useState([]);

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
            position: '',
            start_date: '',
            end_date: '',
            responsibilities: '',
            achievements: ''
        }]);
    };

    const handlePortfolioAdd = () => {
        setPortfolio([...portfolio, { 
            project_name: '', 
            category: '', 
            description: '', 
            tools_used: '',
            client: '',
            url: '' 
        }]);
    };

    const handleCertificationAdd = () => {
        setCertifications([...certifications, {
            name: '',
            issuing_organization: '',
            date_obtained: '',
            expiry_date: ''
        }]);
    };

    const handleDesignToolsChange = (e) => {
        setDesignTools(e.target.value.split(",").map(tool => tool.trim()));
    };

    const handleDesignSkillsChange = (e) => {
        setDesignSkills(e.target.value.split(",").map(skill => skill.trim()));
    };

    const getLinkedinProfileData = async () => {
        setLoading(true);
        // Simulated API call - replace with actual implementation
        setTimeout(() => {
            alert("LinkedIn data fetch would be implemented here");
            setLoading(false);
            setSelectedFile(null);
        }, 2000);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    };

    const getMyUserData = async () => {
        // Simulated API call - replace with actual implementation
        alert("User data fetch would be implemented here");
    };

    const downloadPDF = () => {
        // PDF download functionality would be implemented here
        alert("PDF download functionality would be implemented here");
    };

    return ( 
        <>
        <div className="h-full w-full text-[#ffffff] bg-[#030712]">
            {/* Panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Graphic Designer Template</h1>
                </div>
                <div className="flex justify-center items-center gap-10">
                    <div className="w-[45%] h-40 flex flex-wrap justify-center items-center gap-x-6 py-4 border-1 border-gray-400 rounded-2xl">
                        <div className="h-fit flex flex-col gap-2">
                            <input type="file" onChange={handleFileChange}
                                accept=".pdf" placeholder="Add your LinkedIn Profile PDF" className="p-2 border border-gray-500 bg-[#121826] text-white rounded"/>
                            {selectedFile && (
                                <p className="mt-2 text-sm text-green-600 text-center">
                                {selectedFile.name} selected
                                </p>
                            )}
                        </div>
                        <div className="h-fit flex justify-center items-center gap-8">
                            <div onClick={getLinkedinProfileData} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-sm cursor-pointer">Get Data From LinkedIn PDF</div>
                        </div>
                        <p className="w-full text-gray-200">Don't know how to get your LinkedIn Profile PDF? <a className="text-blue-500" href="">Click here</a></p>
                    </div>
                    <div className="w-[45%] h-full flex flex-col justify-center items-center gap-8 border-1 border-gray-400 rounded-2xl">
                        <div onClick={getMyUserData} className="bg-red-600 hover:bg-red-700 p-2 rounded-sm cursor-pointer">Get Data from Profile</div>
                    </div>
                </div>
                {loading && 
                    <p>Getting data from LinkedIn profile...</p>
                }
            </div>

            {/* Panel 2 */}
            <div className="flex border-b-2 border-[#364153]">
                {/* Left */}
                <div className="w-[40%] text-[#ffffff] bg-[#030712] border-r-2 border-[#364153] p-8">
                    <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                    <form className="flex flex-col gap-4">
                        {/* Personal Info */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setPersonalInfoVisible(!personalInfoVisible)}>
                            <h3 className="text-xl font-semibold">Personal Info</h3>
                            {personalInfoVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {personalInfoVisible && (
                            <div className="flex flex-col gap-6">
                                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Professional Title (e.g., Graphic Designer, UI/UX Designer)" value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <textarea placeholder="Professional Summary" value={summary} onChange={(e) => setSummary(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded h-24"
                                />
                                <input type="text" placeholder="Contact Number" value={contactNum} onChange={(e) => setContactNum(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Address (City, State, Country)" value={address} onChange={(e) => setAddress(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="url" placeholder="Portfolio Website" value={website} onChange={(e) => setWebsite(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="url" placeholder="Behance Profile" value={behance} onChange={(e) => setBehance(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="url" placeholder="Dribbble Profile" value={dribbble} onChange={(e) => setDribbble(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="url" placeholder="LinkedIn Profile" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
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
                                        <input type="text" placeholder="Company/Client" value={exp.company}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].company = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Position/Role" value={exp.position}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].position = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <textarea placeholder="Key Responsibilities" value={exp.responsibilities}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].responsibilities = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded h-20"
                                        />
                                        <textarea placeholder="Key Achievements" value={exp.achievements}
                                            onChange={(e) => {
                                                const newExp = [...experience];
                                                newExp[index].achievements = e.target.value;
                                                setExperience(newExp);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded h-20"
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

                        {/* Portfolio Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setPortfolioVisible(!portfolioVisible)}>
                            <h3 className="text-xl font-semibold">Portfolio Projects</h3>
                            {portfolioVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {portfolioVisible && (
                            <div className="flex flex-col gap-6">
                                {portfolio.map((proj, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input type="text" placeholder="Project Name" value={proj.project_name}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].project_name = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Category (Logo, Web Design, Print, etc.)" value={proj.category}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].category = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Client Name" value={proj.client}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].client = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <textarea placeholder="Project Description" value={proj.description}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].description = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded h-20"
                                        />
                                        <input type="text" placeholder="Tools Used" value={proj.tools_used}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].tools_used = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="url" placeholder="Project URL/Link" value={proj.url}
                                            onChange={(e) => {
                                                const newProj = [...portfolio];
                                                newProj[index].url = e.target.value;
                                                setPortfolio(newProj);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handlePortfolioAdd} className="bg-blue-500 p-2 rounded">+ Add Portfolio Project</button>
                            </div>
                        )}

                        {/* Skills Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setSkillsVisible(!skillsVisible)}>
                            <h3 className="text-xl font-semibold">Skills & Tools</h3>
                            {skillsVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {skillsVisible && (
                            <div className="flex flex-col gap-6">
                                <input type="text" placeholder="Design Tools (e.g., Photoshop, Illustrator, Figma, Sketch)" 
                                    value={designTools.join(", ")} onChange={handleDesignToolsChange}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Design Skills (e.g., Branding, Typography, Color Theory)" 
                                    value={designSkills.join(", ")} onChange={handleDesignSkillsChange}
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
                                        <input type="text" placeholder="Degree" value={edu.degree}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].degree = e.target.value;
                                                setEducation(newEdu);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Field of Study" value={edu.field_of_study}
                                            onChange={(e) => {
                                                const newEdu = [...education];
                                                newEdu[index].field_of_study = e.target.value;
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
                                    </div>
                                ))}
                                <button type="button" onClick={handleEducationAdd} className="bg-blue-500 p-2 rounded">+ Add Education</button>
                            </div>
                        )}

                        {/* Certifications Section */}
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setCertificationsVisible(!certificationsVisible)}>
                            <h3 className="text-xl font-semibold">Certifications</h3>
                            {certificationsVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {certificationsVisible && (
                            <div className="flex flex-col gap-6">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input type="text" placeholder="Certification Name" value={cert.name}
                                            onChange={(e) => {
                                                const newCert = [...certifications];
                                                newCert[index].name = e.target.value;
                                                setCertifications(newCert);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Issuing Organization" value={cert.issuing_organization}
                                            onChange={(e) => {
                                                const newCert = [...certifications];
                                                newCert[index].issuing_organization = e.target.value;
                                                setCertifications(newCert);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Date Obtained" value={cert.date_obtained}
                                            onChange={(e) => {
                                                const newCert = [...certifications];
                                                newCert[index].date_obtained = e.target.value;
                                                setCertifications(newCert);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Expiry Date (if applicable)" value={cert.expiry_date}
                                            onChange={(e) => {
                                                const newCert = [...certifications];
                                                newCert[index].expiry_date = e.target.value;
                                                setCertifications(newCert);
                                            }}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handleCertificationAdd} className="bg-blue-500 p-2 rounded">+ Add Certification</button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Right - Resume Preview */}
                <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8">
                    <div id="pdf-content" className="h-238 w-168 bg-[#ffffff] text-[#000000] p-4 overflow-hidden">
                        {/* Header Section */}
                        <div className="text-center mb-4 pb-3 border-b-2 border-[#7c3aed]">
                            <h2 className="text-3xl font-bold text-[#581c87] mb-1">{name || "Your Name"}</h2>
                            <p className="text-[#7c3aed] text-lg font-semibold mb-2">{title || "Graphic Designer"}</p>
                            <p className="text-[#6b7280] text-xs mb-2 leading-relaxed">{summary || "Professional summary will appear here"}</p>
                            
                            {/* Contact Info */}
                            <div className="flex justify-center items-center gap-3 text-xs flex-wrap">
                                {email && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <IoIosMail className="text-sm" />
                                        {email}
                                    </span>
                                )}
                                {contactNum && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <IoIosCall className="text-sm" />
                                        {contactNum}
                                    </span>
                                )}
                                {address && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <FaLocationDot className="text-xs" />
                                        {address}
                                    </span>
                                )}
                            </div>
                            
                            {/* Social Links */}
                            <div className="flex justify-center items-center gap-3 text-xs mt-2">
                                {website && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <FaGlobe className="text-xs" />
                                        Portfolio
                                    </span>
                                )}
                                {behance && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <FaBehance className="text-xs" />
                                        Behance
                                    </span>
                                )}
                                {dribbble && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <FaDribbble className="text-xs" />
                                        Dribbble
                                    </span>
                                )}
                                {linkedin && (
                                    <span className="flex items-center gap-1 text-[#7c3aed]">
                                        <FaLinkedin className="text-xs" />
                                        LinkedIn
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="flex gap-4">
                            {/* Left Column */}
                            <div className="w-[60%]">
                                {/* Experience */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        EXPERIENCE
                                    </h3>
                                    {experience.length === 0 ? (
                                        <p className="text-xs text-[#6b7280] italic">No experience added yet</p>
                                    ) : (
                                        experience.map((exp, index) => (
                                            <div key={index} className="mb-3">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-sm">{exp.position}</h4>
                                                    <span className="text-xs text-[#6b7280]">
                                                        {exp.start_date} - {exp.end_date}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#7c3aed] font-semibold mb-1">{exp.company}</p>
                                                {exp.responsibilities && (
                                                    <p className="text-xs text-[#4b5563] leading-relaxed mb-1">{exp.responsibilities}</p>
                                                )}
                                                {exp.achievements && (
                                                    <p className="text-xs text-[#16a34a] leading-relaxed"><strong>Achievements:</strong> {exp.achievements}</p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Portfolio Projects */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        PORTFOLIO HIGHLIGHTS
                                    </h3>
                                    {portfolio.length === 0 ? (
                                        <p className="text-xs text-[#6b7280] italic">No portfolio projects added yet</p>
                                    ) : (
                                        portfolio.map((proj, index) => (
                                            <div key={index} className="mb-3">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-sm text-[#7c3aed]">
                                                        {proj.url ? (
                                                            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="underline">
                                                                {proj.project_name}
                                                            </a>
                                                        ) : (
                                                            proj.project_name
                                                        )}
                                                    </h4>
                                                    <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2 py-1 rounded">
                                                        {proj.category}
                                                    </span>
                                                </div>
                                                {proj.client && (
                                                    <p className="text-xs text-[#7c3aed] mb-1"><strong>Client:</strong> {proj.client}</p>
                                                )}
                                                <p className="text-xs text-[#4b5563] leading-relaxed mb-1">{proj.description}</p>
                                                {proj.tools_used && (
                                                    <p className="text-xs text-[#6b7280]"><strong>Tools:</strong> {proj.tools_used}</p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-[40%]">
                                {/* Design Tools */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        DESIGN TOOLS
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {designTools.length === 0 ? (
                                            <p className="text-xs text-[#6b7280] italic">No design tools added yet</p>
                                        ) : (
                                            designTools.map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-[#f3e8ff] text-[#581c87] px-2 py-1 rounded-full border border-[#c4b5fd]"
                                                >
                                                    {tool}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Design Skills */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        DESIGN SKILLS
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {designSkills.length === 0 ? (
                                            <p className="text-xs text-[#6b7280] italic">No design skills added yet</p>
                                        ) : (
                                            designSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-[#ecfdf5] text-[#059669] px-2 py-1 rounded-full border border-[#86efac]"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        EDUCATION
                                    </h3>
                                    {education.length === 0 ? (
                                        <p className="text-xs text-[#6b7280] italic">No education added yet</p>
                                    ) : (
                                        education.map((edu, index) => (
                                            <div key={index} className="mb-3">
                                                <h4 className="font-bold text-sm">{edu.degree}</h4>
                                                <p className="text-xs text-[#7c3aed]">{edu.field_of_study}</p>
                                                <p className="text-xs text-[#6b7280]">{edu.institution}</p>
                                                <p className="text-xs text-[#6b7280]">
                                                    {edu.start_date} - {edu.end_date}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Certifications */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#581c87] mb-2 pb-1 border-b border-[#e5e7eb]">
                                        CERTIFICATIONS
                                    </h3>
                                    {certifications.length === 0 ? (
                                        <p className="text-xs text-[#6b7280] italic">No certifications added yet</p>
                                    ) : (
                                        certifications.map((cert, index) => (
                                            <div key={index} className="mb-2">
                                                <h4 className="font-bold text-sm">{cert.name}</h4>
                                                <p className="text-xs text-[#7c3aed]">{cert.issuing_organization}</p>
                                                <p className="text-xs text-[#6b7280]">
                                                    {cert.date_obtained}
                                                    {cert.expiry_date && ` - ${cert.expiry_date}`}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
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

export default Template4;