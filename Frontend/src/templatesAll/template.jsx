import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Template() {
    const { templateName } = useParams();

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

    const printRef = useRef();

    // Function to handle the print
    const handlePrint = () => {
        const content = printRef.current;
        const printWindow = window.open('', '', 'height=800,width=800');
        
        // Writing the content into the print window
        printWindow.document.write('<html><head> <title>Print</title><script src="https://unpkg.com/@tailwindcss/browser@4"></script></head><body>');
        printWindow.document.write(content.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Triggering the print
        printWindow.print();
    };


    useEffect(() => {
        const savedName = localStorage.getItem('name');
        const savedDescription = localStorage.getItem('description');
        const savedContactNum = localStorage.getItem('contactNum');
        const savedEmail = localStorage.getItem('email');
        const savedAddress = localStorage.getItem('address');
        const savedEducation = localStorage.getItem('education');
        const savedExperience = localStorage.getItem('experience');
        const savedProjects = localStorage.getItem('projects');
        const savedSkills = localStorage.getItem('skills');

        if (savedName) setName(savedName);
        if (savedDescription) setDescription(savedDescription);
        if (savedContactNum) setContactNum(savedContactNum);
        if (savedEmail) setEmail(savedEmail);
        if (savedAddress) setAddress(savedAddress);
        if (savedEducation) setEducation(JSON.parse(savedEducation));
        if (savedExperience) setExperience(JSON.parse(savedExperience));
        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedSkills) setSkills(JSON.parse(savedSkills));
    }, []);

    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem('description', description);
    }, [description]);

    useEffect(() => {
        localStorage.setItem('contactNum', contactNum);
    }, [contactNum]);

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem('address', address);
    }, [address]);

    useEffect(() => {
        localStorage.setItem('education', JSON.stringify(education));
    }, [education]);

    useEffect(() => {
        localStorage.setItem('experience', JSON.stringify(experience));
    }, [experience]);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('skills', JSON.stringify(skills));
    }, [skills]);

    const handleEducationAdd = () => {
        setEducation([...education, { institute: '', startYear: '', endYear: '', course: '', percentage: '' }]);
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index][field] = value;
        setEducation(newEducation);
    };

    const handleExperienceAdd = () => {
        setExperience([...experience, { position: '', startYear: '', endYear: '', description: '' }]);
    };

    const handleExperienceChange = (index, field, value) => {
        const newExperience = [...experience];
        newExperience[index][field] = value;
        setExperience(newExperience);
    };

    const handleProjectAdd = () => {
        setProjects([...projects, { name: '', description: '', link: '' }]);
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    const handleSkillChange = (e) => {
        setSkills(e.target.value.split(",").map(skill => skill.trim())); // Convert to array and trim spaces
    };

    return ( 
        <>
        <div className={`h-full w-full text-[#ffffff] bg-[#030712] template-${templateName}`}>
            {/* panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Template {templateName}</h1>
                </div>
                <div className="w-full flex justify-center gap-8">
                    <input type="text" placeholder="Enter Your Linkedin handle, Eg. mohitrana18" className="p-2 border border-gray-500 bg-[#121826] text-white rounded w-86"/>
                    <div className="bg-blue-700 p-2 rounded-sm cursor-pointer">Get Data From Linkedin</div>
                </div>
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
                                        <input type="text" placeholder="Institute" value={edu.institute}
                                            onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Start Year" value={edu.startYear}
                                            onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="End Year" value={edu.endYear}
                                            onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Course" value={edu.course}
                                            onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Percentage/CGPA and activities" value={edu.percentage}
                                            onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
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
                                        <input type="text" placeholder="Position" value={exp.position}
                                            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Description" value={exp.description}
                                            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Start Year" value={exp.startYear}
                                            onChange={(e) => handleExperienceChange(index, 'startYear', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="End Year" value={exp.endYear}
                                            onChange={(e) => handleExperienceChange(index, 'endYear', e.target.value)}
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
                                            onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Description" value={proj.description}
                                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                        />
                                        <input type="text" placeholder="Project Link" value={proj.link}
                                            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
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
                {(templateName === 'template1') ? (
                <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8 gap-4 flex" ref={printRef}>
                    <div className="h-238 w-168 bg-white text-black pt-2 pb-2 pl-8 pr-8 rounded-l">
                        <h2 className="text-2xl text-center text-3xl bg-gray-200 mt-8 font-medium p-2">{name}</h2>
                        <div className="w-min-max flex justify-evenly items-start my-2">
                            <p className="max-w-[25%] font-semibold text-center text-blue-700 flex flex-wrap">{contactNum}</p>
                            <span className='rounded-xl bg-gray-700 h-2 w-2 mt-auto mb-auto'></span>
                            <p className="max-w-[40%] font-semibold text-center text-blue-700 flex flex-wrap underline"><a href={`mailto:${email}`}>{email}</a></p>
                            <span className='rounded-xl bg-gray-700 h-2 w-2 mt-auto mb-auto'></span>
                            <p className="max-w-[35%] font-semibold text-center text-blue-700 flex flex-wrap">{address}</p>
                        </div>
                        
                        <p className="text-gray-700 text-center mb-4 mt-6">{description}</p>

                        <h3 className="text-xl font-semibold w-full bg-gray-200 p-0.5 pl-1 pr-1 w-min mb-1">Experience</h3>
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <p className=''>{exp.startYear} - {exp.endYear}</p>
                                <p className="text-gray-600 font-medium">{exp.position}</p>
                                <p className='mb-4'>{exp.description}</p>
                            </div>
                        ))}

                        <h3 className="text-xl font-semibold w-full mt-4 bg-gray-200 p-0.5  pl-1 pr-1 w-min mb-1"> Education</h3>
                        {education.map((edu, index) => (
                            <div key={index}>
                                <p className=''>{edu.startYear} - {edu.endYear}</p>
                                <p className="font-semibold font-medium">{edu.course} | {edu.institute} </p>
                                <p className="text-gray-600 font-medium mb-4">{edu.percentage} </p>
                            </div>
                        ))}

                        <h3 className="text-xl font-semibold w-full mt-4 bg-gray-200 p-0.5  pl-1 pr-1 w-min mb-1">Projects</h3>
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <p className="text-blue-600 underline font-semibold">
                                <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.name}</a>
                                </p>
                                <p>{proj.description}</p>
                            </div>
                        ))}
                        <h3 className="text-xl font-semibold mt-4 w-full  bg-gray-200 p-0.5  pl-1 pr-1 w-min mb-1">Skills</h3>
                        {skills.map((skill, index) => (
                            <p className="inline-block m-1 mb-4 bg-gray-300 px-1 rounded-sm" key={index}>{skill}</p>
                        ))}
                    </div>
                    
                    {/* <div>
                        <button className="w-8 h-4 bg-gray-300 rounded" onClick={handlePrint}></button>
                        <button></button>
                    </div> */}

                </div> 
                )
                : (templateName === 'template2') ? 
                    <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8 gap-4 flex" ref={printRef}>
                        <div className="h-238 w-168 bg-white text-black pt-2 pb-2 pl-8 pr-8 rounded-l">
                            <h2 className="text-2xl text-start text-sky-400 text-3xl  mt-8 font-sm p-2 border-b-2 border-solid border-sky-400 ">{name}</h2>
                            <div className="w-min ml-auto mr-auto flex justify-evenly items-start my-2">
                                <p className="max-w-[25%] font-semibold text-center flex flex-wrap">{contactNum}</p>
                                <p>|</p>
                                <p className="max-w-[40%] font-semibold text-center flex flex-wrap underline"><a href={`mailto:${email}`}>{email} </a></p>
                                <p>|</p>
                                <p className="max-w-[35%] font-semibold text-center flex flex-wrap">{address}</p>
                            </div>
                            <h3 className="text-2xl font-semibold w-full text-sky-400 w-min">Profile</h3>
                            <p className="text-gray-700 text-center mb-4 text-start">{description}</p>
    
                            <h3 className="text-2xl font-semibold w-full text-sky-400 w-min">Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <p className="text-black-600 font-2xl font-semibold">{exp.position} | {exp.startYear} - {exp.endYear}</p>
                                    <p className='mb-4'>{exp.description}</p>
                                </div>
                            ))}
    
                            <h3 className="text-2xl font-semibold w-full text-sky-400 w-min"> Education</h3>
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <p className='text-black-600 font-2xl font-semibold'>{edu.startYear} - {edu.endYear} | {edu.course} | {edu.institute} </p>
                                    <p className="text-gray-600 font-medium mb-4">{edu.percentage} </p>
                                </div>
                            ))}
    
                            <h3 className="text-2xl font-semibold w-full text-sky-400 w-min">Projects</h3>
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <p className="text-black-600 font-2xl font-semibold">
                                    <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.name}</a>
                                    </p>
                                    <p className='mb-2'>{proj.description}</p>
                                </div>
                            ))}
                            <h3 className="text-2xl font-semibold w-full text-sky-400 w-min">Skills</h3>
                            {skills.map((skill, index) => (
                                <p className="inline-block m-1 mb-4 bg-gray-300 px-1 rounded-sm" key={index}>{skill}</p>
                            ))}
                        </div>
                        
                        {/* <div>
                            <button className="w-8 h-4 bg-gray-300 rounded" onClick={handlePrint}></button>
                            <button></button>
                        </div> */}
    
                    </div>
                : (templateName === 'template3') ? 
                    <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8 gap-4 flex" ref={printRef}>
                        <div className="h-238 w-168 bg-white text-black pt-2 pb-2 pl-8 pr-8 rounded-l">
                            <h2 className="text-2xl text-center text-black-700 text-3xl  mt-8 font-sm p-2 border-b-2 border-black-700 ">{name}</h2>
                            <div className="w-full ml-auto mr-auto flex justify-evenly items-start py-4 border-b-2 border-black-700 ">
                                <p className="max-w-[25%] font-semibold text-center flex flex-wrap">{contactNum}</p>
                                <p>|</p>
                                <p className="max-w-[40%] font-semibold text-center flex flex-wrap underline"><a href={`mailto:${email}`}>{email} </a></p>
                                <p>|</p>
                                <p className="max-w-[35%] font-semibold text-center flex flex-wrap">{address}</p>
                            </div>
                            <div className='flex'>
                            {/* Left Column: Skills & Education */}
                            <div className="left w-1/3  p-4">
                                <h3 className="text-2xl border-b-2 border-black-700 inline-block text-black-700 py-2 mb-2">Skills</h3>
                                <div className="skills-list flex-column">
                                {skills.map((skill, index) => (
                                    <p className="m-1 mb-2 text-black " key={index}>
                                    {skill} <br/>
                                     
                                    </p>
                                ))}
                                </div>

                                <h3 className="text-2xl border-b-2 mt-8 border-black-700 inline-block text-black-700 py-2 mb-2">Education</h3>
                                <div className="education-list">
                                {education.map((edu, index) => (
                                    <div key={index} className="education-item mb-4">
                                    <p className=''>{edu.institute}</p>
                                    <p className='text-black font-semibold'>{edu.startYear} - {edu.endYear} </p>
                                    <p className=''>{edu.course}</p>
                                    <p className="text-gray-600 font-medium">{edu.percentage}</p>
                                    </div>
                                ))}
                                </div>
                            </div>

                            {/* Right Column: Profile, Experience, Projects */}
                            <div className="right w-2/3 p-4">
                                <h3 className="text-2xl border-b-2 border-black-700 inline-block text-black-700 py-2 mb-2">Profile</h3>
                                <p className="text-gray-700 text-left mb-4">{description}</p>

                                <h3 className="text-2xl border-b-2 border-black-700 inline-block text-black-700 py-2 mb-2">Experience</h3>
                                <div className="experience-list">
                                {experience.map((exp, index) => (
                                    <div key={index} className="experience-item mb-4">
                                    <p className="text-black ">{exp.position} </p>
                                    <p className='font-semibold'>{exp.startYear} - {exp.endYear}</p>
                                    <p className='text-gray-600'>{exp.description}</p>
                                    </div>
                                ))}
                                </div>

                                <h3 className="text-2xl border-b-2 border-black-700 inline-block text-black-700 py-2 mb-2">Projects</h3>
                                <div className="projects-list">
                                {projects.map((proj, index) => (
                                    <div key={index} className="project-item mb-4">
                                    <p className="text-black font-semibold">
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-black-500 hover:underline">
                                        {proj.name}
                                        </a>
                                    </p>
                                    <p className='text-gray-600'>{proj.description}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                            </div>       
                            </div>
                            </div>
                :
                
                (<div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-[60%] p-8">
                    <div className="w-full text-xl text-center">This Template is not available</div>
                </div> )
                 }
            </div>
                    
        </div>
        </>
     );
}

export default Template;
