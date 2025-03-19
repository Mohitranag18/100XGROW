import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PlusCircle, UploadCloud, ChevronDown } from "lucide-react";
import { get_all_jobs, get_my_user_data, match_jobs } from "../api/endpoints";

export default function UserInfoProfile({bestJobs, setBestJobs}) {
    const [allJobs, setAllJobs] = useState({})
    // const [bestJobs, setBestJobs] = useState([])
    const [UpdatedData, setUpdatedData] = useState({})
    const [matchingJobs, setMatchingJobs] = useState(false)


    const [personalInfoVisible, setPersonalInfoVisible] = useState(false);
    const [educationVisible, setEducationVisible] = useState(false);
    const [experienceVisible, setExperienceVisible] = useState(false);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [achievementsVisible, setAchievementsVisible] = useState(false);
    const [languagesVisible, setLanguagesVisible] = useState(false);
    const [interestsVisible, setInterestsVisible] = useState(false);
    const [availabilityVisible, setAvailabilityVisible] = useState(false);
    const [salaryExpVisible, setSalaryExpVisible] = useState(false);
    const [selfIdVisible, setSelfIdVisible] = useState(false);
    const [workPrefVisible, setWorkPrefVisible] = useState(false);

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [languages, setLanguages] = useState([])
    const [interests, setInterests] = useState([])
    const [availability, setAvailability] = useState('');
    const [salaryExp, setSalaryExp] = useState('');
    const [selfId, setSelfId] = useState({ gender: "Female", pronouns: "she/her", veteran: "No", disability: "No", ethnicity: "Asian",})
    const [workPref, setWorkPref] = useState({ remote_work: "No", in_person_work: "No", open_to_relocation: "No", willing_to_complete_assessments: "No", willing_to_undergo_drug_tests: "No", willing_to_undergo_background_checks: "No"})

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

    const handleAchievementsAdd = () => {
      setAchievements([...achievements, ""]);
    };

    const handleLanguagesAdd = () => {
      setLanguages([...languages, { language: '', proficiency: '' }]);
    };

    const handleInterestsAdd = () => {
      setInterests([...interests, ""]);
    };

    const handleSelfIdAdd = (e) => {
        setSelfId({...selfId, [e.target.name]: e.target.value,});
    };

    const handleWorkPrefAdd = (e) => {
        setWorkPref({...workPref, [e.target.name]: e.target.value,});
    };

    const getMyUserData = async () => {
        setLoading(true)
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
            setLanguages(response.languages)
            setSkills(response.skills)
            setAchievements(response.achievements_certifications)
            setInterests(response.interests)
            setAvailability(response.availability)
            setSalaryExp(response.salary_expectations)
            setSelfId({ gender: response.gender, pronouns: response.pronouns, veteran: response.veteran, disability: response.disability, ethnicity: response.ethnicity,})
            setWorkPref({ remote_work: response.remote_work, in_person_work: response.in_person_work, open_to_relocation: response.open_to_relocation, willing_to_complete_assessments: response.willing_to_complete_assessments, willing_to_undergo_drug_tests: response.willing_to_undergo_drug_tests, willing_to_undergo_background_checks: response.willing_to_undergo_background_checks})
        }catch{
            alert('error in fetching users data')
        } finally{
            setLoading(false)
        }
    }

    const getAllJobs = async () => {
        try{
            const response = await get_all_jobs()
            console.log(response)
            setAllJobs(response)
        }catch{
            alert('error in fetching all jobs')
        }
    }

    useEffect(()=>{
        getMyUserData()
        getAllJobs()
    },[])

    useEffect(() => {
        setUpdatedData({
          education: education,
          experience: experience,
          projects: projects,
          languages: languages,
          full_name: name,
          short_description: description,
          contact_no: contactNum,
          email: email,
          address: address,
          availability: availability,
          salary_expectations: salaryExp,
          skills: skills,
          achievements_certifications: achievements,
          interests: interests,
          gender: selfId.gender,
          pronouns: selfId.pronouns,
          veteran: selfId.veteran,
          disability: selfId.disability,
          ethnicity: selfId.ethnicity,
          remote_work: workPref.remote_work,
          in_person_work: workPref.in_person_work,
          open_to_relocation: workPref.open_to_relocation,
          willing_to_complete_assessments: workPref.willing_to_complete_assessments,
          willing_to_undergo_drug_tests: workPref.willing_to_undergo_drug_tests,
          willing_to_undergo_background_checks: workPref.willing_to_undergo_background_checks,
        });
      }, [education, experience, projects, languages, name, description, contactNum, email, address, availability, salaryExp, skills, achievements, interests, selfId, workPref]);
      
    console.log(JSON.stringify(UpdatedData))

    const matchJobs = async () => {
        setMatchingJobs(true)
        try{
            const response = await match_jobs(UpdatedData, allJobs)
            console.log(response)
            setBestJobs(response.data)
        }catch{
            alert('error in matching jobs')
        }finally{
            setMatchingJobs(false)
        }
    }

  return (
    <div className="w-full mx-auto bg-[#030712] text-white shadow-lg rounded-lg flex flex-col items-center ">
      
      <div className="w-[80%] text-[#ffffff] bg-[#030712] p-8">
        <form className="flex flex-col gap-4">

          {/* Personal Info Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setPersonalInfoVisible(!personalInfoVisible)}>
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

          {/* Achievements & Certifications Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setAchievementsVisible(!achievementsVisible)}>
              <h3 className="text-xl font-semibold">Achievements & Certifications</h3>
              {achievementsVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {achievementsVisible && (
              <div className="flex flex-col gap-6">
                  {achievements.map((achieve, index) => (
                      <div key={index} className="flex flex-col gap-2">
                          <input type="text" placeholder="Enter your Achievement or Certifications here" value={achieve}
                              onChange={(e) => {
                                  const newAchieve = [...achievements];
                                  newAchieve[index] = e.target.value;
                                  setAchievements(newAchieve);
                              }}
                              className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                          />
                      </div>
                  ))}
                  <button type="button" onClick={handleAchievementsAdd} className="bg-blue-500 p-2 rounded">+ Add Achievements</button>
              </div>
          )}

          {/* Languages Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setLanguagesVisible(!languagesVisible)}>
              <h3 className="text-xl font-semibold">Languages</h3>
              {languagesVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {languagesVisible && (
              <div className="flex flex-col gap-6">
                  {languages.map((lang, index) => (
                      <div key={index} className="flex flex-col gap-2">
                          <input type="text" placeholder="Language Name" value={lang.language}
                              onChange={(e) => {
                                  const newLang = [...languages];
                                  newLang[index].language = e.target.value;
                                  setLanguages(newLang);
                              }}
                              className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                          />
                          <input type="text" placeholder="Proficiency,Eg. Professional working, Native or Bilingual" value={lang.proficiency}
                              onChange={(e) => {
                                  const newLang = [...languages];
                                  newLang[index].proficiency = e.target.value;
                                  setLanguages(newLang);
                              }}
                              className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                          />
                      </div>
                  ))}
                  <button type="button" onClick={handleLanguagesAdd} className="bg-blue-500 p-2 rounded">+ Add Languages</button>
              </div>
          )}

          {/* Interests Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setInterestsVisible(!interestsVisible)}>
              <h3 className="text-xl font-semibold">Interests</h3>
              {interestsVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {interestsVisible && (
              <div className="flex flex-col gap-6">
                  {interests.map((interest, index) => (
                      <div key={index} className="flex flex-col gap-2">
                          <input type="text" placeholder="Enter your Interest" value={interest}
                              onChange={(e) => {
                                  const newInterest = [...interests];
                                  newInterest[index] = e.target.value;
                                  setInterests(newInterest);
                              }}
                              className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                          />
                      </div>
                  ))}
                  <button type="button" onClick={handleInterestsAdd} className="bg-blue-500 p-2 rounded">+ Add Interests</button>
              </div>
          )}

          {/* Availability Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setAvailabilityVisible(!availabilityVisible)}>
              <h3 className="text-xl font-semibold">Availability</h3>
              {availabilityVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {availabilityVisible && (
              <div className="flex flex-col gap-6">
                  <input type="text" placeholder="Notice Period, Eg. 1 Month" value={availability} onChange={(e) => setAvailability(e.target.value)}
                      className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                  />
              </div>
          )}

          {/* Salary Expectations Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setSalaryExpVisible(!salaryExpVisible)}>
              <h3 className="text-xl font-semibold">Salary Expectations</h3>
              {salaryExpVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {salaryExpVisible && (
              <div className="flex flex-col gap-6">
                  <input type="text" placeholder="Salary Expectations in USD, Eg. 80000 - 90000" value={salaryExp} onChange={(e) => setSalaryExp(e.target.value)}
                      className="p-2 border border-gray-500 bg-[#121826] text-white rounded"
                  />
              </div>
          )}

          {/* Self Identification Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setSelfIdVisible(!selfIdVisible)}>
              <h3 className="text-xl font-semibold">Self Identification</h3>
              {selfIdVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {selfIdVisible && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="gender">Gender:</label>
                  <select onChange={handleSelfIdAdd} value={selfId.gender} className="bg-[#121826] text-white w-[30%]" name="gender" required>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="pronouns">Pronouns:</label>
                  <select onChange={handleSelfIdAdd} value={selfId.pronouns} className="bg-[#121826] text-white w-[30%]" name="pronouns" required>
                      <option value="she/her">She/Her</option>
                      <option value="he/him">He/Him</option>
                      <option value="they/them">They/Them</option>
                      <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="veteran">Veteran Status:</label>
                  <select onChange={handleSelfIdAdd} value={selfId.veteran} className="bg-[#121826] text-white w-[30%]" name="veteran" required>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="disability">Disability:</label>
                  <select onChange={handleSelfIdAdd} value={selfId.disability} className="bg-[#121826] text-white w-[30%]" name="disability" required>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="ethnicity">Ethnicity:</label>
                  <select onChange={handleSelfIdAdd} value={selfId.ethnicity} className="bg-[#121826] text-white w-[30%]" name="ethnicity" required>
                      <option value="Asian">Asian</option>
                      <option value="White">White</option>
                      <option value="Black or African American">Black or African American</option>
                      <option value="Hispanic or Latino">Hispanic or Latino</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
              </div>
          )}
          
          {/* Work Preferences Section */}
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setWorkPrefVisible(!workPrefVisible)}>
              <h3 className="text-xl font-semibold">Work Preferences</h3>
              {workPrefVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {workPrefVisible && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="remote_work">Remote Work:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.remote_work} className="bg-[#121826] text-white w-[30%]" name="remote_work" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="in_person_work">In Person Work:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.in_person_work} className="bg-[#121826] text-white w-[30%]" name="in_person_work" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="open_to_relocation">Open To Relocation:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.open_to_relocation} className="bg-[#121826] text-white w-[30%]" name="open_to_relocation" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="willing_to_complete_assessments">Willing To Complete Assessments:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.willing_to_complete_assessments} className="bg-[#121826] text-white w-[30%]" name="willing_to_complete_assessments" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="willing_to_undergo_drug_tests">Willing To Undergo Drug Tests:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.willing_to_undergo_drug_tests} className="bg-[#121826] text-white w-[30%]" name="willing_to_undergo_drug_tests" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="flex justify-between gap-8 p-2 border border-gray-500 bg-[#121826] text-white rounded">
                  <label htmlFor="willing_to_undergo_background_checks">Willing To Undergo Background Checks:</label>
                  <select onChange={handleWorkPrefAdd} value={selfId.willing_to_undergo_background_checks} className="bg-[#121826] text-white w-[30%]" name="willing_to_undergo_background_checks" required>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
          )}

        </form>
      </div>

      {/* Submit Button */}
      <button onClick={matchJobs} className="w-86 bg-blue-600 text-white py-2 mt-8 rounded-lg hover:bg-blue-700">
        Submit
      </button>
      {matchingJobs && 
      <p className="py-2">Matching best jobs for you...</p>
      }
    </div>
  );
}
