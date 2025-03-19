import { IoIosAddCircleOutline } from "react-icons/io";


export default function JobTable({jobs}) {
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
                  <a href={job.job_url}>
                  <button className=" bg-gray-700  px-3 py-1 rounded-lg hover:bg-blue-600  cursor-pointer">Apply Now</button>
                  </a>
                </td>
                <td className="border border-gray-700 p-2">
                  <button className="px-3 py-1 hover:bg-gray-700 rounded-lg flex flex-col items-center cursor-pointer">
                    <IoIosAddCircleOutline className="text-2xl"/>
                    <p className="text-sm">Add to Applied</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  