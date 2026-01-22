import api from "./api";


/**
 * create task
 * @param {object} taskData - { title, description, status, priority, dueDate }
 */


export const createTask = async (taskData) => {
    const response = await api.post('/task', taskData);
    const data = await response.data || {};

    return data;
}

export const getAllTasks = async () => {
    const response = await api.get('/task');
    const data = await response.data || {};
    
    return data;
}


export const getTaskById = async (taskId) => {
    const response = await api.get(`/task/${taskId}`);
    const data = await response.data || {};
    
    return data;
}


/**
 * update task
 * @param {object} taskData - { any updates the user makes  }
 */
export const updateTask = async (taskId, taskData) => {
    const response = await api.put (`/task/${taskId}`, taskData);
    const data = await response.data || {};
    
    return data;
}



export const deleteTask = async (taskId) => {
    const response = await  api.delete(`/task/${taskId}`);
    const data = await response.data || {};

    return data;
}