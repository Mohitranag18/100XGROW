import JobTable from "../components/jobTable";
import UserInfoForm from "../components/userInfoForm";

function FindJob() {
    return ( 
        <>
        <div className="min-h-screen  w-full text-[#ffffff] bg-[#030712]">
            {/* panel 1 */}
            <div className="h-112 w-full flex flex-col justify-center items-center text-center gap-16 p-6 border-b-2 border-[#1e2939]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl font-bold">Find Jobs in Single Click :</h1>
                    <h1 className="text-5xl font-bold">which fits with your profile</h1>
                </div>
            </div>

            {/* panel 2 */}
            <div className=" w-full text-[#ffffff] bg-[#030712] border-b-2 border-[#1e2939] flex flex-col p-6 py-16 items-center">
                <h2 className="text-4xl font-semibold flex justify-center w-290">User Information Form</h2>
                <div className="w-290 h-16 flex justify-end items-center my-8 p-2 rounded-2xl border-2 border-[#1e2939] ">
                    <button className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition">Get Data from Profile</button>
                </div>
                <div className="w-290">
                <UserInfoForm />
                </div>
            </div>

            {/* panel 3 */}
            <div className="w-full flex flex-col justify-center items-center text-center gap-8 p-6 py-16 border-b-2 border-[#1e2939]">
                <h2 className="text-4xl font-semibold">Best Job Fits for You</h2>
                <JobTable />
                <button className="font-semibold mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition">Auto Apply to All</button>
            </div>
        </div>
        </>
     );
}

export default FindJob;