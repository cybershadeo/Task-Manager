import api from './api';


export const createCategory = async (categoryData) => {
    const response = await api.post ('/categories', categoryData);
    const data = await response.data || {};

    const categoryName = data?.name ?? null;
    const categoryId = data?.categoryId ?? null;
    
    return { categoryName, categoryId, raw: data };
};

export const updateCategory = async (categoryId,categoryData) => {
    const response = await api.put(`/categories/${categoryId}`, categoryData);
    const data = await response.data || {};

    
    return data;
}

export const deleteCategory = async (categoryId) => {
    const response = await api.delete(`/categories/${categoryId}`);
    const data = await response.data || {};

    return data;
}