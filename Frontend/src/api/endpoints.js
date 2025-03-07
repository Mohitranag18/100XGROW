import axios from 'axios';

export const SERVER_URL = 'http://127.0.0.1:8000/api'
const BASE_URL = 'http://127.0.0.1:8000/api/'
const LOGIN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const NOTES_URL = `${BASE_URL}notes/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`
const REGISTER_URL = `${BASE_URL}register/`
const LOGOUT_URL = `${BASE_URL}logout/`



axios.defaults.withCredentials = true; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            LOGIN_URL, 
            { username, password },  // Object shorthand for cleaner syntax
            { withCredentials: true }  // Ensures cookies are included
        );
        
        // Check if the response contains a success attribute (depends on backend response structure)
        return response.data.success
    } catch (error) {
        console.error("Login failed:", error);
        return false;  // Return false or handle the error as needed
    }
};


export const refresh_token = async () =>{
    try{
        await axios.post(REFRESH_URL,
            {},
            { withCredentials: true }
        )
        return true
    }catch(error){
        return false
    }
}

export const get_notes = async () => {
    try{
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        return response.data;
    }catch(error){
        return call_refresh(error, axios.get(NOTES_URL, { withCredentials: true }))
    }
};

const call_refresh = async (error, func) =>{
    if(error.response && error.response.status === 401){
        const tokenRefreshed = await refresh_token()

        if(tokenRefreshed){
            const retryResponse = await func()
            return retryResponse.data
        }
    }
    return false
}

export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password}, { withCredentials: true });
    return response.data;
};

export const authenticated_user = async () => {
    try{
        await axios.post(AUTHENTICATED_URL,{}, { withCredentials: true });
        return true
    }catch(error){
        return false
    }
}

const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})
export const get_user_profile_info = async (username) => {
    try{
        const response = await api.get(`user_data/${username}/`, { withCredentials: true });
        return response.data;
    }catch(error){
        return call_refresh(error, () => api.get(`user_data/${username}/`, { withCredentials: true }));
    }
};

// api for magicATS
export const analyze_resume_api = async (resume, job_role) => {
    try {
        const response = await axios.post(`${BASE_URL}analyze/`, { resume, job_role }, {headers: {
            "Content-Type": "multipart/form-data",},
        withCredentials: true });
        return response.data; // Ensure only relevant data is returned
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message }; // Return a safe fallback object
    }
};

// api for rateMyResume
export const review_resume_create = async (pdf, job_role) => {
    try {
        const response = await axios.post(`${BASE_URL}resumes/`, { pdf, job_role }, {headers: {
            "Content-Type": "multipart/form-data",},
        withCredentials: true });
        return response.data; // Ensure only relevant data is returned
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message }; // Return a safe fallback object
    }
};

export const review_resume_getlist = async () => {
    try{
        const response = await api.get(`${BASE_URL}resumes/`, { withCredentials: true });
        return response.data;
    }catch(error){
        return call_refresh(error, () => api.get(`${BASE_URL}resumes/`, { withCredentials: true }));
    }
};

export const resume_detail = async (pk) => {
    try{
        const response = await api.get(`${BASE_URL}resumes/${pk}`, { withCredentials: true });
        return response.data;
    }catch(error){
        return call_refresh(error, () => api.get(`${BASE_URL}resumes/pk`, { withCredentials: true }));
    }
};