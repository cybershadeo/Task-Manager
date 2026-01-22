import api from './api';


export const createCategory = async ({name}) => {
    const response = await api.post ('/categories', {name});
    const data = await response.data || {};

    const categoryName = data?.name ?? null;
    const categoryId = data?.categoryId ?? null;
    
    return { categoryName, categoryId, raw: data };
};


