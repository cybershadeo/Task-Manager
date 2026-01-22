import api from "./api";

export const createSubtasks = async (taskData, taskId) => {
    const response = await api.post(`/task/${taskId}/subtasks`, taskData);
    const data = await response.data || {};

    return data;
}

export const getAllSubtasks = async () => {
    const response = await api.get('/subtask');
    const data = await response.data || {};
    
    return data;
}

export const updateSubtask = async (taskId, subtaskId, updates) => {
    const response = await api.put(`/task/${taskId}/subtasks/${subtaskId}`, updates);
    const data = await response.data || {};

    return data;
}

export const updateToggledSubtask = async (taskId, subtaskId, { completed }) => {
    const response = api.put(`/task/${taskId}/subtasks/${subtaskId}`, {completed});
    const data = await response.data || {};

    return data;
}

export const deleteSubtask = async (taskId, subtaskId) => {
    const response = await api.delete(`/task/${taskId}/subtasks/${subtaskId}`);
    const data = await response.data;

    return data
}