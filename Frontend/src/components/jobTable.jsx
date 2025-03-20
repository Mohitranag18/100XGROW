import { IoIosAddCircleOutline } from "react-icons/io";
import { create_applied_job } from "../api/endpoints";
import { useState } from "react";

export default function JobTable({ jobs }) {
  const [addingToApplied, setAddingToApplied] = useState(false);

  const createAppliedJob = async (job) => {
    setAddingToApplied(true);
    const appliedJobData = {
      user: "admin",
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      job_posted_date: job.job_posted_date,
      deadline_to_apply: job.deadline_to_apply,
      description: job.description,
      source: job.source,
      job_type: job.job_type,
      employment_type: job.employment_type,
      experience_level: job.experience_level,
      status: "applied",
      matching_score: job.matching_score,
      job_url: job.job_url,
    };
    try {
      const response = await create_applied_job(appliedJobData);
      console.log(response);
      alert("Job added to applied jobs!");
    } catch {
      alert("Error in adding job to applied jobs.");
    } finally {
      setAddingToApplied(false);
    }
  };

  return (
    <div className="w-290 mx-auto p-6 bg-[#030712] text-white shadow-lg rounded-lg">
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-700 p-2">Job Title</th>
            <th className="border border-gray-700 p-2">Company</th>
            <th className="border border-gray-700 p-2">Location</th>
            <th className="border border-gray-700 p-2">Salary</th>
            <th className="border border-gray-700 p-2">Deadline</th>
            <th className="border border-gray-700 p-2">Match Score</th>
            <th className="border border-gray-700 p-2">Apply Action</th>
            <th className="border border-gray-700 p-2">Tracker Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="text-center border border-gray-700 hover:bg-gray-900">
              <td className="border border-gray-700 p-2">{job.title}</td>
              <td className="border border-gray-700 p-2">{job.company}</td>
              <td className="border border-gray-700 p-2">{job.location}</td>
              <td className="border border-gray-700 p-2">{job.salary}</td>
              <td className="border border-gray-700 p-2">{job.deadline_to_apply}</td>
              <td className="border border-gray-700 p-2">{job.matching_score}%</td>
              <td className="border border-gray-700 p-2">
                <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                  <button className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-blue-600 cursor-pointer">Apply Now</button>
                </a>
              </td>
              <td className="border border-gray-700 p-2">
                <button
                  onClick={() => createAppliedJob(job)}
                  className="px-3 py-1 hover:bg-gray-700 rounded-lg flex flex-col items-center cursor-pointer"
                  disabled={addingToApplied}
                >
                  <IoIosAddCircleOutline className="text-2xl" />
                  <p className="text-sm">{addingToApplied ? "Adding..." : "Add to Applied"}</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 &&
          <div className="h-86 w-full flex justify-center items-center text-center">
            <p>No jobs Available Currently, submit your Data to find jobs</p>
          </div>
        }
    </div>
  );
}
