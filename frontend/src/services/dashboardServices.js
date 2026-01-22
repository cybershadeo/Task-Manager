import api from "./api";


export const getDashboardStats = async () => {
    const response = await api.get('/user/dashboard');
    const fetchedData = await response.data || {};
    
    
    return fetchedData;

}


export const getUserProfile = async () => {
    const response = await api.get('/user/profile');
    const fetchedData = await response.data || {};

    
    return fetchedData;
}

export const updateUserProfile = async (userId, userData) => {
    console.log(userData);
    const response = await api.put(`/user/profile/${userId}`, userData);
    const fetchedData = await response.data || {};

    return fetchedData;
}

