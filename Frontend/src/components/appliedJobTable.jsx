import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { get_all_applied_jobs, update_applied_job, delete_applied_job } from "../api/endpoints";
import { useEffect, useState } from "react";

const STATUS_CHOICES = [
  'applied', 'rejected', 'selected', 'interviewing', 'offered', 'withdrawn'
];

export default function AppliedJobTable() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [gettingJobs, setGettingJobs] = useState(false);
  const [updatingJobs, setUpdatingJobs] = useState({}); // Track which jobs are being updated
  const [deletingJobs, setDeletingJobs] = useState({}); // Track which jobs are being deleted

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
    // Store the original status for potential revert
    const originalJob = appliedJobs.find(job => job.id === jobId);
    const originalStatus = originalJob?.status;
    
    // Set loading state for this specific job
    setUpdatingJobs(prev => ({ ...prev, [jobId]: true }));
    
    // Optimistically update the UI
    const updatedJobs = appliedJobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setAppliedJobs(updatedJobs);

    try {
      // Call the API to update the job status
      await update_applied_job(jobId, { status: newStatus });
      console.log(`Job ID ${jobId} status successfully updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating job status:', error);
      
      // Revert the optimistic update on error
      const revertedJobs = appliedJobs.map(job =>
        job.id === jobId ? { ...job, status: originalStatus } : job
      );
      setAppliedJobs(revertedJobs);
      
      // Show error message
      alert(`Failed to update job status. Please try again.`);
    } finally {
      // Remove loading state for this job
      setUpdatingJobs(prev => {
        const newState = { ...prev };
        delete newState[jobId];
        return newState;
      });
    }
  };

  const handleDeleteJob = async (jobId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this job application?");
    if (!confirmDelete) return;

    // Set loading state for this specific job
    setDeletingJobs(prev => ({ ...prev, [jobId]: true }));

    try {
      // Call the API to delete the job
      await delete_applied_job(jobId);
      console.log(`Job ID ${jobId} successfully deleted`);
      
      // Remove the job from the state
      setAppliedJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert(`Failed to delete job. Please try again.`);
    } finally {
      // Remove loading state for this job
      setDeletingJobs(prev => {
        const newState = { ...prev };
        delete newState[jobId];
        return newState;
      });
    }
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
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">No applied jobs found.</td>
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
                      disabled={updatingJobs[job.id]} // Disable while updating
                      className={`bg-gray-700 text-white p-2 rounded-lg ${
                        updatingJobs[job.id] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {STATUS_CHOICES.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    {updatingJobs[job.id] && (
                      <div className="mt-1 text-xs text-gray-400">Updating...</div>
                    )}
                  </td>
                  <td className="border border-gray-700 p-2">
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={deletingJobs[job.id] || updatingJobs[job.id]}
                      className={`p-2 rounded-lg transition-colors ${
                        deletingJobs[job.id] || updatingJobs[job.id]
                          ? 'bg-gray-600 cursor-not-allowed opacity-50'
                          : 'bg-red-600 hover:bg-red-700 cursor-pointer'
                      }`}
                      title="Delete job"
                    >
                      {deletingJobs[job.id] ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <MdDelete className="w-4 h-4 text-white" />
                      )}
                    </button>
                    {deletingJobs[job.id] && (
                      <div className="mt-1 text-xs text-gray-400">Deleting...</div>
                    )}
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