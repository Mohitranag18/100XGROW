import { useState } from "react";

function Template() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    const handleEducationAdd = () => {
        setEducation([...education, { institute: '', startYear: '', endYear: '', course: '' }]);
    };

    const handleExperienceAdd = () => {
        setExperience([...experience, { position: '', startYear: '', endYear: '', description: '' }]);
    };

    const handleProjectAdd = () => {
        setProjects([...projects, { name: '', description: '', link: '' }]);
    };

    const handleSkillChange = (e) => {
        setSkills(e.target.value.split(",").map(skill => skill)); // Convert to array
    };

    return ( 
        <>
        <div className="h-full w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Template 1</h1>
                </div>
            </div>

            {/* panel 2 */}
            <div className="flex border-b-2 border-[#364153]">
                {/* left */}
                <div className="w-[50%] text-[#ffffff] bg-[#030712] border-r-2 border-[#364153] p-4">
                <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                    <form className="flex flex-col gap-4">
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                        />
                        <textarea placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)}
                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                        />

                        {/* Education Section */}
                        <h3 className="text-xl font-semibold">Education</h3>
                        {education.map((edu, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <input type="text" placeholder="Institute" value={edu.institute}
                                    onChange={(e) => {
                                        const newEdu = [...education];
                                        newEdu[index].institute = e.target.value;
                                        setEducation(newEdu);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Start Year" value={edu.startYear}
                                    onChange={(e) => {
                                        const newEdu = [...education];
                                        newEdu[index].startYear = e.target.value;
                                        setEducation(newEdu);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="End Year" value={edu.endYear}
                                    onChange={(e) => {
                                        const newEdu = [...education];
                                        newEdu[index].endYear = e.target.value;
                                        setEducation(newEdu);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Course" value={edu.course}
                                    onChange={(e) => {
                                        const newEdu = [...education];
                                        newEdu[index].course = e.target.value;
                                        setEducation(newEdu);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleEducationAdd} className="bg-blue-500 p-2 rounded">+ Add Education</button>

                        {/* Experience Section */}
                        <h3 className="text-xl font-semibold">Experience</h3>
                        {experience.map((exp, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <input type="text" placeholder="Position" value={exp.position}
                                    onChange={(e) => {
                                        const newExp = [...experience];
                                        newExp[index].position = e.target.value;
                                        setExperience(newExp);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="Start Year" value={exp.startYear}
                                    onChange={(e) => {
                                        const newExp = [...experience];
                                        newExp[index].startYear = e.target.value;
                                        setExperience(newExp);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                                <input type="text" placeholder="End Year" value={exp.endYear}
                                    onChange={(e) => {
                                        const newExp = [...experience];
                                        newExp[index].endYear = e.target.value;
                                        setExperience(newExp);
                                    }}
                                    className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleExperienceAdd} className="bg-blue-500 p-2 rounded">+ Add Experience</button>

                        {/* Project Section */}
                        <h3 className="text-xl font-semibold">Project</h3>
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

                        {/* Skills Input */}
                        <h3 className="text-xl font-semibold">Skills</h3>
                        <input type="text" placeholder="Enter Skills (comma separated)" value={skills} onChange={handleSkillChange}
                            className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                        />
                    </form>
                </div>

                {/* right */}
                <div className="text-[#ffffff] bg-[#030712] flex justify-center items-center w-full p-4">
                    <div className="h-178 w-126 bg-white text-black p-2">
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="text-gray-700 mb-2">{description}</p>

                        <h3 className="text-xl font-semibold">Education</h3>
                        {education.map((edu, index) => (
                            <div key={index}>
                                <p className="text-gray-600">{edu.institute} ({edu.startYear} - {edu.endYear})</p>
                                <p>{edu.course}</p>
                            </div>
                        ))}

                        <h3 className="text-xl font-semibold">Experience</h3>
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <p className="text-gray-600">{exp.position} ({exp.startYear} - {exp.endYear})</p>
                                <p>{exp.description}</p>
                            </div>
                        ))}

                        <h3 className="text-xl font-semibold">Projects</h3>
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <p className="text-blue-600 underline">
                                <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.name}</a>
                                </p>
                                <p>{proj.description}</p>
                            </div>
                        ))}
                        <h3 className="text-xl font-semibold">Skills</h3>
                        {skills.map((skill, index) => (
                            <p className="inline-block m-1 bg-gray-300 px-1 rounded-sm" key={index}>{skill}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Template;