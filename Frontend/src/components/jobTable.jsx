export default function JobTable() {
    const jobs = [
      { title: "Frontend Developer", company: "Tech Corp", location: "Remote", salary: "$80,000", deadline: "March 15, 2025", match: 85 },
      { title: "Backend Engineer", company: "Innovate Ltd", location: "New York, NY", salary: "$90,000", deadline: "April 1, 2025", match: 78 },
      { title: "UI/UX Designer", company: "Design Pro", location: "San Francisco, CA", salary: "$75,000", deadline: "March 20, 2025", match: 92 },
      { title: "Full Stack Developer", company: "Startup Hub", location: "Austin, TX", salary: "$95,000", deadline: "March 25, 2025", match: 80 },
      { title: "Data Analyst", company: "Data Insights", location: "Chicago, IL", salary: "$85,000", deadline: "March 30, 2025", match: 88 },
    ];
  
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
              <th className="border border-gray-700 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-center border border-gray-700 hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{job.title}</td>
                <td className="border border-gray-700 p-2">{job.company}</td>
                <td className="border border-gray-700 p-2">{job.location}</td>
                <td className="border border-gray-700 p-2">{job.salary}</td>
                <td className="border border-gray-700 p-2">{job.deadline}</td>
                <td className="border border-gray-700 p-2">{job.match}%</td>
                <td className="border border-gray-700 p-2">
                  <button className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700">Apply Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  