import axios from 'axios';

export async function loggedin(data) {
    try {
        const response = await axios.post("http://localhost:5000/api/users/login", data, { withCredentials: true });
        return response.data;
    } catch (error) {
       return error
    }
}

export async function registerLogin(data) {
    try {
        const response = await axios.post("http://localhost:5000/api/users/register", data, { withCredentials: true });
        return response.data;
    } catch (error) {
       return error
    }
}

export const getLoginStatus = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/users/loggedin", { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getUserProfile = async  () =>{
    try {
        const response = await axios.get("http://localhost:5000/api/users/getuser");
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getItemWithExpiry = (key)=> {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
        return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export async function searchUser(userName) {
    try {
        const response = await axios.post("http://localhost:5000/api/users/searchuser", {userName:userName});
            return response.data;
    } catch (error) {
        return error
    }
}

