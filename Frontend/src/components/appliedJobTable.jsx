import { IoIosAddCircleOutline } from "react-icons/io";
import { get_all_applied_jobs } from "../api/endpoints";
import { useEffect, useState } from "react";

const STATUS_CHOICES = [
  'applied', 'rejected', 'selected', 'interviewing', 'offered', 'withdrawn'
];

export default function AppliedJobTable() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [gettingJobs, setGettingJobs] = useState(false);

  const getAppliedJobs = async () => {
    setGettingJobs(true);
    try {
      const response = await get_all_applied_jobs();
      console.log(response);
      setAppliedJobs(response);
    } catch {
      alert("Error in fetching applied jobs.");
    } finally {
      setGettingJobs(false);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    const updatedJobs = appliedJobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setAppliedJobs(updatedJobs);
    console.log(`Job ID ${jobId} status changed to ${newStatus}`);
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-[#030712] text-white shadow-lg rounded-lg">
      {gettingJobs ? (
        <p>Loading applied jobs...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 p-2">Job Title</th>
              <th className="border border-gray-700 p-2">Company</th>
              <th className="border border-gray-700 p-2">Location</th>
              <th className="border border-gray-700 p-2">Salary</th>
              <th className="border border-gray-700 p-2">Deadline</th>
              <th className="border border-gray-700 p-2">Match Score</th>
              <th className="border border-gray-700 p-2">Link</th>
              <th className="border border-gray-700 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center">No applied jobs found.</td>
              </tr>
            ) : (
              appliedJobs.map((job) => (
                <tr key={job.id} className="text-center border border-gray-700 hover:bg-gray-900">
                  <td className="border border-gray-700 p-2">{job.title}</td>
                  <td className="border border-gray-700 p-2">{job.company}</td>
                  <td className="border border-gray-700 p-2">{job.location}</td>
                  <td className="border border-gray-700 p-2">{job.salary || 'N/A'}</td>
                  <td className="border border-gray-700 p-2">{job.deadline_to_apply || 'N/A'}</td>
                  <td className="border border-gray-700 p-2">{job.matching_score}%</td>
                  <td className="border border-gray-700 p-2">
                    <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                      <button className="px-3 py-1 rounded-lg bg-blue-600 cursor-pointer">Link</button>
                    </a>
                  </td>
                  <td className="border border-gray-700 p-2">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className="bg-gray-700 text-white p-2 rounded-lg"
                    >
                      {STATUS_CHOICES.map((status) => (
                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
