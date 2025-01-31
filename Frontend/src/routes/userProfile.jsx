import { useState, useEffect } from "react";
import { get_user_profile_info } from "../api/endpoints";

function UserProfile() {
    const getUsernameFromUrl = () => {
        const urlSplit = window.location.pathname.split('/');
        return urlSplit[urlSplit.length - 1];
    };

    const [username, setUsername] = useState(getUsernameFromUrl());
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_user_profile_info(username);
                console.log(data);
                setUserData(data)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [username]);

    return (
        <div>
            <div>
                <p>{userData.username}</p>
            </div>
            <div className="flex gap-4">
                <div><img src={`http://127.0.0.1:8000/api${userData.profile_image}`} alt="Profile Pic" /></div>
                <div className="flex flex-col gap-2">
                    <p>Follower</p>
                    <p>{userData.follower_count}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Following</p>
                    <p>{userData.following_count}</p>
                </div>
            </div>
            <div><p>{userData.bio}</p></div>
        </div>
    );
}

export default UserProfile;
